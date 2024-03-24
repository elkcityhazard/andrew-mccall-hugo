---
title: 'Unit Testing Json Encode'
date: 2024-03-13T20:22:02-04:00
author: Andrew M McCall
description:  My Notes on unit testing json.NewEncoder().Encode in Go
summary: Here are my notes on testing a JSON writer for Golang that lets you wrap the response in an envelope
publishDate: 2024-03-13T20:22:02-04:00
updateDate:  2024-03-13T20:22:02-04:00
draft: false
categories:
  - Go
tags:
  - Go
  - Golang
  - Test Driven Development
  - Unit Testing
---

`JSON` is one of the most common things we work with in Go.  That being said, I always forget how to write tests for it. 

So here is my process.

## Package Utils

Here is what my package utils looks like:

```
package utils

import (
	"encoding/json"
	"net/http"

	"github.com/elkcityhazard/remind-me/cmd/internal/config"
)

var app *config.AppConfig

type Utilser interface {
	WriteJSON(w http.ResponseWriter, r *http.Request, envelope string, data interface{}) error
}

type Utils struct {
	app         *config.AppConfig
	maxFileSize int
}

func NewUtils(a *config.AppConfig) *Utils {
	app = a

	return &Utils{
		app:         app,
		maxFileSize: 1024 * 1024 * 1024 * 30,
	}
}

func (u *Utils) WriteJSON(w http.ResponseWriter, r *http.Request, envelope string, data interface{}) error {
	payload := make(map[string]interface{})

	payload[envelope] = data

	w.Header().Set("Content-Type", "application/json;encoding=utf-8;")

	w.WriteHeader(http.StatusOK)

	err := json.NewEncoder(w).Encode(payload)
	if err != nil {
		return err
	}

	return nil
}

```

In this particular instance, I am passing in my app config as a private variable so that my utilser has access to it if it needs it later in my application.  This could go both ways, though.  I think it would be easier to pass in my utils to my app config, but in this particular instance I did it this way since it is just an example.  

Next, I create an interface in case I need to mock this later for further unit testing.  Right now, this is very simple.  All we have in our interface is the `WriteJSON` function which accepts a few params, and hopefully produces a result that we want.  

Next, we created a `NewUtils` function which accepts the app config as a parameter, and sets the local app variable.  This isn't 100% ideal because it causes some redundancy, but again, it gets the job done.  The worst thing that is going to happen is it is going to keep resetting the app variable, even when you pass in the app variable from the utils package.  

Besides that, the single common function here is to return a new `&Utils{}` struct so we can write some json.

Finally, we create a receiver function to write the json which looks like this:

```
func (u *Utils) WriteJSON(w http.ResponseWriter, r *http.Request, envelope string, data interface{}) error {
	payload := make(map[string]interface{})

	payload[envelope] = data

	w.Header().Set("Content-Type", "application/json;encoding=utf-8;")

	w.WriteHeader(http.StatusOK)

	err := json.NewEncoder(w).Encode(payload)
	if err != nil {
		return err
	}

	return nil
}
```

This function is pretty straight forward.  Since this is for a web application, it needs access to at least the __http.ResponseWriter__ but I am also passing in the request object in the event I need to abstract something from it later.  Additionally, I am passing in an `envelope` param and data which is of type interface since we don't know what we are going to be writing to the response writer. 

The function simply initializes a payload, and sets the payload key as the envelope name and gives it the value of the data which is an interface.

Finally, we set the content type and write the response header.  Note that the __Content-Type__ is often put into a piece of middleware, and the WriteHeader here is actually redundant because that is the default anyways.  I left it in here to be very explicit for myself and anyone who stumbles upon this post. 

Finally, to write the json to the response writer, we are using `json.NewEncoder(w).Encode(payload)`.  This is typically suited for medium to large data, because it can write data in chunks and save on memory usage.  The alternative way to write this function would be swap json.NewEncoder with:

```
jsonData, err := json.Marshal(payload)
	if err != nil {
		return err
	}

_, err := w.Write(jsonData)

if err != nil {
        return err
    }
return nil
```

The advantage of doing it this way is less io involved in the encoding process, and is generally more acceptable when you just need a byte slice or simple string.


## Testing A JSON Writer In Golang

