---
title: 'Javascript Image Animation Effects'
date: 2024-01-27T20:24:05-05:00
author: Andrew M McCall
description:  Some notes on how to use html canvas and javascript to create animations on the front end.
summary:  I walk through the process of using html canvas, javascript, and css to manipulate an image.
publishDate: 2024-01-27T20:24:05-05:00
updateDate:  2024-01-27T20:24:05-05:00
draft: true
categories:
  - Web Development
tags:
  - html
  - css
  - javascript
  - images
---

## Setting Up The HTML

The first thing we need to do is create a new canvas and also have some sort of image to source it.  In this example, I am just using the image that was on the page, but you could also just have a file saved on your server and pull it in that way.  
```
<canvas id="portrait">

</canvas>
<img id="portraitImg" src="/images/andrew-mccall-500x664.png" alt="Andrew M McCall in front of a desert painted background" class="portrait" height="664" width="500" decoding="async">
```

## Javascript Class Setup

```
 class PortraitAnimation {
    constructor(canvas, image) {
        
        this.canvas = document.getElementById(canvas) 
        this.ctx = this.canvas.getContext('2d') 
        this.image = document.getElementById(image)
        this.canvas.width = this.image.width
        this.canvas.height = this.image.height
        


        this.events()
       
    }

    events() {
        if (!this.canvas || !this.ctx || !this.image) {
            return null
        }
        console.info('portrait animation 0.0.1...')

        //this.canvas.drawImage(this.image, 0, 0, this.image.width, this.image.height)
        this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height)

        this.image.remove()
        
    }

}


// slice image into grid, each cell object is a grid area

class Cell {

}

// the main brain of the animation to manage state

class Effect {
    constructor(canvas) {
        this.canvas = canvas
        this.width = this.canvas.width
        this.height = this.canvas.height

    }

}

export {
    PortraitAnimation,
    Cell,
    Effect
}
```

1. We Create the Effect class.  
2. We populate it with properties
3. Establish what the individual cell width and height are going to be
4. Create a new Cell referencing the effect and draw it at 0, 0
5. We want each cell to be the same height and width, so back up in the `Cell Class` we are setting teh height and width to the effect.cellWidth and effect.cellHeight
6. We create a draw method in the cell class
7. create a render method on the Effect class
  - This render method will have call `this.cell.draw(context)`
8. We need to create an imageGrid array inside of the Effect class
9. In Effect Class, create a method called `createGrid()`
  - this is a nested for loop
  the goal here is to create an imageGrid and push a cell to it with the effect, and also the current x y coordinates based on the width of each cell
10. we can actually call create grid in the Effect constructor to get this done right way
11. in render, we need to loop through the imageGrid and call cell.draw() on each of the grid items
12. we need to be able to access the image in the cell
  - in my example, I am actually passing the image from the Effect class.  This is received from the PortraitAnimation Class
  - I updated the draw method to include the following code:
  - ` context.drawImage(this.image, this.x, this.y, this.width, this.height, this.x, this.y, this.width, this.height)`
13. next I need to create an animation loop
  - this calls `effect.render()`
  - it also calls `requestAnimationFrame(animate)`

14. Next we add a prop to the Cell class slideX and slideY
  - we created an update method on the cell which updates slidex and slidey
  - we call update in the forEach loop where we draw the cell
15. In the effect, we create a new property for the mouse
  - this has x, y, and radius
  - we also add an event listener to the canvas for mousemove with a callback function
  - this callback sets `this.mouse` we use `e.offsetX` and `e.offsetY` to populate the mouse values

16. __Distance Between 2 Points__ in 2d space:
 

 ## Calculate Horizontal Distance Between Two Points


 ## Calcualte Angle

 
