---
title: Javascript For Countdown Timer
date: 2022-04-10 00:00:00
image: images/blog/2022/javascript-for-countdown-timer-1200x600.webp
tags:
- javascript
- web development
description: Learn how to create a reusable javascript coundown timer with vanilla javascript and no dependencies.  
draft: false
---

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/BLe9v1G7swc" title="YouTube video player" frameborder="0" style="margin: 1rem auto;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>


A recurring problem that I need to solve for clients are counting down to an event, such as a sale or promotion.  Countdown timers can help create a sense of urgency for potential leads so they are often used to instill a "fear of missing out" sense in leads.  

If you wanted to, you could go a step further and pass in the DOM elements as part of the updateTime function to make it more reusable.  In this particular example I did not do that.  This particular version requires you to pass the future date into the function as a date time string formatted: "January 1, 2023 00:00:00".  

Technically, you do not need to add the time but I do because I like be specific to the parameters of the event we are counting down to.

In the __updateTime__ function I like to use a ternary operator to determine if the time object is singular or plural to conditionally render "Days" or "Day".  This is not 100% necessary but I like to do that for the sake of accuracy in real life.  

## What can this javascript countdown timer help you achieve?  

Use it to countdown to a special promotion, urge potential leads to signup for something, or use it to countdown to special dates.  

The Javascript for countdown timer is below.  


## index.html

```
<!DOCTYPE  html>
<html  lang="en">
<head>
<meta  charset="UTF-8">
<meta  http-equiv="X-UA-Compatible"  content="IE=edge">
<meta  name="viewport"  content="width=device-width, initial-scale=1.0">
<title>Countdown Timer</title>
<link  rel="stylesheet"  href="./style.css">
</head>
<body>

  

<div  class="countdown-container">
<span  class="days"></span>  <span  class="hours"></span>  <span  class="minutes"></span>  <span  class="seconds"></span>
</div>
<script  src="./script.js"></script>
</body>
</html>
```

## style.css

```
.countdown-container {
display: grid;
place-items: center;
gap: 1rem;
}
```

## script.js

    // Global Variables (state)
        
    const  d = document.querySelector('.days');
    
    const  h = document.querySelector('.hours');
    
    const  m = document.querySelector('.minutes');
    
    const  s = document.querySelector('.seconds');     
    
    // future should be type of String i.e., "January 1, 2023 00:00:00"    
      
      
    
    function  DateCountdown(future) {     
    
    // Today's Date    
    this.today = Date.now();      
    
    // future Date    
    this.future = function () {    
    return  new  Date(future).getTime();    
    } 
    
    // The Difference      
    
    this.difference = function () {    
    return  this.future() - this.today;    
    }   
    
    // How Many Days?    
    this.days = function () {    
    return  Math.floor(this.difference() / 1000 / 60 / 60 / 24 )    
    }
    
      
    
    // How Many Hours    
    this.hours = function () {    
    return  Math.floor(this.difference() / 1000 / 60 / 60 % 24)    
    }     
    
    // How Many Minutes?     
    
    this.minutes = function () {    
    return  Math.floor(this.difference() / 1000 / 60) % 60    
    }   
    
    // How Many Seconds?      
    
    this.seconds = function () {    
    return  Math.floor(this.difference() / 1000) % 60    
    }    
    }
    
      
      
    
    function  updateTime(future) {   
    
    // create the interval Timer     
    
    const  timer = setInterval(() => { 
    
    // Creating a new instance of the DateCountdown and passing in as string as the date we want to count down to    
    const  theTime = new  DateCountdown(future)   
    
    d.textContent = theTime.days() == 1 ? theTime.days() + ' Day' : theTime.days() + ' Days';    
    h.textContent = theTime.hours() == 1 ? theTime.hours() + ' Hour' : theTime.hours() + ' Hours';    
    m.textContent = theTime.minutes() == 1 ? theTime.minutes() + ' Minute' : theTime.minutes() + ' Minutes';    
    s.textContent = theTime.seconds() == 1 ? theTime.seconds() + ' Second' : theTime.seconds() + ' Seconds';   
    
    }, 1000)
    
      
    
    if (theTime.difference() <= 0) {   
    return  clearInterval(timer)    
    }    
    }
       updateTime("January 1, 2023 00:00:00")


## Auto-Generated Video Transcript

All right, guys.
So this kind of get messed up, so I kind of have to go back and start over.
So I'm just going to walk us through here really quick what I've done to set up a reasonable countdown timer.
So, basically, I what I've done here is I've created an HTML boilerplate with Emmett.
I've linked to CSS.
Stylesheet.
I've linked to script, I've made a countdown container where I've added some spans in there, and I give them classes for each thing.
That's going to be updated.
And so, 14 days, 14 hours, 14 minutes, 14 seconds.
I gave the countdown timer a little bit of style, you know, to basically Center everything.
Basically, if you open this up right now, you say open with live server.
Just go to Second here.
You'll see it's actually working.
Okay, so you're not a centered container.
So but yeah, so how did I do this?
So, basically just created a script here.
So right here are some Global variables.
I created that we're going to give some state to basically this is what we are going to be updating to within the Dom to actually display the countdown.
So right here is a reusable object function that I created where you pass in the date as a string, you know.
Future should be type of string.
January 123, and I usually pass into the timestamp as well.
So, what I've done is basically created methods here, in properties for the Constructor.
So, for example, we have today's day.
So this debt today is the current date.
I get via date.now.
This is a method that Returns the future.
The future value that's passed in and returns at every turn returns in the same format as as this.
This is where we're basically creating a method that takes whatever is returned from the future method.
- today's date.
This is basically how we are calculating.
Each value that we want to Output.
So for example, the days where you're basically saying, so math that floor.
So we're running down to the nearest whole number and basically you're just taking the difference and you're calculating each property here based on simple.
Mathematical formulas that you can find on the internet as I've done.
So, let me get rid of this for now.
So yeah, I mean, we can bring this over here and we can sell how many milliseconds and I day.
So, I mean all the stuff is rarely available.
Let's just say, so.
60,000.
So, as you have 1,000, right?
So you have so days comprised of one.
So 24 hours.
There's 60 minutes in an hour, 60 seconds in a minute, and there's 1000 milliseconds in a second.
So yeah, we're just going through and returning all of these formulas.
Okay, and then, the next thing we're basically doing here is we're just creating a Function to actually update the Dom and calling it.
So you have.
So I'm using the set interval which is a built-in JavaScript function.
I'm assigning it to a variable of time.
So right here, I'm creating a new instance of the date countdown and passing in send a string as As the daily one to come down, too.
Right here.
We're this is where we're updating the Dom, right?
So basically we're just checking to see if it's singular.
So if in the event that we're have a value that's a singular value.
We are saying hey put day instead of days or output hour instead of ours.
Right here is where we're studying.
How often we want to rerun this.
Ian Wright.
And then right here we're saying update time.
We're just we're just initiating the function here and that's pretty much it.
And, I mean, I guess one other thing you could say here is, you know, if the time that difference is less than or equal to Say return.
Clear.
Inter clear Interval Timer.
So yeah.
We're just come back here, but everything still working as a should we refresh.
That is pretty much a little simple timer.
If you have any questions, feel free to reach out.