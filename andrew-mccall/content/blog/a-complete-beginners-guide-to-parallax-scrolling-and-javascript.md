---
title: Everything You Need To Know About Parallax Scrolling & Javascript
date: 2021-08-29 
image: images/blog/complete-guide-parallax-1200-600.png
tags:
- javascript
- css
- web design
- web development
description: " A complete guide for beginners to parallax scrolling effects, how to
  use them, how to get started creating them if you are new to javascript, css, and
  html."
draft: false
---

 Everything a beginner javascript student needs to know about implementing parallax scrolling on their website. What parallax is, why use it, why not to use, and a few ways that it can be achieved.

## What is parallax scrolling effects?

What is parallax scrolling? If you have only come here for a parallax definition then your journey ends here: Parallax scrolling effects is a movement, one that is created by the scrolling of one layer of an image, which creates a sense of depth and keeps the audience's eyes glued to the screen. It can be done using CSS3 or Javascript. In this blog post, I'll be going through a beginner Javascript tutorial on how to implement parallax scrolling.

## Why use parallax scrolling effects?

Parallax scrolling effects is a type of animation where the background of the website, or the distance of the scene, is moved at a slower speed than the foreground elements. This creates the feeling that the user is moving in the same direction as the foreground elements. Parallax scrolling effects is a very popular technique, used in many different websites, because it can make the user feel immersed in the scene. It is used to give the user a sense of depth and realism.

## Parallax in Action

One of my favorite examples on the internet of parallax motion is the website for the video game Firewatch.  Campo Santo did a really good job at showing how parallax scrolling effects can be used tastefully in a design and not overpower the user and cause banner blindness.  They begin their parallax on scroll effect immediately when you start navigating their single page styled website.  Parallax effects have long been in use since before the internet.  Look no further than games like, "Sonic The Hedgehog," to see fantastic horizontal parallax effects. Early video games adopted a motion parallax technique to help players feel like they are moving with the character on the screen. 


## The Benefits of Parallax

There are a few benefits to using parallax effects on your website in 2021. 

## Make a Good Impression

Parallax website designs can help tell your story.  Motion parallax effects is a 3D effect that helps give depth to a website, bringing the user into the world of the website, and making it feel more immersive.  Parallax scrolling is helpful in storytelling because it helps the user feel like they are actually part of the scene. It can also be used to help make your website feel more interactive. There are 3 ways that you can use parallax scrolling on your website: it can be implemented into the background, the foreground or both. In order to make your website feel more interactive, you can use parallax scrolling in the foreground.  This can create some interesting immersive effects that help move your brand or product story along that parallax scrolling websites often take advantage of. 

## Earn Higher Engagement

Parallax scrolling websites can make a page seem more interactive to the user.  Although many parallax scrollling websites abuse this, parallax website designs can help a page seem more interactive.  A good use case for this is landing pages.  Parallax scrollng designs can help direct your users to the targeted funnel.  With parallax scrolling, you can create an immersive experience that creates a sense of depth and movement for your website. Parallax scrolling websites can help you have a higher engagement rate with your customers and help them feel more immersed in your site assets. When you implement parallax scrolling, focus on your content. You can create a drama of sorts with your content. Focus on the content that you want your customer to take the most interest in and focus on that area of your site. When it comes to parallax scrolling designs, one of the key features is the density of the text. You want your text to have a high density, so that it is noticeable and easy to read. If you have any text written, make sure that it does not scroll out of the viewport area too quickly.


## Point Users to a Call to Action

Parallax website designs can help draw your users' attention to your call to action.  A call to action is usually a button on a website to get your users' to engage with you in some way.  Whether that is to sign up for an email distribution list, or call your business directly, a call to action is a nudge in some direction to perform some action. 

## Types of Parallax Effects

Parallax scrolling makes it possible to have a visual effect where the screen appears to be moving without actually moving, creating the feeling like the user is moving through the page. There are two types of parallax scroll effects: scroll based and mouse based. Scroll based parallax effects are created by the user scrolling the page and displaying the effect. Parallax scrolling websites can be created by using an endless scroll on the page. Mouse based parallax effects are created by the user moving the mouse on the page and displaying the effect. They are created by using a mouse scroll event. The difference between horizontal and vertical parallax effects are created by the user scrolling the page and displaying the effect. Parallax scrolling websites can use a combination of both.  

