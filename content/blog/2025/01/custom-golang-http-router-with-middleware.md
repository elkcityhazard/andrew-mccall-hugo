---
title: 'Custom Golang Http Router With Middleware'
date: 2025-01-01
author: Andrew M McCall
description: An exploration of writing an http router from scracth with middleware capabilties.
summary: Go standard library, as well as many others have already solved implementing a robust, production grade http server. So why bother writing one? This post will hopefully yield some insight of why it is important to revisit established technology.
images: ['/images/twitter-card.png']
publishDate: '2025-01-01T19:08:05-05:00'
updateDate:  '2025-01-01T19:08:05-05:00'
draft: false
categories:
  - Web Development
tags:
  - Go
  - Golang
  - http
---

__Note:__ I modeled this router after the work of Ben Hoyt's: [Different
approaches to HTTP routing In Go](https://benhoyt.com/writings/go-routing/
"Ben Hoyt's Different approaches to HTTP routing In Go link").  

Who is this for? Myself really.  I wanted to solidify my understanding of
http routers so I could be better informed about choosing third party
versus standard library implementations. 

I would not recommend using this in production.  This has been built as an
educational exercise that I plan to use from time to time in my personal
projects.  

Link To Repo: [Github.com](https://github.com/elkcityhazard/am-router
"github.com/elkcityhazard/am-router")
## Why Build A Golang Router Library From Scratch?

Go has a standard library that has already solved this problem. There is
an endless collection of third party vendor router libraries out there -
all of them with great documentation and users to back them up.  So why
would anyone want to implement their own http router?

