---
title: Why am I switching from Javascript to Go for my backend web development needs?
date: 2022-04-24 00:00:00 Z
image: images/portfolio/item6.jpg
tags:
- Go
- Backend
description: Get started with Go by writing a simple program to accept user input
  in the command line
draft: true
---

## GO Programming Language Background

From [Wikipedia](https://en.wikipedia.org/wiki/Go_(programming_language "Main GO article on wikipedia") :

> Go is a statically typed, compiled programming language designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson. 
> It is syntactically similar to C, but with memory safety, garbage collection, structural typing, and CSP-style concurrency. 
> It is often referred to as Golang because of its former domain name, golang.org, but its proper name is Go.


As my journey with Javascript has gone on, I have become increasingly aware that Javascript is not the best tool to create backend environments.  NodeJS is an important tool and get's a lot of grief for it's shortcomings but in reality it is a fantastic tool if you are a Javascript developer.  It can get you coding up your backends in no time.  

That being said, I never felt it was the tool for me.  One of the largest concerns I have with Javascript as a backend language is the unmitigated attack vector threat that is Node Package Manager <abbr title="Node Package Manager" >NPM</abbr>.  Case in point, a relatively recent article, [Thousands of Malicious npm Packages Threaten Web Apps](https://threatpost.com/malicious-npm-packages-web-apps/178137/ "Thousands of Malicious npm Packages Threaten Web Apps"), makes an eye-opening assertion:

>   Because npm packages in general are being downloaded upwards of 20 billion times a week—and thus installed across countless web-facing components of software and applications across the world–exploiting them means a sizeable playing field for attackers, researchers said in their Wednesday report. 
>   An average of 32,000 new npm package versions are published every month (17,000 daily), and a full 68 percent of developers depend upon it to create rich online functionality, according to WhiteSource.
>   
>   That level of activity enables threat actors to launch a number of software supply-chain attacks, researchers said. 
>   Accordingly, WhiteSource investigated malicious activity in npm, identifying more than 1,300 malicious packages in 2021 — which were subsequently removed, but may have been brought into any number of applications before they were taken down.


Even Ryan Dahl, the creator of NodeJS has been witnessed criticizing his own work:

> [...] I think Node is not the best system to build a massive server web. 
> I would use Go for that. And honestly, that’s the reason why I left Node. 
> It was the realization that: oh, actually, this is not the best server-side system ever.
 


