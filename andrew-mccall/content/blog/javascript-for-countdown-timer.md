---
title: Javascript For Countdown Timer | [VIDEO]
date: 2022-04-10 
image: images/blog/2022/javascript-for-countdown-timer-1200x600.webp
tags:
- javascript
- web development
Description: Learn how to create a reusable javascript coundown timer with vanilla
  javascript and no dependencies.
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


