---
title: 'Notes On Testing Golang Applications'
date: 2025-01-04
author: Andrew M McCall
description: Notes On Golang Testing
summary:  
publishDate: '2025-01-04T10:00:10-05:00'
updateDate:  '2025-01-04T10:00:10-05:00'
images: ['/images/twitter-card.png']
draft: false
categories:
  - Web Development
tags:
  - TDD
  - Testing
  - Go
  - Golang 
---

## Setup Main

`setup_test.go` is where you do any app setup for your test.  This runs
before the rest of the tests and can help you mock things that need to be
mocked.  When you build your application, test files are ignored.   It is a
safe space to declare variables, override variables, etc. Each package can
have a TestMain func in the setup_test.go file.

```
// setup_test.go in the main package

package main

// may need to declare some testing specific vars up here

var mock *config.AppConfig
var mockDB *sqlDB

func TestMain(m *testing.M) {

    // configure your testing specific app config mocks

    mockApp.Title = ""
    mockApp.DSN = ""
    // mock session, repos, pass around any extra config to internal
    packages
    newSessionManager(mockApp, mockDB)
	handlers.SetHandlerRepo(handlers.NewHandlerRepo(mockApp, sqldbconn.NewSQLDbConn(mockApp, mockDB)))
	render.NewRenderer(mockApp)

    // the rest of the config setup that runs before test


    // init TestMain
    os.Exit(m.Run())



}

```



## Adding Context And Session To http.Request  


Create a couple of helper functions to create dummy session data and add it
to the request:


```
// getCtx creates a mock id in context
func getCtx(req *http.Request) context.Context {
	ctx := context.WithValue(req.Context(), "id", 1)
	return ctx
}

// addContextAndSessionToRequest manually adds the context and session to the request to mock it
// so we can test our handlers
func addContextAndSessionToRequest(req *http.Request, app *config.AppConfig) *http.Request {
	req = req.WithContext(getCtx(req))
	ctx, _ := app.SessionManager.Load(req.Context(), req.Header.Get("X-Session"))
	return req.WithContext(ctx)
}


```

Anytime we need to add and load dummy session data to test handlers, in the
test we can just update the request:

```
req, _ := httptest.NewRequest("GET", "/some-route-with-session-data",nil)


req = addContextAndSessionToRequest(req, yourMockConfig)

```

`yourMockConfig` should already have session data initialized on a struct
field such as `app.SessionData = yourSessionDataInitFunc()`.  This would be
populated in the `setup_test.go` file.

## Testing the csrfToken Middleware that adds csrf_token to each request

```

func Test_csrfToken(t *testing.T) {
	var mockHandler http.Handler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		token := nosurf.Token(r)

		if token == "" {
			t.Error("ExpectedToken")
		}

	})

	mockHandler = csrfToken(mockHandler)

	req := httptest.NewRequest("GET", "/", nil)

	w := httptest.NewRecorder()

	mockHandler.ServeHTTP(w, req)

}
```

1. Set up a mockhandler that generates a csrf_token.
2. wrap the mockHandler with the middleware `csrfToken`
3. create a new `*http.Request` amd `ResponseWriter`
4. Serve the `mockHandler`
5. The test is conducted inside the mockHandler

## Testing Handlers that rely on justina/nosurf package that has an
exemptFunc

In `setup_test.go` in the `handlers` package I recreated the csrfToken
middleware.  

```
func csrfToken(next http.Handler) http.Handler {
	csrfHandler := nosurf.New(next)
	csrfHandler.ExemptFunc(func(r *http.Request) bool {
		return true
	})

	csrfHandler.SetBaseCookie(http.Cookie{
		HttpOnly: false,
		Path:     "/",
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
	})

	return csrfHandler
}
```


I created another bit of middleware to mock api calls that pass the
`csrf_token` via a request header.

```
func AddCSRFTokenHeader(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		r.Header.Set("X-CSRF-Token", nosurf.Token(r))
        r.Header.Set("Content-Type", "application/json")
		h.ServeHTTP(w, r)
	})
}
```

To generate a slug, I created an API endpoint that dispatches everytime the
headline field updates.  

To test this, I needed to create a new `httptest.NewServer()`.  

```
func Test_HandleGenerateSlug(t *testing.T) {

	ts := httptest.NewServer(csrfToken(AddCSRFTokenHeader(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// nosurf.Token(r) // don't need this
		Repo.HandleGenerateSlug(w, r)

	}))))

	defer ts.Close()

	slug := struct {
		Value string `json:"value"`
	}{
		Value: "some-cool-slug",
	}

	b, _ := json.Marshal(slug)

	buf := bytes.NewBuffer(b)

	req, _ := http.NewRequest("POST", ts.URL, buf)

	client := &http.Client{}

	resp, err := client.Do(req)

	if err != nil {
		t.Error("expected no error for client.Do")
	}

	if resp.StatusCode != 200 {
		t.Error("expected 200 status code but got", resp.StatusCode)
	}

}
```

1. Created the test server, with a dummy handler.  This dummy handler gets
   wrapped in the `csrfToken` and `AddCSRFTokenHeader` middleware.  This is
   so we can get access to the token in the request. 
2. Since the server is started, and the handler we want to test
   (`Repo.HandleGenerateSlug`) is wrapped in the server context, we now
   have access to the `csrf_token`.
3. The rest of the handler is just calling the handler that we want to test
   and passing in the `http.ResponseWriter` and the `*http.Request`
4. Next, we defer closing the server so that it only closes when the test
   finishes
5. Then I am creating a dummy payload to send in my request in the server.
   We do this, because in the actual functionality, we are using Javascript
   to send an asynchronous post request from the client each time the Post
   Title field changes.  
6. Next, we create a new request.  We use ts.URL to pass in the test url
   from the test server.  
7. Finally, we execute the request using the client, getting the response
   and an error.  
8. In this case, we are testing that the Handler responds with the
   appropriate codes, so we just test again the response.StatusCode and
   what would be expected.


