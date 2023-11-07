---
title: "Vanilla Javascript Carousel Slider: A Beginner's Tutorial"
author: Andrew M McCall
description: "Making a responsive slider carousel with vanilla javascript is easy.  Follow My step by step guide to making a simple, responsive slider.  "
date:  2023-01-29T00:00:00
updated:  2023-01-29T00:00:00
image: "/blog/2023/01/carousel-slider.png"
images:
- "/blog/2023/01/carousel-slider.png"
categories:
- Web Development
tags:
- Javascript
- Frontend Web Development
- CSS
- HTML
- Vanilla Javascript
draft: false
---




# Vanilla Javascript Carousel Slider: A Beginner Slider

A photo or content slider is one of the oldest, but most popular design assets one can create with javascript.  Many developers will reach for popular carousel frameworks such as swiper, slick, or photoswipe.  Most of the time, you don't need so much overhead.  Let's build a slider together and see how we can build a responsive slider without using a ton of a extra javascript. 


## Vanilla Javascript Carousel Slider - HTML

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gallery!</title>
    <link rel="stylesheet" href="./style.css">
  </head>
  <body>
    <div id="app">  
      <div class="carousel-wrapper">
        <div class="slide">
          <img src="https://picsum.photos/id/237/1920/1080" alt="slide">
        </div>
        <div class="slide">
          <img src="https://picsum.photos/id/238/1920/1080" alt="slide">
        </div>
        <div class="slide">
          <img src="https://picsum.photos/id/239/1920/1080" alt="slide">
        </div>
        <div class="slide">
          <img src="https://picsum.photos/id/240/1920/1080" alt="slide">
        </div>
        <div class="slide">
          <img src="https://picsum.photos/id/241/1920/1080" alt="slide">
        </div>
      </div>
      <button id="prev">Prev</button>
      <button id="next">Next</button>
    </div>
    <script type="module" src="./main.js"></script>
  </body>
</html>

```

The html  is pretty straightforward to make a responsive vanilla javascript carousel slider.  a div with an id of `app` is used to control overflow of the slides.  
Inside of the `app` we have a wrapper for the slides themselves.  In this instance, I gave that container a class of `.carousel-wrapper` but it doesn't matter what class it has as long as you know what it is called. 

Inside of the `.carousel-wrapper` we are placing our slides.  In this instance, I am grabbing images from [Lorem Picsum](https://lorem.picsum "lorem picsum").  

After the `.carousel-wrapper` but before the end of the `#app` div, I am placing the `#next` and `#prev` buttons to increment or decrement the vanilla javascript carousel slider.  

That is pretty much it for the html set up.  Nothing too complicated so far.  One thing to note, is many often place carousel slides in a list.  I think that this would be semantically more correct since a carousel slider is technically a list of slides.  But, since there is no textual content, I have elected to keep this as simple as possible. 

To make this a bit more robust, we definitely would want to add an alt tag, a title tag, a height and width property, a decoding tag, and use html5 picture tag to make it a bit more complete.  In an effort to make this as easy to follow, I have elected to ommit some of these enhancements.  



## Vanilla Javascript Carousel Slider: CSS

```
html,
body {
  height: 100%;
  width: 100%;
}

#app {
  overflow:hidden;
  max-width: 768px;
  margin: auto;
  position: relative;
}

.carousel-wrapper {
  display: flex;
  max-width: 768px;
  margin: auto;
  width: 100%;
  height: 100%;
}

.slide {
  flex: 0 0 100%;
  height: 100%;
  width: 100%;
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
}

#prev,
#next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

#prev {
  left: 1em;
}

#next {
  right: 1em;
}

```

Most of this css is very straight forward if you have written any css at all.  A few things to note here is that `#app`  is essentially a wrapper div that we are using to contain the slides.  Because `.carousel-wrapper` is using flexbox, and the slides are overflowing their container, putting `overflow:hidden` is the trick to making sure we are only seeing the active slide.  

`.carousel-wrapper` has `display: flex` and the `.slide` has `flex: 0 0 100%`.  This allows each slide to take up 100% of the container.  Also, the slides will not wrap to the next line which is good because we are creating a horizontal scrolling carousel.  

For the images, I changed them to display block so they would take up the entire height and width of the container. 


## Vanilla Javascript Carousel Slider: Javascript

