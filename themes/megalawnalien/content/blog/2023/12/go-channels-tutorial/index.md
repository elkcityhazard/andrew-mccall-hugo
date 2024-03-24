---
title: Go Channels Tutorial - Understanding Goroutines and Channels
author: Andrew M McCall
description:  I explain Goroutines and Channels and how to apply them from basic concepts to more advanced use cases. 
summary:  Go has powerful concurrency tools fully baked into the programming Language.  This post aims to explain go routines and channels so you can get started using them in your own projects.
publishDate: 2023-12-26
updateDate: 2023-12-16
draft: false
categories:
  - Web Development
tags:
  - Golang
  - Channels
  - Concurrency
  - Go
---

## What Are Goroutines and Channels?

Concurrency refers to the languages ability to deal with many different tasks at once.  In human terms, I like to think of it like doing the dishes while waiting for your laundry to dry. 

### Goroutines: Running Tasks In The Background 

Let's say we have a web application that requires a transactional email.  For example, perhaps a user signs up and subscribes to your service and you want to send them a welcome email or an invoice of some kind.  

This would be a really good use of a goroutine.   Goroutines are essentially functions that can run concurrently in a separate process.  This is beneficial because it prevents blocking in your main program. For example, a user might visit your service, subscribe to a plan, receive a generated invoice, and potentially some other downloadable file like a generated pdf, or other asset.  Sending email could potentially be one goroutine, while generating the downloadable asset could potentially be another goroutine.  This free's up the main thread to continue implementing the main processes of the program.

### Channels: How Go Routines Share Memory By Communicating

[Share Memory By Communicating](https://go.dev/blog/codelab-share "Share Memory By Communicating: By Andrew Gerrand").

Go utilizies Channels to pass references to data between goroutines. A more traditional method to share data is by protecting their structure utilizing locks (which Go still supports).  Channels ensure that only one Goroutine has access to data at a time and eliminates some of the messiness of locks.   

This concept is summarized through the paradigm: 

>Do not communicate by sharing memory; instead, share memory by communicating.

### An Example Of Channels In Go

```

package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

func UpdateInputOutput(b <-chan string, c chan<- string) {

	for {

		in, ok := <-b

		if !ok {
			log.Fatalln("not okay")
		}

		c <- in

	}

}

func main() {

	inch := make(chan string)
	outch := make(chan string)

	go UpdateInputOutput(inch, outch)

	for {

		var userInput string

		var reader = bufio.NewReader(os.Stdin)
		fmt.Println("------------------------")
		fmt.Println("Type 'quit' to exit")
		fmt.Print("Enter A Word To Repeat => ")

		userInput, err := reader.ReadString('\n')

		if err != nil {
			log.Fatalln(err)
		}

		if strings.ToLower(userInput) == "quit\n" {
			break
		}

		inch <- userInput

		response := <-outch
		fmt.Printf("\n")
		fmt.Println("Response:", reverseString(response))

	}

	fmt.Println("all done, closing channels")

	close(inch)
	close(outch)

}

func reverseString(s string) (result string) {
	for _, val := range s {
		result = string(val) + result
	}
	return
}


```

1. Inside of the main function, I created an in channel and out channel.  The in channel will receive data and pass it on to the out channel which will read the final result. 


2.  I defined an `UpdateInputOutput` function.  In this case, I am telling it that be will being set from a channel, while c will be updated from within the function.  This function utilizes an open for loop to continuously listen for channel input.  In the event that there is some issue with the in channel, the function will simply stop the program.  


3. In the main function, I simply start the goroutine (UpdateInputOutput) and I pass it the necessary channels.  From there, We are getting some user input.  Again, we will utilize an open for loop to continuously prompt the user for input.  If the type exit, we break out of the for loop and close the channels.  


4.  Once we receive input, we parse it into a variable, and pass the data to the in channel.  The goroutine fires off and updates the response which we read from the outchannel into `response`.  If everything goes to plan, we will receive our input text reversed as the final output.  If we type `quit` we will simply close the channels, and be done with the program.  







