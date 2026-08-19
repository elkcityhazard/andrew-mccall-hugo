---
title: 'Golang How to Test Slog Logger'
date: 2026-08-18
author: Andrew M McCall
description: I explain the easiest way to test slog Handlers in Google's Go (Golang) 
summary: This is a straight and too the point guide to testing slog.TextHandler using Go's testing package for Google's Golang.
publishDate: '2026-08-18T21:25:13-04:00'
updateDate:  '2026-08-18T21:25:13-04:00'
images: ['/images/twitter-card.png']
draft: false
categories:
  - Go
  - Golang
tags:
  - TDD
  - Testing
---

## Explaining the issue with testing slog.TextHandler

I came across a case where I needed to test a `slog.TextHandler` using Google Go's testing package.
My initial thought was to use simple `os.Stdout` redirection:

```
old := os.Stdout
r,w,err := os.Pipe()
if err != nil {
    t.Error("could not create pipes")
    }
os.Stdout = w
logger.Info("message","key","value")
_ = w.Close()

os.Stdout = old

out, _ := io.ReadAll(r)

if !strings.Contains(string(out), "message") {
 t.Errorf("expected %s but got %s\n","message",string(out))
    }
```

I assumed I'd be able to capture the output from Stdout but I was wrong.  When I
used `t.Log(string(out))` I realized it was not capturing any output. Instead of figuring out a
solution, I decided to adjust my code.

1. Create a reusable factory function
2. Pass in the writer and level parameter
3. In my unit test, instead of passing `os.Stdout`, I can pass in a `bytes.Buffer`

## Create A Reusable slog.Handler Factory Function

```
func NewLogger(w io.Writer,levl slog.Level) *slog.Logger {
		return slog.New(slog.NewTextHandler(w,&slog.HandlerOptions{
			Level: levl,	
		}))
}

```

Now we can use this in our production code to setup a new logger:

`logger := NewLogger(os.Stdout,slog.LevelInfo)`

But in testing we can write the following unit test:

```
func Test_NewLogger(t *testing.T) {
		var buf bytes.Buffer
		msg := "hello"
		key := "world"
		val := "!"
		logger := NewLogger(&buf, slog.LevelInfo)

		logger.Info(msg,key,val)

		if !strings.Contains(buf.String(), msg) {
			t.Errorf("Expected output to contain %s but got: %s\n",msg,buf.String())
		}
}

```
## Conclusion

Sometimes the best solution is to write more testable code.  I am sure someone smarter than me could
get it to work using os.Stdout, but for me it was just easier to create a more flexable structure.  
