---
title: 'Javascript Count Up to Number'
date: 2024-07-05T10:41:13-04:00
author: Andrew M McCall
description:  In implementation of a classic UI component where we use Javascript to countup to a number.
summary:  This article explores the classic UI component that is the simple count up timer written in Javascript.  Often used to help display statistics in a dynamic way.  
publishDate: 2024-07-05T10:41:13-04:00
updateDate:  2024-07-05T10:41:13-04:00
draft: false
categories:
  - Web Development
tags:
  - Javascript
  - UI
---


For fun, I have been exploring writing some of the classic frontend UI components.  In this post, I am exploring how to write a simple count up timer using javascript.  

This was spurred on by the fact that Countup.js is ~350 lines of code.  Can we make a Javascript count up effect that is lighterweight?



## Exploring A Javascript Count Up Function

Real world statistics are often dynamic.  Typically, we are going to fetch some data and aggregate it where each element is going to have a different result.

So however, we decide to create a countup timer in Javascript, we are going to need to make sure that the "limit", or the max number is dynamic.  

I think the best way to achieve that is by setting the count up timer limit as a data property of the element.   Then we can use the Javascript dataset method to grab the count out of the array.  This would look like this: 

```
this.limit = +this.element.dataset['count']

```

__Note:__ we are making sure to cast the result to an int using the `+` sign in front of getting the dataset value.  

Thinking this through, there a few things we want this to do:

1. Make sure the counter doesn't go past the limit
2. Make the interval consistent until we get to a certain point, then make it coolOff as we get closer to the limit
3. Be able to call this on any component.  
4. Have no dependencies


So let us get straight to the point and here is the code for a simple javascript count up timer:

```
class CountUp {
    constructor(elID = "", currentIndex = 0, limit = 100, baseInterval = 30, coolDown = 90) {
        this.elID = elID
        this.element = document.getElementById(elID)
        this.currentIndex = +currentIndex
        this.limit = +this.element.dataset['count']
        this.baseInterval = +baseInterval
        this.coolDown = +coolDown
        this.percentOf = Math.floor(this.limit * this.coolDown / 100)
        this.initCountUp()
    }

    initCountUp() {
        document.addEventListener('DOMContentLoaded', this.incrementCount.bind(this))
    }

    incrementCount() {
        if (this.currentIndex > this.limit) return null  // bail out if done
        this.element.innerText = this.currentIndex
        this.incrementSpeed = this.currentIndex / this.limit * 100 < this.coolDown ? this.baseInterval : this.baseInterval * (this.currentIndex - this.percentOf)
        setTimeout(() => {
            return this.incrementCount(this.elID, this.currentIndex++, this.limit, this.baseInterval, this.coolDown)
        }, this.incrementSpeed)
    }
}


export { CountUp }



const countUp = new CountUp("postCount", 0, null, 30, 80) // null because grabbing count from a data id 

```

## Explaining the Javascript Countup Timer

1.  To make this reusable, we are creating a class so that we can instantiate a new count up timer when needed.
2.  Since all we are technically doing is updating a DOM element, we are passing in the element ID which is then setting `this.element` to the actual element we want to update
3. The constructor has a base currentIndex, as well as a limit, a base interval, and the percentage completed before we start to cooldown the update interval
4. To make sure the dom element actually exists, we are waiting until the DOM Content is loaded before we start to increment the count
5. `incrementCount` checks to see if we have reached the limit, and if so, we bail out.  
6. Otherwise, we are resetting the count to the current index.
7. The main logic in the simple Javascript Count Up TImer is controlling the increment speed.
  - For the most part, we just want to use the  `baseInterval`, but once we cross a certain percentage complete threshhold we want to start cooling down the interval duration and making it longer between each interval.
  - To calculate that percentage, we are simply converting the invertal for `coolDown` to an actual percentage and finding out what value meets that progress percentage
  - This is stored in `this.percentOf` as `Math.floor(this.limit * this.coolDown / 100)`
  - For example, if our limit is 100, and our coolDown percentage was 90%, then the coolDown would start when the current index is 90
  - Then, we just multiply the baseInterval by each currentInterval beyond the threshhold interval.  For example, using this formula: `this.baseInterval * (this.currentIndex - this.percentOf)`, if the currentIndex was 92, then the it would be `this.baseInterval * 2`, etc.

8. Finally, after we update the DOM element, we just return a new setTimeout utilizing the updated incrementSpeed


## Final Thoughts on the Simple Cout Up Timer In Javascript

I would still recommend using a Javascript library like Countup.js.  But when you have a simple need, or don't want to bog down your project with dependencies or large codebases, writing your own countup timer component is not too diffuclt.  Vendor packages often handle as many cases as possible, and at times, you might just need something that is a bit more simple.  

Here is a link to [Countup.js](https://github.com/inorganik/countUp.js/tree/master "a popular javascript countup library")
