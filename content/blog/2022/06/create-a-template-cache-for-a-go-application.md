---
title: How To Create A Template Cache For Your Golang Web Application
author: Andrew M McCall
date: 2022-06-26 00:00:00
description: How to create a reusable template cache for a go web application that allows the application to read templates from memory.
image: "/images/blog/2022/template-cache-1200x600.jpeg"
draft: false
category:
- Web Development
tags:
- Golang
- Web Development
- Server Side Go
---

A beginner's guide to create a reusable template cache for your Go web application:  eveything you need to get started.   For example the `net/http` and `html/template` package are part of the standard library and allow us to create full-featured web applications with just the standard library.  

## Template Cache In Go Web Applications: A Beginner's Guide

Getting started creating a web application with __Go__ isn't difficult.  One area that was difficult for me was the idea of creating a template cache to serve __Go__ template files. 

__Note__: This example actually uses material from Trevor Sawler's udemy course which can be purchased here: [Building Modern Web Applications With Go](https://www.udemy.com/course/building-modern-web-applications-with-go/ "Trevor Sawler's Udemy Course On Golang") 

Reading templates from the filesystem is pretty straightforward.  But what if you want to read all the templates onces and store them in an in-memory app?  Well that is entirely possible of course.  It does take a little bit of work that was confusing for me at first.  The tricky part, in my opinion, was learning how to create a site-wide app configuration and passing the data around the app.  For this particulary method, we use an AppConfig to store the template cache as a map.  Then to pass the data to the rendering engine, we create a helper function inside of the rendering engine to get the AppConfig and have access to it.  



1.  Create a new go application and run `go mod init basic-web-app` where `basic-web-app` is the location of your project repo such as github or gitlab.
2.  Create a new directory in the root of your project at `cmd/web`
3.  Inside of `cmd/web` we want to create our `main.go` file
4.  At the root of your project directory, you will want to create a new folder called `pkg`
5.  Inside of `pkg`, create 3 new directories `config`, `render`, `handlers`. For each new folder respectively, create a new go file named the same as the folder.  For example, `config.go`, `handlers.go`, and `render.go`
6.  Again, at the root of the project directory, we need to also create a folder named `templates` which will store our respective templates.  Inside of the `templates` directory we need to create two templates: `base.layout.tmpl` and `home.page.tmpl`  These will be the go html templates to render our pages. These will need to be populated like so:

```
@@ base.layout.tmpl will look like this

{{ define "base" }}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ template "title" . }}</title>
</head>
<body>

    {{ template "Content" . }}
    
</body>
</html>

{{ end }}

```

```
@@ home.page.tmpl will look like this

{{ template "base" }}

{{ define "title" }}

My home Page

{{ end }}


{{ define "Content"  }}
<p>This is some content</p>


{{ end }}


```

7.  Next, in the render package, I want to create a new function called `CreateTemplateCache` to handle creating the templates.  This file will create a new map that will hold our template sets.  Inside of the render package create a new function that looks something like this. 

```
//  CreateTemplateCache finds all of the templates and returns a map of pointers to the templates

func CreateTemplateCache() (map[string]*template.Template, error) {

	//	create a new map to hold our templates
	myCache := map[string]*template.Template{}

	//	using go built-in filepath module, blog the pages

	pages, err := filepath.Glob("./templates/*.page.tmpl")

	// handle the filepath.Glob error if there is one

	if err != nil {
		log.Fatalln(err)
	}

	//	 next we need to loop through all the pages and create a new template set

	for _, page := range pages {

		//	first we need to get the actual name of the page using filepath.Base

		name := filepath.Base(page)

		// next, we need to actually create the template set

		ts, err := template.New(name).ParseFiles(page)

		//	again, if there are any errors creating the template set and parsing the files

		if err != nil {
			log.Fatalln(err)
		}

		//	Next, the template set needs to know of any layouts we are using so it can parse correctly

		matches, err := filepath.Glob("./templates/*.layout.tmpl")

		// check for errors

		if err != nil {
			log.Fatalln(err)
		}

		//	check if matches are greater than zero (layouts exist)

		if len(matches) > 0 {

			//	using the template set from above, we continue to parse the layouts
			ts, err = ts.ParseGlob("./templates/*.layout.tmpl")

			// check for errors

			if err != nil {
				log.Fatalln(err)
			}

			//  finally, once we parse all of the elements of the page we can add it to the template cache

			myCache[name] = ts
		}
	}

	return myCache, err

}

```

8. Next, we are going to want to create a function to actually handle rendering the templates.   This function will need access to our templateCache which we are going to store in our config package.  We are going to reference or config from memory through a variable called `app`.  To get started, create a fyuncion called `Render Template` inside of the `render` package.

```

// RenderTemplate renders templates using html/template
func RenderTemplate(w http.ResponseWriter, r *http.Request, tmpl string) error {

	// holds the templates for easy access
	var tc map[string]*template.Template

	// app.UseCache checks to see if we are in development or production and decides how we get our templates to render

	if app.UseCache {
		// get the template cache from the app config
		tc = app.TemplateCache
	} else {
		// this is just used for testing, so that we rebuild
		// the cache on every request
		tc, _ = CreateTemplateCache()
	}

	//	 does the template exist in the templateCache?

	t, ok := tc[tmpl]
	if !ok {
		return errors.New("can't get template from cache")
	}

	//	Create a new bytes butter

	buf := new(bytes.Buffer)

	//	execute the template to the buffer

	err := t.Execute(buf, nil)
	if err != nil {
		log.Fatal(err)
	}

	//	write the buffer to http.ResponseWriter
	_, err = buf.WriteTo(w)
	if err != nil {
		fmt.Println("Error writing template to browser", err)
		return err
	}

	// return err

	return nil
}

```

