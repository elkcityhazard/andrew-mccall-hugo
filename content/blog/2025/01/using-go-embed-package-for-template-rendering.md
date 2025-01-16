---
title: 'Using Go Embed Package for Template Rendering'
date: 2025-01-15
author: Andrew M McCall
description: "A discussion on integrating the go:embed package into my template rendering engine for golang applications."
summary:  "Go's embed package is excellent for creating a Go template rendering engine.  The benefit of using the embed package is that your templates get bundled with your binary. Learn how to use the embed package to render templates in golang applications."
publishDate: '2025-01-15T19:28:55-05:00'
updateDate:  '2025-01-15T19:28:55-05:00'
images: ['/images/twitter-card.png']
draft: false
categories:
  - Web Development
tags:
  - Go
  - Golang
---


This post acts as a companion to [How To Create A Template Cache For Your Golang Application](/blog/2022/06/create-a-template-cache-for-a-go-application/ "create a template cache for a go application").

I have released a template rendering engine that can be viewed here: [github.com/elkcityhazard/am-render-engine](https://github.com/elkcityhazard/am-render-engine "Golang Template Rendering Engine")

A template cache is just a map with key value pairs that are stored
in-memory.  This allows us to render our templates a little bit faster
because instead of building the template from the host file system, we pre
build them and store them inside a `map[string]*template.Template`.

This helps our website when it is under load because reading from disk is
significantly slower than reading from memory.  

In my previous post, I hosted the template files separately from the
binary.  This works, but it also creates an extra layer of complexity
insofar as one has to maintain  the templates in addition to the binary on
the server.  

This isn't a huge lift, but I like to make things as clean and
transportable as possible.  

This is where the `embed` package comes in.  In a nutshell, the embed
package allows us to embed filesystems directly into the binary at build
time.  This allows us to add our templates directly to the binary, which
makes things nicely portable in the event we need to move our binary
somewhere else.  

The setup is only slightly different than hosting the files on the host
filesystem.  The embed package is built to support this exact functionality
so it actually simplified my code slightly, although I continue to use a
host-based solution for local development.  

## Breaking down go:embed directive

the `go:embed` directive was introduced in Go 1.16.  It allows us to embed
static files and folders into the final shipped binary during the
build/compilation phase.  This is ideal for html files, images,
configuration files, and any other assets that might benefit from being
shipped inside the executable.  

The main benefits of the `go:embed` directive is that it makes are life
easier because the files are directly added to the binary.  This means less
files to manage on the server which ends up with less rsyncs or ftp
requests.  

Because we are embedding the files directly into the binary, it means they
are readily accessible right away.  It doesn't require any extra overhead
to read the file from the filesystem.  


## Using The go:embed directive

```
package main

import (
    "embed"
    "fmt"
    "io/fs"
)

//go:embed example.txt
var example string

//go:embed images/*
var images embed.FS

func main() {
    fmt.Println(example) // Prints contents of example.txt

    files, _ := fs.ReadDir(images, "images")
    for _, file := range files {
        fmt.Println(file.Name())
    }
}
```

This example assumes that there is a file in the current working directly
called `example.txt` and a directory called `images`.  

We use the `//go:embed` directive to say that we want to embed those files.
Notice we are using an asterik to denote that we want anything insde the
images directory to be embedded.  

Additionally, we need to also declare a variable for the embeds to have a
memory address associated with them.  This has to come directively after
the `//go:embed` directive.  

The rest of the program just prints the contents of example.txt, then loops
through the images and prints out the filename.  

Pretty easy.  

## Creating A Go Template Cache Using Go's embed package

Lets take an example template directory at the top level of your
application:

```
// Theoretical template directory

- htmltemplates
  - tmpl
    - layouts
      - base.gohtml
    - pages
      - home.gohtml
    - partials
      - partial.gohtml
  - htmltemplates.go

```

Inside of htmltemplates.go we want to embed teh tmpl directory:

```
package htmltemplates

import "embed"

//go:embed tmpl
var embedTmplFS embed.FS

func GetTmplFS() embed.FS {
    return embedTmplFS
}
```

Note that we created a function called `GetTmplFS`.  This is so we can
easily get access to the embedded filesystem in other packages which we
will need later.  

Next, we can build our `CreateTemplateCache` function:

```
func BuildTemplateCacheFromEmbedFS() (map[string]*template.Template, error) {
    tc := make(map[string]*template.Template)
    // get the file system
    fs := htmltemplates.GetTmplFS()

    // read the files and get the pages
    pages, err := fs.ReadDir("tmpl")
    if err != nil {
        return nil, err
    }

    // if there are pages, start building the template
    for i := range pages {
        // create a new template
        tmpl, err := template.New(pages[i].Name()).Funcs(nil).ParseFS(fs,
        fmt.Sprintf("%s/s", "tmpl/pages", pages[i].Name())

        if err != nil {
            return nil, err
        }

        // next we are going to check for layouts

        layouts, err := fs.ReadDir("tmpl/layouts")

        if err != nil {
            return nil, err 
        }

        // parse the layouts for the template

        if len(layouts) > 0 {
            for _, l := range layouts {
                tmpl, err = tmpl.ParseFS(fs, "tmpl/layouts/"+l.Name())
                if err != nil {
					return nil, err
				}
            }
        }

        // check for partial templates and parse

        partials, err := fs.ReadDir("tmpl/partials")

        if err != nil {
					return nil, err
				}

        if len(partials) > 0 {
			for _, p := range partials {
				tmpl, err = tmpl.ParseFS(fs, fmt.Sprintf("%s/%s", "tmpl/partials", p.Name()))
			}
		}

		tc[pages[i].Name()] = tmpl
    }

    return tc, nil
}
```

The most important thing to understand here is that the embed package has a
special function named `ParseFS` which is used to parse the templates in
the embedded filesystem.  

The rest of the function is just looping through each directory, and
building the template and parsing each definition as directive per
template.  

Finally, we store it in the map, giving it a key that matches the filename.  

## Building The Go Template Rendering Engine

The next step is to actually build the rendering engine.  For this to work,
we need to create the template cache ahead of time and store it somewhere.
I often use my application config struct for this, but it can be anywhere
to your preference.  

Here is the code for the render engine:

```

type TemplateData struct {
    Data map[string]any
}

type application struct {
    templates map[string]*template.Template
    useCache bool
}

var app application

app.templates = BuildTemplateCacheFromEmbedFS()
app.useCache = true

func  RenderTemplate(w http.ResponseWriter, r *http.Request, tmpl string, td *TemplateData) error {

	tc := make(map[string]*template.Template)

	if app.UseCache {
		tc = app.templates
	} else {
		tmps, err := tmpCol.CreateTemplateCache()

		if err != nil {
			return err
		}

		tc = tmps
	}

	t, ok := tc[tmpl]

	if !ok {
		return errors.New("could not get template from template cache")
	}

	buf := &bytes.Buffer{}

	if td == nil {
        td = &TemplateData{}
    }

    data := make(map[string]any)

    data["name"] = "andrew"

    td.Data = data

	//AddTD with r and td here

	err := t.Execute(buf, td)

	if err != nil {
		return err
	}

	_, err = buf.WriteTo(w)

	if err != nil {
		return err
	}
	return nil

}

```
This is just checking to see if we want to use a previously generated
cache, or if we want to build a new template cache on the fly.  

Next, we check that the template exists, and bail out if there isn't any
keys that match the requested template.

Then we make sure there is a TemplateData struct and create one if it
doesn't exist.  

In this example, we are adding some dummy data to the template cache as a
demonstration.

If all goes well, we first write the template to a new `&bytes.Buffer{}`

This basically makes sure that everything goes well rendering the template.
Without this, we would potentially render an error, but continue trying to
build the template anyway.  

Finally, if there are no issues, we write the buffer to the writer which
outputs the html to the page.  

To use our template rendering engine, we can create a trivial example:

```
package main

import (
	"log"
	"net/http"
    "htmltemplates"
    )

type config struct {
	useCache bool
    templates map[string]*template.Templates
}

func main() {

	var cfg config

	cfg.useCache = true


	tc, err := CreateTemplateCache()

	if err != nil {
		log.Fatalln(err)
	}

    cfg.templates = tc

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		err := RenderTemplate(w, r, "home.gohtml")

		if err != nil {
			log.Fatalln(err)
		}

	})

	srv := &http.Server{
		Addr:    ":8080",
		Handler: handler,
	}

	if err = srv.ListenAndServe(); err != nil {
		log.Fatalln(err)
	}

}
```

## Final Thoughts On Go Embed Directive For Rendering Templates

There you have it.  I don't think it was too hard.  The best part about
this is that it makes less files to manage for your binary, they are
readily available right away, and they are stored in memory which makes
them extremely fast to access.  

If you don't want to write this yourself, I have release a go template
rendering engine package which can be viewed on github here: [https://github.com/elkcityhazard/am-render-engine/tree/main](https://github.com/elkcityhazard/am-render-engine/tree/main "A simple golang template rendering package")

Having issues, feel free to reach out to my on mastodon:
[@elkcityhazard@indieweb.social](https://indieweb.social/@elkcityhazard
"Andrew M McCall Golang Developer On Mastodon")


