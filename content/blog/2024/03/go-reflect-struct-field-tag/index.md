---
title: Go Reflect Struct Field Tag - Checking That A Key / Value Exists
date: 2024-03-21T16:21:10-04:00
author: Andrew M McCall
description: We use Go's Reflect Package to determine if a required struct key/tag exists 
summary:  Go's reflect package provides a method to inspect the type and value of variables at runtime.  This standard library package is useful for working with abitrary types, or working with objects when we don't know the value until runtime.  In this example, we will use it the reflect pacakge to build an isRequired helper in golang.  
publishDate: 2024-03-21T16:21:10-04:00
updateDate:  2024-03-21T16:21:10-04:00
draft: true
categories:
  - Web Development
tags:
  - Go
  - Golang
  - Validation
  - Reflect Package
---

As I have been developing an api, I have ran into a minor issue.  What I typically do with a monolithic application, is create a forms package.  This makes it really easy to validate a form submission.  I would just use the `Has` method to see if the field is inside the form data payload.  


