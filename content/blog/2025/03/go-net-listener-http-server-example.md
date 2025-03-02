---
title: 'Go Net Listener Http Server Example'
date: 2025-03-02
author: Andrew M McCall
description:  Making an http server using Go's net package only
summary: We explore the net package, spin up a net.Listener, accept requests, and respond with html 
publishDate: '2025-03-02T08:50:31-05:00'
updateDate:  '2025-03-02T08:50:31-05:00'
images: ['/images/twitter-card.png']
draft: false
categories:
  - Web Development
tags:
  - Go
  - Golang
  - HTTP
  - TCP
  - Educational
---

We can get pretty far with Go using just the net package when it comes to
web development.  Go of course has a fantastic built in http package in the
standard library which is an extension of the net package.  But for the
sake of learning, I decided I wanted to explore creating a simple website
with just the net package.  After all, serving web pages is something we
tend to take for granted.  

## Using Net.Listen and Accepting a connection

At the minimum, we need to tell `net.Listen` we are using the tcp protocol
and assign a port to listen on. I created a function named `startServer`
which is responsible for starting the listening process but also creating
and starting the loop to listen for connections.  When a new connection
comes in, the listener accepts it, then goes on to process the connection
using the `handleConn` function.  

```
func startServer() {
	for {
		conn, err := net.Listen("tcp", fmt.Sprintf("%s", app.Port))

		if err != nil {
			log.Fatalln(err)
		}

		defer conn.Close()

		for {
			client, err := conn.Accept()

			if err != nil {
				log.Fatalln(err)
			}

			go handleConn(client)

		}

	}
}

```

## Handling A Request From The Browser using Net.Listener

If we open up our browser and request a resource to `http://localhost:8080`
not much is going to happen right now.  We need to create some helper
functions so that we can respond to http requests and return an html
document to the user.

In `startServer`, we have an event loop going that ends with a `go routine`
called `handleConn`.  Notice in the example code we are passing in the client
to that function.  This is so we can do further work, but still have accent
to the client and get any requests that are accepted by the connection.  

`handleConn` has 3 main components:

- a helper function called `handleRequest`
- a helper function called `respondConn`
- `defer c.Close()` which closes the current connection when we are all
  done

  Notice that we are passing `c net.Conn` into each of the helper functions
  to do further processing.  

### Examining The Request from net.Conn

```
func handleRequest(conn net.Conn) {
	i := 0
	scanner := bufio.NewScanner(conn)
	for scanner.Scan() {
		ln := scanner.Text()
		fmt.Println(ln)
		if ln == "" {
			break
		}
		i++
	}
}
```

Let's say we wanted to extract the page slug from the request. 

We could make a few changes to our code: 

```
func handleRequest(conn net.Conn) string {
	i := 0
	scanner := bufio.NewScanner(conn)
	for scanner.Scan() {
		ln := scanner.Text()
		if i == 0 {
			reqData := strings.Split(ln, " ")
			urlPath := reqData[1]
			return urlPath
		}
		fmt.Println(ln)
		if ln == "" {
			break
		}
		i++
	}
	return ""
}
```
Now, the `handleRequest` function returns a string.  We use
`bufio.NewScanner` to create a scanner which by default scans each line by
its default delimiter `\n`.  

We know from the [Internet Engineering Taskforce RCF 7230](https://datatracker.ietf.org/doc/html/rfc7230#section-2.1 "Message
Syntax and Routing") that when the browser sends a request to the server
the zero-index first line will be in this format: ` GET /hello.txt HTTP/1.1`.

using the `strings` package from the standard library, we can easily
extract the requested path and return it from teh `handleRequest` function.

Then we can pass the returned `path` value into the `respondConn` function.  

```
func respondConn(conn net.Conn, path string) {
	buf := new(bytes.Buffer)

	body := `<!DOCTYPE html><html lang="en"><head><title>Hello World</title></head><body><h1>Hello World</h1>{{with .Path}}<p>Your request path: {{.}}</p>{{end}}</body></html>`

	tmpl, err := template.New("hello").Parse(body)

	if err != nil {
		log.Fatalln(err)
	}

	type data struct {
		Path string
	}

	d := data{Path: path}

	err = tmpl.Execute(buf, d)

	if err != nil {
		log.Fatalln(err)
	}

	fmt.Fprint(conn, "HTTP/1.1 200 OK\r\n")
	fmt.Fprintf(conn, "Content-Length: %d\r\n", len(buf.Bytes()))
	fmt.Fprint(conn, "Content-Type: text/html\r\n")
	fmt.Fprint(conn, "\r\n")
	buf.WriteTo(conn)
}

```
### Create an empty buffer to execute the template to

In the event that we make a mistake, or something goes wrong we want to
catch it before we send our html back to the client.  Go templates do their
best to render the template, which means that if we make a mistake in our
defined templates i.e., `{{define "Path"}}{{end}}` there is a risk that Go
will keep trying to execute the template with the error in place since it
can execute other templates potentially without issue.  

To resolve that, we first execute the template to a `&bytes.Buffer{}` which
can aid us in catching any errors before we send the html back to the
client.  
Additionally, we use this method to pass any data we want to into the
template.  In this case, we are showing the user their requested path to
the resource.  

To do this:

- we create a struct with an exported property
- we create a new instance of the data struct
- we pass the data into `tmpl.Execute(buf, d)`

If everything goes well, we should not get an error.  

The final step is to write back to the connection which the client will
then receive.  Again, we can reference [Internet Engineering Taskforce RFC
7230](https://datatracker.ietf.org/doc/html/rfc7230#section-2.1 "IETF RFC 7230") to see what format that needs to be in:

```
    fmt.Fprint(conn, "HTTP/1.1 200 OK\r\n")
	fmt.Fprintf(conn, "Content-Length: %d\r\n", len(buf.Bytes()))
	fmt.Fprint(conn, "Content-Type: text/html\r\n")
	fmt.Fprint(conn, "\r\n")
	buf.WriteTo(conn)

```

Notice that our last header write is just a blank line which distinguishes
our headers from the document we want the client to actually render.  

- The first line is the status line which defines the response status and
  also the protocol
- To extract the `Content-Length` we are just using len to get the length of
the `bytes.Buffer`. 
- We tell the client that this is an html document
- We include a blank line to end our header document
- We write the contents of the `Bytes.Buffer` to the connection.  


See the final example below: 



{{<gist elkcityhazard 62a529813a77acac28c229d3cebfe0d6 >}}
