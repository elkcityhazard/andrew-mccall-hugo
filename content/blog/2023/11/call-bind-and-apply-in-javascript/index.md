---
title: Call, Apply, And Bind Methods In Javascript
summary:  Call, apply, and bind methods can be confusing for newer Javascript developers.  In this post, we break down Call, Apply, And Bind methods for newer Javascript developers.
description: we break down call, apply, and bind in Javascript and make sense of some simple use cases to help newer Javascript developers in their journey.
publishDate: 2023-11-15
draft: false
author: Andrew M McCall
category:
	- web development
tags:
	- Call 
	- Bind 
	- Apply
	- Javascript
---


## The Basics of bind, call, and apply

## Call - We Use It All Of The Time

In javascript, when you evoke a function in your program, javascript uses `call` under the hood. 

Think of it like this:

`myFunc()` where the `()` is just a shorthand for call.  

`call` takes a some parameters.  The first parameter is the `this` you want to bind to the function.  

The second parameter is the string argument you want to pass to the `call` function.  This can be comma delimited to accept multiple arguments.
These arguments can be passed into any method that you are calling that accepts arguments. In this case `phrase`

## Apply - Mostly The Same As Call

`apply` is basically a different version of call.  Again, we pass it the `this` that we want to bind to the function.  In this example, we are asserting that we want to borrow the  `speak` method from the `dog` object and apply it to the `cat` object with the `phrase` being equal to `meow`.

Since `apply` works with array-like objects, if we have any additional parameters that we want to pass to the called method, we need to pass that as an array. For Example:

```
const dog = {
  name: "Fido",
  speak: function(phrase, isGoodBoy=false) {
   return  phrase + " my name is " + this.name + (isGoodBoy ? ' and I am a good boy.' : ' and I am a bad boy.')
  }
}

const cat = {
  name: "Felix",
}

console.log(dog.speak.apply(cat, ["meow", true]))




```

## Bind - It Returns A New Function!

`bind` basically sets the context of `this` and returns a whole new function.  This is useful if you might need to reuse a function later on in your program.  In reality, it works very closely to what we have already observed.  

`const bindCatToDog = dog.speak.bind(cat)`

Here we are using the bind method to orient the `this` to the `cat` object.  Later on we can call the function like this:

`console.log(bindCatToDog("rawr"))`




## Some Examples


```
const dog = {
  name: "Fido",
  speak: function(phrase) {
   return  phrase + " my name is " + this.name
  }
}

const cat = {
  name: "Felix",
}

const bird = {
name: "tweety"
}

console.log(dog.speak("woof"))

console.log(dog.speak.apply(cat, ["meow"]))

console.log(dog.speak.call(bird, "tweet tweet"))

const bindCatToDog = dog.speak.bind(cat)

console.log(bindCatToDog("rawr"))
```


I hope these simple examples will help you recall the differences between bind. call, and apply later down the road.  They each represent an added flexibility that can save some time when you are writing code.  

For now, love yourself, now, then, and later.  

