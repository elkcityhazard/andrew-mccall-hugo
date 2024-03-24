---
title: 'Golang Create a Random String'
date: 2023-12-31T19:18:59-05:00
author: Andrew M McCall
description:  An implementation of a random string generator using golang's rand package and an empty slice of rune.
summary:  Go's rand package can help us easily generate a random string for when we need to ensure uniqueness with naming in our applicaton. We walkthrough the process of generating a random string using golang. 
publishDate: 2023-12-31T19:18:59-05:00
updateDate:  2023-12-31T19:18:59-05:00
draft: false
categories:
  - Web Development
tags:
  - Golang  
  - Crypto
  - Rune
---


## Golang: Introduction To Why We Need Random Strings

Let us say we have a cat photo sharing application where users are allowed to upload photos of their cats.  This sounds amazing of course. But we might start to run into some issues. For example, we may have two different users.  User "Susan" has a cat named "Snowball" and user "Jane" has a cat named "Snowball".  No problem, right? Two people can name their cat the same thing.  But let's say that Susan and Jane upload new pictures of their cats and they both happen to be `snowball.jpeg`.  Furthermore, our application doesn't contain unique directories by user, it just lumps every new file upload into the `/static/media/uploads/` folder.  As you can see, we can potentially have an issue here.  Jane might upload their picture of "Snowball" after Susan uploaded their picture of "Snowball" and overwrite Susan's file upload.  

This type of naming collision is a real world problem with annoying consequences.  To mitigate this, we simply rename all the files using a randomly generated string and save a reference to it in the database.  

## Golang: Generate Random String Using Crypto

Here is the function that I like to use to do this: 

```
package main

import (
	"crypto/rand"
	"fmt"
)

const randomStringSource = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321_+="

func main() {

	fmt.Println(randomString(20))

}

func randomString(n int) string {

	// define 2 vars
	// the first is just a slice of rune that is n length
	// the second is a slice of rune seeded from random string source

	s, r := make([]rune, n), []rune(randomStringSource)

	// loop through the empty rune slice
	for i := range s {
		// generate a prime number based on the given bit length of r log2(n)+1
		// for example, 12 would return a bit-length of 4 so the prime number would be based on 4
		p, _ := rand.Prime(rand.Reader, len(r))

		// define 2 additional variables,
		// x is based on the Unit64 representation of p from above
		// y is based on the uint64 type case of the length of R (our []rune(randomString))
		x, y := p.Uint64(), uint64(len(r)) // note: uint64 here because we know it will not be negative

		// finally for the index of if in s which is just an empty slice of rune
		// choose a  rune from r where the index is the result of modulus operationx x%y

		s[i] = r[x%y]
	}

	// after we finish looping through the rune and assigning values to each index,
	// return the string
	return string(s)
}
```

1. The first thing we need to do is create the randomStringSource seed data.  This is defined as `randomStringSource`.  All we are doing here is creating a string with the random characters we want to use in our function.
2. Next, we need to create the function to handle generating our random string.  This accepts a paramenter `n` which is just the length we want to make the random string.  The function returns the random string.
3. Inside of the function we define to variables.  The first is an empty slice of rune that is the length of `n`.  The second is slice of rune populated with the `randomStringSource`.
4. Then we `range` through `s` which is just the empty rune slice with the length of `n`.  
5. We create `p` which is a random number using the `rand.Prime(rand.Reader, len(r))`.  This returns an expected randomly prime number based on the bit-length of `len(r)`
6. For example, the bit-length of 12 is `log2(12) + 1` or 4 so it could potentially return a value of 1009.
7. Next we define 2 additional variables which we will use to select the random character from the slice of rune that is populated by our `randomStringSource`
8. x is equal to the value of p cast to Unit64
9. y is equal to the length of r (our slice of rune populated by `randonStringSource`) case to unit64
10.  The final operation of the for loop is to populate the current `index` of `s` with the value at index of `r[x%y]`.  Here we use the modulo operator to get the remainder of x / y.  For example: `5 % 3 = 2`
11. After we finish looping through the []rune that is a length of n, we simply return our randomly generated string.


## Golang Types Use

- __String__:  a string is a set of all strings that contains 8-bit bytes.  [In Go, a string is in effect a read-only slice of bytes. ](https://go.dev/blog/strings "Official Golang Blog Post On Strings")
- __Rune__: An alias for the type int32.  Go introduced this concept to mean the same thing as "code point." Since Go's source code is always `UTF-8` encoded, we can extract the following characterizations: a string holds an arbitrary amount of bytes, a string literal, absent of byte-level escapes, always holds valid UTF-8 sequences, these valid sequences represent unicode code points called runes, and there is no guarantee that characters in strings are normalized.  source: [Offical Go Blog](https://go.dev/blog/strings "Official Golang Blog Post On Strings")
- __Uint64__: uint64 is the set of all unsigned 64-bit integers. Range: 0 through 18446744073709551615.  An unsigned integer is used when we know that the value we are storing will always be a non-negative number.  source: [University Of Utah CS Department](https://users.cs.utah.edu/~germain/PPS/Topics/unsigned_integer.html "Unsigned Integer Definition")


As you can see, it doesn't take too many lines of code to easily generate random strings with Go. This can be hugely beneficial to help eliminate naming collision because it removes the dependency of naming from the users and allows for a clean way to index files or other data without risking collision.