## Scrolling Based Parallax Effects

Parallax scrolling websites most often use this type of effect in their parallax website designs.  The parallax effect is calculated based on amount the user has scrolled the screen. 


## Mouse Based Parallax Effects

Parallax scrolling websites that use this in their parallax web design are often using it to enhance a particular view or draw attention to an item on the page.  For example, if you have a product view that has some sort of interactive element, a mouse-based parallax effect can help create interactivity with the product.  Parallax website designs that use mouse-based parallax effects are more than likely using it to add a level of interactivity. 


## Adding Parallax Effects Manually To Parallax Scrolling Websites


There are 3 ways to create parallax scrolling effects to a web page. The first method is by using a scroll based effect. This is done by having the page scroll at different speeds at different parts of the page, which creates an illusion of depth. The second method is by using a mouse based effect. This is done by having the mouse scroll at different speeds at different parts of the page, which creates an illusion of depth. The third method is by using a combination of both the scroll based and mouse based effects.

## Why not to use parallax website designs?

Although parallax scrolling can add a lot to a web page, parallax web designs can have a few shortcomings that make it less than ideal.  Parallax scrolling websites can easily cause banner blindnes.  Banner blindness is a term used to refer to the phenomenon where the human eye is less focused on a moving object. Banner blindness is caused by the movement of a website's content and is a result of the human eye not being able to focus on the text or animation at the same time as the movement of the content. This can create a problem where the content moves too fast for the eye to follow. Banner blindness is a form of motion sickness. There are a variety of ways to avoid banner blindness, and these include using parallax scrolling, using parallax scrolling with mouse scrolling, or using a horizontal scroll bar. Scroll bars are typically vertical, and this means that the content moves faster than the eye can follow.


## Parallax Scrolling Without JQuery

<script async src="//jsfiddle.net/elkcityhazard/gp1uw2jf/10/embed/js,html,css,result/dark/"></script>

This is probably the easiest solution for parallax scrolling websites.  Do to it's use of javasript, it will not be the most efficient for browsers to run.  I have included my own example here because I think it is an easy way to get started. 

I have created a re-useable function called parallax that takes two parameters: the object that we will be receiving the parallax effect and the rate at which we want to parallax.  It is important to note that is not parallax with intersection observer, but rather, parallax scrolling with window scroll events. 

Inside the function we need to accomplish 2 things:

- Find the DOM object that we are going to be adding parallax effects to.
- create another function that I called initParallax to update the background Position of the  background image.
- Inside of initParallax function we need to accomplish 3 tasts:
    - Define the x variable:
        - this is to help us set our rate
        - `x = DOMObject.getBoundingClientRect().top;`
    - Define the Y value:
        - The value you we will update the DOMObject with
        - `y = Math.round((x * 100) / 100);`
        - This is the value we will use to update our background position which is linked to the value scrolled
    - Update the DOM Object with the new value:
    - 
        ```
        DomObject.style.backgroundPosition = `center ${y}px`
        ```
- After we define the initParallax function we need to actually call it inside the parallax function.
    - This is so we don't get a jump effect when the browser calls the function on scroll initially

- Inside the parallax function, after we call initParallax, we need to add an event listener to the browser agent window so that the browser knows to fire the function on scrollTop changes.

- Finally, in your javascript file, simply call the function like so:
    - `parallax('myID', rate)`

## Parallax Scrolling Without Javascript

Parallax website designs can be achieved without javascript as well.  See this fiddle below to see how this can be achieved. 


<script async src="//jsfiddle.net/falcographix/8ofphemb/embed/"></script>

## How To Create A Parallax Scrolling Effect With Jquery

Although this example is a bit older using Jquery version 1, the techniqe still holds true to achieving parallax scrolling.

<script async src="//jsfiddle.net/baivong/KLnjL/embed/"></script>

## A few resources to help you learn JavaScript.

https://netninja.dev/


https://codewars.com


https://freecodecamp.org


## A few resources to help you learn CSS

https://www.codecademy.com/learn/learn-css


https://www.frontendmentor.io/


## Conclusion 

We hope you enjoyed our post and found it informative. Parallax Scrolling is a great technique to implement into your web design but it can be a little daunting to start. With our guide, we have broken down how you can get started with create your own parallax scrolling effect in javascript or css. If you still have any questions, feel free to contact us at . We hope this post was useful!