9.  Lets head over to our config package and set that up to get the templatecache to work.  We will need to create a new type `AppConfig` to hold our templateCache in memory for us.

```
package config

import "html/template"

type AppConfig struct {
	TemplateCache map[string]*template.Template
	UseCache      bool
}

```

10.  Back in `main.go` we are going to need to initialize our AppConfig and Store our templates in it

```
package main

import (
	"basic-web-app/pkg/config"
	"basic-web-app/pkg/render"
	"log"
	"net/http"
)

func main() {

	// initalize app config

	var app config.AppConfig

	// render the templates once

	tc, err := render.CreateTemplateCache()

	//	 handle err

	if err != nil {
		log.Fatalln(err)
	}

	// store the templatecache inside of the AppConfig

	app.TemplateCache = tc

	// Turn on production mode to read templates from memory cache

	app.UseCache = true

	// create a new mux

	srv := http.NewServeMux()

	srv.HandleFunc("/", handlers.Home)

	http.ListenAndServe(":8080", srv)
}
```

11.  Next, we are going to need to go back into render and create a little helper function.  This function will be called `NewRenderer` and it's only job right now is to bring the AppConfig into the render package so we have access to it. `render.go` will now look like this:

```
package render

import (
	"basic-web-app/pkg/config"
	"bytes"
	"errors"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"path/filepath"
)

var app *config.AppConfig

func NewRender(a *config.AppConfig) {
	app = a
}

// RenderTemplate renders templates using html/template
func RenderTemplate(w http.ResponseWriter, r *http.Request, tmpl string) error {

	// holds the templates for easy access
	var tc map[string]*template.Template

	// app.UseCache checks to see if we are in development or production and decides how we get our templates to render

	if app.UseCache {
		// get the template cache from the app config
		tc = app.TemplateCache
	} else {
		// this is just used for testing, so that we rebuild
		// the cache on every request
		tc, _ = CreateTemplateCache()
	}

	//	 does the template exist in the templateCache?

	t, ok := tc[tmpl]
	if !ok {
		return errors.New("can't get template from cache")
	}

	//	Create a new bytes butter

	buf := new(bytes.Buffer)

	//	execute the template to the buffer

	err := t.Execute(buf, nil)
	if err != nil {
		log.Fatal(err)
	}

	//	write the buffer to http.ResponseWriter
	_, err = buf.WriteTo(w)
	if err != nil {
		fmt.Println("Error writing template to browser", err)
		return err
	}

	// return err

	return nil
}

func CreateTemplateCache() (map[string]*template.Template, error) {

	//	create a new map to hold our templates
	myCache := map[string]*template.Template{}

	//	using go built-in filepath module, blog the pages

	pages, err := filepath.Glob("./templates/*.page.tmpl")

	// handle the filepath.Glob error if there is one

	if err != nil {
		log.Fatalln(err)
	}

	//	 next we need to loop through all the pages and create a new template set

	for _, page := range pages {

		//	first we need to get the actual name of the page using filepath.Base

		name := filepath.Base(page)

		// next, we need to actually create the template set

		ts, err := template.New(name).ParseFiles(page)

		//	again, if there are any errors creating the template set and parsing the files

		if err != nil {
			log.Fatalln(err)
		}

		//	Next, the template set needs to know of any layouts we are using so it can parse correctly

		matches, err := filepath.Glob("./templates/*.layout.tmpl")

		// check for errors

		if err != nil {
			log.Fatalln(err)
		}

		//	check if matches are greater than zero (layouts exist)

		if len(matches) > 0 {

			//	using the template set from above, we continue to parse the layouts
			ts, err = ts.ParseGlob("./templates/*.layout.tmpl")

			// check for errors

			if err != nil {
				log.Fatalln(err)
			}

			//  finally, once we parse all of the elements of the page we can add it to the template cache

			myCache[name] = ts
		}
	}

	return myCache, err

}


```

12.  But we still need to call the `NewRender`  function so we can give the `render` package access to the `AppConfig`.  So back in `main.go` before we start the server we can do this: `	render.NewRender(&app)`.  This will allow us to pass our data from the `AppConfig` to the render package.

13.  All that is left is to actually handle our route.  In the `handlers`   package we need to create a new function called `Home`.  This will handle our home page route.  

```
package handlers

import (
	"basic-web-app/pkg/render"
	"net/http"
)

func Home(w http.ResponseWriter, r *http.Request) {

	//	since "/" is a catch all we need to handle what happens if it is not the home page
	if r.URL.Path != "/" {
		http.Error(w, "Not Found, Sorry", 404)
		return
	}

	//	if the path is correct, render the home page

	render.RenderTemplate(w, "home.page.tmpl")
}

````


This concept was difficult for me to wrap my head around at first.  I come from a Javascript background so I am not very used to the idea of working with pointers.  I hope this simplified demo helps you get started on the right path with making your Golang web application more efficient if you are using built in templates. 