When I was learning javascript, specifically NodeJS, everyone just told me
to use something called [express.js](http://expressjs.com/ "Express.JS Home
Page").  Express.js is  a framework for making web applications that run using Node.js.  As many people learning a new skill, I never questioned why or how Express worked.  I just used it, made some projects and at the time, it was good enough for me.  

This lead me to develop a knowledge gap.  One that had always nagged me.
Not understanding how a dependency works gives me anxiety about my app.  
This isn't a test writing lecture.  
It is more of the principle that it is good have an understanding how how
to build something and how it works.  

This begs an interesting question: do I need to know how _everything_
works?  If I was a bike mechanic, would I care to know how every derailleur
works,or does it only matter that I have the skill and knowledge to install them? 

At the end of the day, all people care about is the result.  In the example
of the bike mechanic, the reason to know how each derailleur works can
effect the decision making process. If I change derailleurs, how does it
effect the rest of the system?  Having some detailed knowledge about the
inner workings can help an expert make better, safer choices. 

## Setting up A Basic Web Server App With Go

In golang, you can start a http server in about just a few lines of code:

{{< gist elkcityhazard 297dadb7ce6afc5d6aa7fda99562f0cf >}}

1. The main function is creating a new instance of our router.
2. I added in the path to static directory.  In my implementation, this
   must be added, or else ServeHTTP will just return since it won't be able
   to find a file.  This is because, by default, we are using the base path
   as the path to static dir.  Since it won't find any static files in the
   dir, it will return.  
3. Next, we are adding some routes.  This isn't that important at the
   moment just know that routes and middleware need to be added for the
   router to work. 
4. Next, we are creating a new http server instance.  The critical part
   here is the Handler property.  Since amrouter satisfies the http.Handler
   interface (it has a receiver function called ServeHTTP that takes a http
   response writer and a pointer to an http request).
5. Finally, we are starting the server via `srv.ListenAndServe()`

An http server gets spun up, starts listening for requests on the specified
port, and then responds to those requests if it can find a handler that
matches the request path.  Each request path has a corresponding http
method, and http handler.  

The hint here is that we need to have one http handler that acts as switch
board for all requests and routes them to their appropriate handler.  

## Creating An http router with middleware

### Defining The Router and Route Types

A Router is made of of routes.  In order to use a custom serve mux, we need
to make sure that whatever we pass into `&http.Server{Handler: %v}`
satisfies the http.Handler interface.  This is because when using
interfaces, anything that you define to perform those receiver methods can
be passed in.  

This is especially good because it helps us have loosely coupled code.  

If you go to the Go documentation  you can see the following information:

- [type Handler](https://pkg.go.dev/net/http#Handler "type Handler interface ")
- [http.Server](https://pkg.go.dev/net/http#Server "http Server")

As you can see, the http Server Handler is just an http Handler.  So as
long as we define ServeHTTP(ResponseWriter, *Request) we can pass that in
to our server.  

```
type AMRouter struct {
	PathToStaticDir   string
	EmbeddedStaticDir embed.FS
	IsProduction      bool
	Routes            []AMRoute
	Middleware        []MiddleWareFunc
	GlobalMiddleware  []MiddleWareFunc
}

type AMRoute struct {
	Method     string
	Path       *regexp.Regexp
	Handler    http.Handler
	Middleware []MiddleWareFunc
}

func NewRouter() *AMRouter {

	return &AMRouter{
		Routes:           []AMRoute{},
		Middleware:       []MiddleWareFunc{},
		GlobalMiddleware: []MiddleWareFunc{},
	}
}
```

This is the setup for my custom router.  

`AMRouter` is a struct that takes in routes which I have defined as type
`AMRoute`.  The AMRouter will also have the receiver method ServeHTTP that
satisfies the http.handler interface.  

At a high level, the router is going to:
- serve static files
- pattern match using regex to match route keys
- allow for middleware
- serve http handlers


Since we will be using regex to match the route keys, we can define an
empty struct type as well as receiver method to extract route keys:

```
type CtxKey struct{}

func (rtr *AMRouter) GetField(r *http.Request, index int) string {
	fields := r.Context().Value(CtxKey{}).([]string)
	if len(fields) > 0 {
		if index > len(fields) {
			return ""
		}
		return fields[index]
	} else {
		return ""
	}
}
```
The `GetField` method extracts the route key from the request context. The
fields are then cast to a slice of string which are than accessed via the
index parameter.  

If no value are found, we just return an empty string.  

## AddRoute Helper For Custom Go http Router

```

// MiddleWareFunc is an alias for func(http.Handler) http.Handler
type MiddleWareFunc func(http.Handler) http.Handler

// AddRoute takes a method, pattern, handler, and middleware and adds it to an instance of AMRouter.Routes
// It can return a regex compile error
func (rtr *AMRouter) AddRoute(method string, pattern string, handler http.HandlerFunc, mware ...MiddleWareFunc) error {

	var mwareToAdd = []MiddleWareFunc{}

	if len(mware) > 0 {

		for _, mw := range mware {
			mwareToAdd = append(mwareToAdd, mw)
		}

	}

	re, err := regexp.Compile("^" + pattern + "$")
	if err != nil {
		return err
	}
	rtr.Routes = append(rtr.Routes, AMRoute{
		Method:     method,
		Path:       re,
		Handler:    handler,
		Middleware: mwareToAdd,
	})

	return nil
}
```

I defined a `MiddleWareFunc` type.  This is just an alias for a middleware
handler.  A middleware handler is just a regular function that accepts an
http.Handler and returns one.

Handlers get passed in to `AddRoute` at the end as variadic.  This is so we
can handle the case of either having, or not having middleware.  

The rest of the `AddRoute` function is pretty simple to follow:

We are just creating a new `AMRoute` populating it's fields, and appending
it to an already existing instance of `AMRouter`.  I elected to use
`regexp.Compile` instead of `regexp.MustCompile` so I could return an error
in the event that the regex wasn't parsable.  So this function returns an
error of either nil or some value, but the only place that an error is
generated is `regexp.Compile`.

### Writing Our Own ServeHTTP Function to satisfy the http.Handler Interface

To satisfy the http Handler interface, our struct needs to have a receiver
method called `ServeHTTP` that accepts a ResponseWriter and a request.  I
elected to use go's static file server built into the standard library to
handle static file serving.  That is why we need to define the path to the
static directory earlier.  I created a helper function called
ServeStaticDirectory which short circuts the `ServeHTTP` function if the
path to the request lives in the static directory. 

For these requests, we simply create an http.Fileserver, strip the prefix
from the request, and serve the files from their location.  

`ServeStaticDirectory` returns a `bool` value.  If the value is true, we
are all done, if the value if false, we continue processing the request.  

Next, I define `allow []string` which holds are allowed methods.  This is
useful for when the route pattern matches, but the method does not.  We can
return a custom not allowed response so folks know that they don't have the
write method.  

```
if len(allow) > 0 {

		var customErrFunc http.Handler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Allow", strings.Join(allow, ", "))
			w.WriteHeader(405)
			err := errors.New("405 method not allowed")
			fmt.Fprint(w, err.Error())
		})

		customErrFunc = rtr.AddMiddlewareToHandler(customErrFunc, rtr.GlobalMiddleware...)
		customErrFunc.ServeHTTP(w, r)
		return

	} else {
		rtr.Custom404Handler(w, r)
		return
	}
```

Originally I  used `http.Error` for this, but when I started adding in
middleware, I realized I needed to customize this slightly to continue
processing global middleware.  I use the helper reicever function
`AddMiddlewareTOHandler` to pass global middleware into the custom error
handler.  This just takes the current version of the handler, and updates
it to be wrapped in the next middleware handler and returns it.  

### Matching The Request Path To A Route

This is just a basic loop logic.  Ranging over each entry in
AMRouter.Routes, we look for any matching regex patterns using
`FindStringSubmatch`.  If there is any matches, it returns a slice of the
matches.  Note that the first match is always the entire string here.

If `len(matches) > 0` we continue processing the request:

1. Check if the method is correct.  If it is not, we bail out of the
   current indexed item.  
2. We extract the route parameter via `context.WithValue`.
3. We create a handler that wraps the route handler.  The context gets
   passed in with the request context. 
4. We check if the route has any middleware.  If true, we range over the
   midleware and update the handler to be wrapped in the middleware.  These
   get added in reverse order so they operate in the order they were added
   by the user. 
5. We do the same thing for any golobal middleware
6. If everything matched, we serve the handler.  
7. If nothing matched, but allow has length, we return the
   http.MethodNotAllowed handler.
8. Finally, if nothing comes up as a match, we return a 404 not found page.



### Adding Global Middleware To Custom http Router

To make global middleware available to all routes, I created a receiver
method called `Use`.  

This just appends a `MiddlewareFunc` to the GlobalMiddleWare slice value of
the `AMRouter`.   Remember, Middleware is just a func that accepts and
returns an `http.handler`.

```
func (rtr *AMRouter) Use(mw func(http.Handler) http.Handler) {
	rtr.GlobalMiddleware = append(rtr.GlobalMiddleware, mw)
}
```

### Custom 404 Not Found Page

```
func (rtr *AMRouter) Custom404Handler(w http.ResponseWriter, r *http.Request) {
	notFoundHandler := http.NotFoundHandler()

	if len(rtr.GlobalMiddleware) > 0 {
		notFoundHandler = rtr.AddMiddlewareToHandler(notFoundHandler, rtr.GlobalMiddleware...)
	}

	notFoundHandler.ServeHTTP(w, r)
}
```


The Custom404Handler repeats the same logic as the Method Not Allowed
Handler.  We simply extend it to continue processing any middleware as
needed.  


{{< gist elkcityhazard bbe1ecb88049e330b3276c37c2906bee >}}