```
package utils

import (
	"bytes"
	"encoding/json"
	"net/http"
	"testing"
)

type MockResponseWriter struct {
	http.ResponseWriter
	Buffer *bytes.Buffer
}

func NewMockResponseWriter() *MockResponseWriter {
	return &MockResponseWriter{
		Buffer: new(bytes.Buffer),
	}
}

func (mrw *MockResponseWriter) Write(p []byte) (int, error) {
	return mrw.Buffer.Write(p)
}

func (mrw *MockResponseWriter) WriteHeader(statusCode int) {

}

func (mrw *MockResponseWriter) Header() http.Header {
	// Implement if needed for your tests
	return http.Header{}
}

func Test_WriteJSON(t *testing.T) {

	utils := NewUtils(app)

	mrw := NewMockResponseWriter()

	req, err := http.NewRequest("GET", "/test", nil)
	if err != nil {
		t.Fatal(err)
	}

	tests := []struct {
		testType string
		data     any
	}{
		{
			testType: "fail",
			data:     make(chan bool),
		},
		{
			testType: "pass",
			data:     struct{ status string }{status: "okay"},
		},
	}

	// Call the method under test

	for _, tt := range tests {

		t.Run(tt.testType, func(t *testing.T) {

			err = utils.WriteJSON(mrw, req, "testEnvelope", tt.data)
			if err != nil {
				if tt.testType == "pass" {
					t.Fatalf("WriteJSON failed: %v", err)
				}
			}

			var result map[string]interface{}

			err = json.Unmarshal(mrw.Buffer.Bytes(), &result)

			if err != nil {
				if tt.testType == "pass" {
					t.Fatalf("Expected an error, but got none.")
				}

			}
		})
	}

}
```

The first thing I do is mock a new response writer.  All this means, is we need create a struct that satisfies the response writer interface.  To do that we create a new `MockResponseWriter` type:

```
type MockResponseWriter struct {
	http.ResponseWriter
	Buffer *bytes.Buffer
}
```

Then we need to implement some of the receiver functions to fulfill our obligation to the `WriteJSON` receiver function:

```
func NewMockResponseWriter() *MockResponseWriter {
	return &MockResponseWriter{
		Buffer: new(bytes.Buffer),
	}
}

func (mrw *MockResponseWriter) Write(p []byte) (int, error) {
	return mrw.Buffer.Write(p)
}

func (mrw *MockResponseWriter) WriteHeader(statusCode int) {

}

func (mrw *MockResponseWriter) Header() http.Header {
	// Implement if needed for your tests
	return http.Header{}
}
```

Note that I am also creating a helper function to return a new `MockResponseWriter`.

All we are doing here is writing the functions we need to implement `WriteJSON`.  These functions are all a part of the ResponseWriter Interface which can be viewed here: [http.ResponseWriter Interface](https://pkg.go.dev/net/http#ResponseWriter "ResponseWriter Interface").

Finally we can start setting up our unit under test:

```
unc Test_WriteJSON(t *testing.T) {

	utils := NewUtils(app)

	mrw := NewMockResponseWriter()

	req, err := http.NewRequest("GET", "/test", nil)
	if err != nil {
		t.Fatal(err)
	}

	tests := []struct {
		testType string
		data     any
	}{
		{
			testType: "fail",
			data:     make(chan bool),
		},
		{
			testType: "pass",
			data:     struct{ status string }{status: "okay"},
		},
	}

	// Call the method under test

	for _, tt := range tests {

		t.Run(tt.testType, func(t *testing.T) {

			err = utils.WriteJSON(mrw, req, "testEnvelope", tt.data)
			if err != nil {
				if tt.testType == "pass" {
					t.Fatalf("WriteJSON failed: %v", err)
				}
			}

			var result map[string]interface{}

			err = json.Unmarshal(mrw.Buffer.Bytes(), &result)

			if err != nil {
				if tt.testType == "pass" {
					t.Fatalf("Expected an error, but got none.")
				}

			}
		})
	}

}

```

1. We need to instantiate a new utils and pass in the app config. 
2. Next, we need to instantiate our `NewMockResponseWriter`
3. Next, we need to create a mock request that we are going to use in our `WriteJSON` receiver function. 
4.  We then  set up our test table which is just a simple slice of structs with two properties. 
5.  Finally, we perform our tests by looping through our test table.

Notice that in the actual test, we are writing the output to our `MockResponseWriter` and using our mock request as the request parameter.

After we perform the `act` portion of attemping to write the json, we can evaluate our assertions. 

In this case, the test is pretty simple, because my function isn't too complex.  To handle test cases, I check for the test type in order to determine if an error should be thrown. 

`go test ./... -coverprofile=c.out`
`go tool cover -html=c.out`

Check you coverage and hopefully you'll be looking good! 


## Conclusion


Arrange, Act, Assert are the fundamentals of test driven development.  This example is here to come back to as a moderately simple example of unit testing in go.  It serves as a reminder when we forget, or just something to light on fire on mastodon!

Until next time, Love yourself now, then, and later.  

 Andrew @elkcityhazard on Mastodon