```
const slider = document.querySelector('.carousel-wrapper')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
let slideIndex = 1
let isMoving = false

const start = slider.firstElementChild.cloneNode(true)
const end = slider.lastElementChild.cloneNode(true)

slider.appendChild(start)
slider.prepend(end)


function moveSlides() {
    slider.style.transform = `translate3d(-${slideIndex * 100}%, 0, 0)`
}

function slideHandler(type) {
    isMoving = true
    type !== 'prev' ? slideIndex += 1 : slideIndex -= 1
    slider.style.transition = `transform 1000ms ease-in-out`
    moveSlides()

}

nextBtn.addEventListener('click', (e) => {
    if (isMoving) return
    slideHandler()
})

prevBtn.addEventListener('click', (e) => {
    if (isMoving) return
    slideHandler('prev')
 })

slider.addEventListener('transitionend', () => {
    isMoving = false
    const slides = document.querySelectorAll('.slide')

    if (slideIndex <= 0) {
        slider.style.transition = "none"
        slideIndex = slides.length - 2
        moveSlides()
    }

    if (slideIndex >= slides.length - 1) {
        slider.style.transition = "none"
        slideIndex = 1
        moveSlides()
    }

})

moveSlides()
```


1. We define some variables.  The first thing we do is define the slide-wrapper as `slider`.  This is going to be the container that we control `transform: translateX()` with.  
2. `prevBtn` and `nextBtn` are defined so we can controller the slider and increment or decrement it.  
3. We set the default slideIndex to 1 to position the first slide.  
4. We define a variable named `isMoving` so that we don't double increment or decrement slides when we click the respective buttons. 
5. Part one of the trick is cloning the first and last slide.  We do this using the `cloneNode` method.    This looks like this:

```
const start = slider.firstElementChild.cloneNode(true)
const end = slider.lastElementChild.cloneNode(true)
slider.appendChild(start)
slider.prepend(end)
```

The reason we need to do this part is because we are going to use a `transitionend` event listener to transition the vanilla javascript carousel slider to the beginning or the end.  When the carousel slider gets to the beginning or the end, we are going to remove the `transition-type` and cleverly restart the slide.  

6. `moveSlides()` is just a convenience function to set the transition of the `slider` based on the current `slideIndex`
7. `slideHandler()` does a couple of things:
	1. It sets `isMoving` to true.  This flag will allow us to control excess click events from firing .
	2. We take in a `type` and check if it equals `'prev'`.  We use this type to determine if we are `incrementing` or `decrementing` `slideIndex`.
	3. We make sure that the `transiton-type`, `transition-duration`, and `transition timing-function` are set on the `slider`.
	4. we fire `moveSlides()` which recalculates the current `translateX()` value. 
8. Next, we have `2` click events, one for each button to control which way we translate the slider.
9. The final trick to getting this slider to work is using `transitionend` event listener.  
	1. we add an event listener to `slider` with the event `transitionend` with an `anonymous callback` function.  
	2. Since the transition has ended, we set `isMoving = false`.  If we don't do this, we won't be able to increment or decrement the sldier with the buttons.  
	3. We create an array of the slides using `document.querySelectorAll('.slide')`.  We need to do this so we can control navigating the start and end of the slides. 
	4.  This is where we do a bit of magic:
```
if (slideIndex <= 0) {
        slider.style.transition = "none"
        slideIndex = slides.length - 2
        moveSlides()
    }

    if (slideIndex >= slides.length - 1) {
        slider.style.transition = "none"
        slideIndex = 1
        moveSlides()
    }

```
Typically, if we are using `flexbox` as a carousel, we are setting the translation value as `slider.style.transform = translateX(-${slideIndex * 100}%)`.

If we reset the slideIndex to `0` the slider will quickly translate back to the beginning of the slide in a most **non-graceful** manner.   To avoid this fast and jarring transition, we have cloned the first slide and placed it at the end as well as cloned the last slide and placed it at the beginning.  By doing this check on the `anonymous function` attached to the `transitionend` event handler, we are quietly transforming the slide to the beginning or end of the vanilla javascript carousel slider.

To explain another way, Once we get to `index of 0`, since that is actually a clone of the last slide, we are removing the transition-type and quickly jumping to the original slide which is at `slides.length -2`.

Again, if we are getting to the last slide which is a clone of the first slide - the slide that is at `slides.length - 1`, we are saying,

> "Hey, let's turn off the transform and quickly jump to the actual first slide which is actually at index position 1."


<iframe width="100%" height="300" src="//jsfiddle.net/elkcityhazard/6vqyg0d2/3/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## Vanilla Javascript Carousel Slider Conclusion

Creating a vanilla javascript carousel slider doesn't require bringing in a large library.  As you can see, we can accomplish this with relative ease with vanilla javascript. 

The final consideration would be to add touch events.   This would require just a bit more work.  We would need to use touch or pointer events, get a start position, a "ondrag" position, and calculate the difference.  

Once we know the difference we can determine if we need to increment or decrement the slide.  

I would say the most challenging part to this would be adding in a ui response to give feedback on the "grab."  

If you need help, feel free to reach out to me at @elkcityhazard on twitter.  

