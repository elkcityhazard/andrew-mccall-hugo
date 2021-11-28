---
title: "CSS Grid Gallery: Easy Fluid Gallery With CSS Grid and Javascript"
date: 2021-11-24
description: "Learn how to create a fluid image gallery with css grid and a few lines of javascript."
draft: false
image: "/images/blog/css-grid-gallery-1200-600.png"
categories:
  - Web Development
tags: ["Web Development", "Javascript", "CSS"]
draft: false
---

Learn how to create a fluid image gallery with css grid and a few lines of javascript. In the following article, we will learn how to create a grid gallery that is fluid and easy to navigate with CSS Grid and Javascript. First, we will create a container for our grid gallery. Then we will create a row of items. Finally, we need to set up a grid to contain the items in the row. We will then apply some styling for our gallery so that it looks nice on all browsers by using CSS Grid and Javascript's responsive design techniques.

## Fluid Layout Thumbnails For Grid Gallery

As a web developer, we are often handed a collection of images that are far from optimized. From being different image file types, to different orientations, there are many challenges that images present to web developers. The challenge is to get these to look good on the page with as minimal image processing as possible.

The biggest challenge we have with image galleries are images with different heights and widths. This makes it difficult to tile the images thumbnails correctly without resorting to the standard fixes such making equal aspect squares and using the object fit to control the image aspect ratio.

This leads to problems, however, because it leaves a lot of room for error because the computer has to guess where the focus of the image should be. One option is to manually resize the images. This is a time consuming process that I personally don't like to do. There are cloud solutions like Cloudinary as well that can help do this. The problem with these services is that their free-tier is usually limited and their monthly payment services are usually expensive.

There is a simple way to create a fluid css grid with no media queries that perfectly tiles differently sized images.

## HTML Image Gallery Setup

The first thing we need to do is set up our grid container:

```
<div class="grid-container">
<div class="grid-item"><img src="https://source.unsplash.com/250x900/?nature,water" alt="image"></div>
<div class="grid-item"><img src="https://source.unsplash.com/250x500/?nature,water" alt="image"></div>
<div class="grid-item"><img src="https://source.unsplash.com/250x400/?nature,water" alt="image"></div>
<div class="grid-item"><img src="https://source.unsplash.com/250x375/?nature,water" alt="image"></div>
<div class="grid-item"><img src="https://source.unsplash.com/250x400/?nature,water" alt="image"></div>
<div class="grid-item"><img src="https://source.unsplash.com/250x500/?nature,water" alt="image"></div>
<div class="grid-item"><img src="https://source.unsplash.com/250x200/?nature,water" alt="image"></div>
<div class="grid-item"><img src="https://source.unsplash.com/250x900/?nature,water" alt="image"></div>
<div class="grid-item"><img src="https://source.unsplash.com/250x850/?nature,water" alt="image"></div>
<div class="grid-item"><img src="https://source.unsplash.com/250x700/?nature,water" alt="image"></div>
<div class="grid-item"><img src="https://source.unsplash.com/250x625/?nature,water" alt="image"></div>
<div class="grid-item"><img src="https://source.unsplash.com/250x633/?nature,water" alt="image"></div>

</div>
```

Next we will need to add in the css styles:

`.grid-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1px 4px; grid-auto-flow: row dense; grid-auto-rows: repeat(10px); }`

Finally, a few lines of javascript:

`const gridItems = document.querySelectorAll('.grid-item')`

`gridItems.forEach((item) => {`  
`const img = item.lastElementChild`  
`img.addEventListener('load', function() {`  
`item.style.height = img.clientHeight + 'px'`  
`const spans = Math.ceil(item.clientHeight / 10);`  
`console.log(spans)`  
`` item.style.gridRowEnd = `span ${spans}`  ``  
`})`  
`})`

## The Final Product

<iframe width="100%" height="300" src="//jsfiddle.net/elkcityhazard/vpf6arLw/46/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## An Explanation Of The HTML

