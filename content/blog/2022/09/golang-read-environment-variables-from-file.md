---
title: "Golang Read Environment Variables From File: How To Do It [Code Snippets]"
author: Andrew M McCall
date: 2022-09-08
image: "/images/blog/2022/how-to-read-env-file-in-go-1200x600.jpeg"
images:
- "/images/blog/2022/how-to-read-env-file-in-go-1200x600.jpeg"
categories:
- Web Development
tags:
- Go
- Golang
- Dotenv
- .env
- Go Application Configuration
Description: "How to create a .env file and read it from file in your golang program."
draft: false
---

## What Are Environmental Variables In Go

A Cautionary Tale: [My AWS Account Was Hacked And I Have A $50,000 Bill](https://www.quora.com/My-AWS-account-was-hacked-and-I-have-a-50-000-bill-how-can-I-reduce-the-amount-I-need-to-pay)

If you have ever used an API key or database connection string, you have most likely had a need to secure some sensitive data. Environment variables are a way to achieve this. We may need to do this because certain API's can only be called so many times and the key is a way of authorizing our requests and keeping track of them. For example, the twitter API only allows 500k Tweets per monthcalls on the free **Essential Access** account per application. -Source: [Twitter Developer Documentation](https://developer.twitter.com/en/docs/twitter-api/tweet-caps "Twitter Developer Documentation")

At a larger scale, we would want to protect our API access token so an abuser cannot gain access to it. This is especially important if we are committing our project to a public git repository. The way environment variables work in Go and in many other languages is that they are declared and assigned variables and their value is set to the the environment placeholder value. In GO this looks like this:

`apiKey := os.Getenv("envVariableName")`

This can be read as: "create an assign a variable named apiKey where the value is equal to the environment variable named "envVariableName."

For example, if we have a .env file with a value `API_KEY=123456789` the apiKey variable would be assigned the value 123456789.  

The environment variable is read into memory and stored for use in the application.  This is better than just hard coding sensitive variables because we can have a strict separation of concerns insofar as others will not be able to easily discover our sensitive keys in public repositories.  

## How To Create An Environmental Variable File In Go

Creating an environmental variable file (.env) is not difficult.  Typically, we store them in the root of our application and name then `.env`.  It is important to note, that if you are planning to commit your project to a public git repository, the `.env` file should be added to the `.gitignore` file.  This is so the environment variable file doesn't get committed to the repository and exposed to threat-actors.  

Once the file is created, it is just a basic text file.  To populate the environment variable values, all you need to do is create some key=value pairs.  For are simple example it might look something like this:

```
API_KEY=123456789
DB_CONNECTION=postgres://name:pass@mydbdomain.com
```
Again, this file can be saved anywhere but I typically store it in the root of the directory, or, in the case of GO, wherever I am going to be building my executable file and running it.  

## How To Read An Environment Variable From File In Go

Reading the environment variables are pretty straightforward in Go.  Let's write some psuedo-code to see what we need to do:

1. Define some package level variables or AppConfig struct to hold environment variables
2. Create a function to open the `.env` file, read it, and parse the values.
3. Assign the environment variables 
4. Use the environment variables


In this simple example we can keep it all to one file:

```
package main

import (
"bufio"
"fmt"
"log"
"os"
"strings"
)

var apiString string
var dbConnection string

func main() {

setENV()

fmt.Println(apiString)
fmt.Println(dbConnection)
}

func  SetENV() {

//	Open the .env file 
envFile, err := os.Open("./.env")
//	check for errors
if err !=  nil {
log.Fatalln(err)
}
 //	defer closing the file until the function exits
defer envFile.Close() 

// create a new scanner to read each row
scanner := bufio.NewScanner(envFile)

//	 loop through each row of the .env file
for scanner.Scan() {
//	split the text on the equal sign to get the key and value
envVar := strings.Split(scanner.Text(), "=")
//	os.Setenv takes in a key and a value which are both strings

os.Setenv(envVar[0], envVar[1])
}
//	check for errors with scanner.Scan
if err := scanner.Err(); err !=  nil {
log.Fatal(err)
}

// assign the environment variables using the os.Getenv method  
apiKey = os.Getenv("API_KEY")
dbConnection = os.Getenv("DB_CONNECTION")
}

```

if all goes well, we should expect to see:

```
123456789
postgres://name:pass@mydbdomain.com

```

## Alternatives To Environmental Variable File In Go

Let's explore some of the alternatives to reading a .env file directory.  

## Creating, Passing, And Parsing Flags

An idiomatic approach to passing configuration variables to your GO application is using command line flags.  

For example, we might write a line of code in our application like this:
```
package main
import (
	"flag"
)
func main() {
`addr := flag.String("addr", ":4000", "Port Address To Listen On")`

flag.Parse()
}
```

Then, to explicitly set the address we might start our application like this:

`go run ./cmd/web -addr=":80"`

Alex Edward's Book, [Let's Go](https://lets-go.alexedwards.net/ "Let's Go") succinctly explains this: 
>This essentially defines a new command-line flag with the name `addr`, a default value of `":4000"` and some short help text explaining what the flag controls. The value of the flag will be stored in the `addr` variable at runtime.

This method can actually be combined with environment variables. For example, you could create a deploy.sh script to define and export the environment variables and pass them into your application as flags

```
$ export ADDR=":9999"
$ go run ./cmd/web -addr=$ADDR
```

The benefit of using flags vs strict environment variables is that you have access to multiple types (env variables are limited to string type) and also a powerful semi-new feature known as flag.Func(), although flag.Func() is not in the scope of this article.  


## Using -ldflags To Set Environment Variables

To start, [Digital Ocean](https://www.digitalocean.com/community/tutorials/using-ldflags-to-set-version-information-for-go-applications "-ldflags option") has a fantastic article regarding -ldflags.  

`-ldflags` is a tool used during the build process and it is incredibly useful at passing dynamic data to your go application.  

From their article:

> One way to solve this in Go is to use `-ldflags` with the `go build` command to insert dynamic information into the binary at build time, without the need for source code modification. In this flag, `ld` stands for [_linker_](https://en.wikipedia.org/wiki/Linker_(computing)), the program that links together the different pieces of the compiled source code into the final binary. `ldflags`, then, stands for _linker flags_. It is called this because it passes a flag to the underlying Go toolchain linker, [`cmd/link`](https://golang.org/cmd/link), that allows you to change the values of imported packages at build time from the command line.

Suppose we want to build our GO application:  

go  build -o my-app `-ldflags="-X 'main.apiKey=$TOKEN' -X 'main.addr=$ADDR'"`

with the `-ldflags` option, we are essentially telling the linker to set these variables in these packages to the following values.  In this example, we are looking at the `apiKey` and `addr` variable in the `package main` 

What does the `-X` stand for?  

>we will use the `-X` flag to write information into the variable at link time, followed by the [package](https://www.digitalocean.com/community/tutorials/importing-packages-in-go) path to the variable and its new value

Source: [Digital Ocean](https://www.digitalocean.com/community/tutorials/using-ldflags-to-set-version-information-for-go-applications "-ldflags option") 

## Using A Package To Read Environmental Variable Files

Don't want to spin up your own `.env` file solution for your next Go application?  Handling all the possible outcomes can be challenging and may often choose to reach for a package.  Here a few that you can `go get` for your next Go project.

- https://pkg.go.dev/github.com/searKing/golang/third_party/github.com/spf13/viper
- https://pkg.go.dev/github.com/joho/godotenv
- https://pkg.go.dev/github.com/direnv/go-dotenv
- https://github.com/Netflix/go-env

**Note:** Remember, using third party packages can introduce risk, bugs, or broken dependencies into your code.  

## Keeping Environment Variables Secure

1. Make sure to include the `.env` in the `.gitignore`
2. Never let users directly access and change `.env`
3. Don't store them in directories that are easily accessible to other system users
4. Consider adding Multi Factor Authentication to your server  

## Golang Environment Variables Conclusion

Reading your environment variables from file in Go is not very difficult.  Consider reducing your application footprint by creating your own small utility to import your environment variables.   This will also help you better understand your application from a security standpoint and learn the value of building from scratch.  

Do you want to work with me?  Email me at [andrew@andrew-mccall.com](mailto:andrew@andrew-mccall.com "Hire a Go Developer").  I have 5 years of experience developing applications and Command Line Tools.  

