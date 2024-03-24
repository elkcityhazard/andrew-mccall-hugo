---
title: 'Go Tests Notes for Creating Go Tests'
date: 2024-02-01T20:48:51-05:00
author: Andrew M McCall
description:  I explain Goroutines and Channels and how to apply them from basic concepts to more advanced use cases. 
summary:  Go has powerful concurrency tools fully baked into the programming Language.  This post aims to explain go routines and channels so you can get started using them in your own projects.
publishDate: 2024-02-01T20:48:51-05:00
updateDate:  2024-02-10T20:40:00-05:00
draft: true
categories:
  - Software Testing
tags:
  - Go
  - Testing
---

# Check Coverage

```
go test -cover .

//  create coverage profile
go test -coverprofile=coverage.out

// see coverage as html document
go tool cover -html=coverage.out

```

# Create A New Test

For a simple program, that only uses a `main.go` file, we would create a new file next to the `main.go` file called `main_test.go`.


## How To Write A Simple Test In Go

```
// inside of main_test.go

func Test_IsPrime(t *testing.T) {
	primeTests := []struct {
		name     string
		testNum  int
		expected bool
		msg      string
	}{
		{"prime", 17, true, "17 is prime"},
		{"not prime", 20, false, "20 is not prime"},
		{"prime", 23, true, "23 is prime"},
		{"0", 0, false, "0 is not prime"},
		{"1", 1, false, "1 is not prime"},
		{"negative number", -1, false, "-1 is not prime"},
	}

	for _, tt := range primeTests {
		if got := isPrime(tt.testNum); got != tt.expected {
			t.Errorf("isPrime(%d) = %t - %s", tt.testNum, tt.expected, tt.msg)
		}
	}
}

```
This would be considered a table test.  What we are doing is creating a slice of structs that hold our test cases. We then iterate through the test cases and run the test for each case we want to test. 

If there is an error, we can use `t.Errorf` to report the error.


## Testing User Input

```
func Test_prompt(t *testing.T) {
	// save a copy of os.Stdout
	oldOut := os.Stdout

	// create a read/write pipe
	r, w, _ := os.Pipe()

	// set os.Stdout to our write pipe
	os.Stdout = w

	prompt()

	_ = w.Close()

	// reset os.Stdout to what it was before
	os.Stdout = oldOut

	// read the output of the prompt function from our read pipe

	out, _ := io.ReadAll(r)

	if string(out) != "-> " {
		t.Errorf("prompt() = %s", string(out))
	}

}
```

To test user input, we are first storing the os.Stdout in a variable. We then creating a read/write pipe.  We take the written value of os.Stdout and store it in our write pipe.

We then call our `prompt()` function and send the value back to the read pipe.  Don't forget that we need to close the write pipe so we do not have a memory leak.  

Now, we restore the value stored in oldOut to os.Stdout.  From there, we are just using the `io.ReadAll(r)` function to read the value.

We then cast out to a string because it is being sent back to us as a slice of bytes.  

Finally, if the result of `string(out)` does not equal our expected prompt value, we create a new `t.Errorf` to handle the error.  


__Note:__ we can use a similar method to test `fmt.Println()`.  The difference, however, is that near the end, where we test the string, we are calling `!strings.Contains()` and throwing a new `t.Errorf()` if the test fails.  

## Testing 