The HTML is straight forward for this limited example. All we are doing is creating a container div to contain all of the image thumbnails we have in our gallery. I wrapped each image into their own container wrapper in case we need to do any additional stylings. In production, you might choose to wrap the images in a figure tag and add a figcaption for added information.

You will notice that the width's of each item is already the same via the images query parameters. I recommend setting an explicit height and width on the image tag to help with client side rendering and making the browser's job a little easier. The css will automatically resize the images, but performance wise it is best to set an explicit height and width on the img tag itself.

## Explaining The CSS For The Grid Thumbnails

Most of the styling goes into the grid container element. We start off by declaring the grid as the display style. Next, we use the built-in css property `grid-template-columns.` This fantastic css property will make our grid thumbnails response and fluid and do most of the work for us. We give it the repeat value which takes in a couple of arguments. The first argument is `auto-fit` which basically tells the browser to choose how to fit our grid columns. This will help our thumbnails because they will be rendered responsively depending on the size of the viewport (mobile, tablet, desktop). Next, we pass in the minmax value which also takes in two parameters. The first value is the minimum size of the column and the second parameter is the maximum size of the column. So in this example we are basically saying, "Hey browser, I want you to make appropriate size columns that are no less than 250px but no more than 1 fraction of the view port. In the event that we have more columns, each one will take up an equal fraction of the viewport.

I also gave each image container a gap property which defines the space between each grid item. Finally, I used the grid-auto-rows property which is something we need for the javascript to work. Basically, we are just telling the browser that we need as many 10px tall rows as we can get that will take up 100% of the content-box of the grid-container.

## Explanation of the Javascript

We need to create a variable to store a nodeList of all of the grid items. I called my variable gridItems to keep it simple. Next we are using forEach to loop through the nodeList much like an array. Here is the tricky part of the equation. We need to get the height of the rendered image to help align the grid correctly. Unfortunately, unless the image is loaded, we cannot access any of it's properties right away. This leaves us unable to programmatically determine the height of each grid item.

There is a work around for this, though. We need to create another function that fires for each nodeList item (the gridItems). Again, I created a new variable which is just the image that will be the thumbnail. To get access to it I reused the scope of the "item" and just reached to the child image with lastElementChild since it is the only child of the scoped item.

Now that I have access to the image, I want to setup a callback function for when the image finishes loading. Remember, we cannot get the image height until it is fully loaded into the document object model.

The next bit of the function is how we programatically set the height of each grid item. We are taking the grid item, accessing it's style properties, and then setting the height to the clientHeight of the image which is just the rendered height of the image after the browser processes the stylesheet.

Next, we want to take this new information and do something with it. We have the height, but we still haven't told the browser how to tile our images. For that we need to do a minor bit of math. If you can remember, we set the `grid-auto-rows: repeat(10px);` This will tell the browser to have as many 10px tall rows as possible within the grid container. In order to tile images in the grid-container we need to the browser what the `grid-row-end` is for each image.

The formula to figure this out is `const spans = Math.ceil(item.clientHeight / 10);`

We are saying: "Do this math problem and round it up to the nearest whole number." The formula is the image height / 10 where is the row height specified in the grid container. We divide by 10 because that is how we can determine how many rows our images should span when the tile.

Finally, the last bit of the callback item is: `` item.style.gridRowEnd = `span ${spans}`  ``

This is how we figure out how many grid rows each grid item should span.

This is a technique I like to use when you don't know the size of the images before hand. This works especially good if you are getting images from clients that need to maintain their size or if you are grabbing images from an api that is random in size.
In this post, we’ve seen how to create a fluid responsive thumbnail gallery with CSS Grid. Now that you have an example under your belt, it should be much simpler for you to build similar layouts of your own. If you have any questions or comments about the process I went through in this post, please message me or contact me via the chat app.
