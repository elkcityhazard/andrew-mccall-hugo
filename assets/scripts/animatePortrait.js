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
        
    }

}


// slice image into grid, each cell object is a grid area

class Cell {
    // we need to have a reference to the effect class
    constructor(effect, x, y, index) {
        this.effect = effect
        this.index = index
        this.x = x
        this.y = y
        // to move the cell itself
        this.positionX = Math.abs(Math.random() * this.effect.width + 1)
        this.positionY = Math.abs(Math.random() * this.effect.height + 1)
        this.speedX
        this.speedY
        // we want cell width and height to be the same
        this.width = this.effect.cellWidth
        this.height = this.effect.cellHeight
        this.image = effect.image
        this.slideX = 0
        this.slideY = 0
        this.vx = 0
        this.vy = 0
        this.ease = 0.01
        this.friction = 0.8
        this.randomize = Math.random() * 50 + 1
       
        setTimeout(function(){
            this.start()
        }.bind(this), this.index * 2)

    }

    draw(context) {
        
       // Drawing an image onto the canvas.
        // `this.image` is the source image object to be drawn.
        // The first pair of `this.x` and `this.y` specify the top-left corner of the sub-rectangle of the source image to draw into the destination context.
        // `this.width` and `this.height` define the size of the rectangle to be painted (which may scale the original image if the size is different).
        // The second pair of `this.x` and `this.y` are the coordinates in the destination canvas at which to place the top-left corner of the source image.
        // The second `this.width` and `this.height` specify the size to scale the image to in the destination canvas.
        // If the destination sizes are different from the source sizes, the image will be scaled accordingly.
        context.drawImage(this.image, this.x + this.slideX, this.y + this.slideY, this.width, this.height, this.positionX, this.positionY, this.width, this.height)
        context.strokeStyle =  (this.speedY > 0 || this.speedX > 0) ? `rgba(0,0,0,${this.speedX})` : `rgba(0,0,0,0)`
        context.strokeRect(this.positionX, this.positionY, this.width, this.height)
     }

    start() {
            this.speedX = (this.x - this.positionX)/ this.randomize 
            this.speedY = (this.y - this.positionY)/ this.randomize
    }

    update() {
        // this.slideX = Math.floor(Math.random() * 2) + 1
        // this.slideY = Math.floor(Math.random() * 2) + 1

        if (Math.abs(this.speedX) > 0 || Math.abs(this.speedY) > 0) {
            this.speedX = (this.x - this.positionX)/ this.randomize 
            this.speedY = (this.y - this.positionY)/ this.randomize
            this.positionX += this.speedX
            this.positionY += this.speedY
        
        }
       

        


        // The formula const dx = this.effect.mouse.x - this.x calculates the horizontal distance (dx) between an object's x position and the mouse's x position within the context of this.effect. It's often used in graphics programming to determine how far the mouse is from an object on the x-axis, which can be useful for implementing drag-and-drop functionality, mouseover effects, or other interactive features.

        const dx = this.effect.mouse.x - this.x
        const dy = this.effect.mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy) // Math.hypot(dx, dy)

       if (distance < this.effect.mouse.radius) {
           const angle = Math.atan2(dy, dx)
           const force = distance / this.effect.mouse.radius
           this.vx = force *  Math.cos(angle)
           this.vy = force * Math.sin(angle)
       } else {
           this.vx = 0
           this.vy = 0
       }

       this.slideX += (this.vx *= this.friction) - this.slideX * this.ease
       this.slideY += (this.vy *= this.friction)- this.slideY * this. ease
    }
}

// the main brain of the animation to manage state

class Effect {
    constructor(canvas, image) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
       
        this.width = this.canvas.width
        this.height = this.canvas.height
        // we need to set up some cell attributes
        this.cellWidth = this.width / 25
        this.cellHeight = this.height / 40
        this.image = image
        // we need to creat a new cell inside of the effect class
        //this.cell = new Cell(this, 0,0)
        this.imageGrid = []
        this.createGrid()
        this.mouse = {
            x: undefined,
            y: undefined,
            radius: 100,
        }

        this.active = false

        this.canvas.addEventListener('mousemove', function(e){
            return false
            this.mouse.x = e.offsetX
            this.mouse.y = e.offsetY
            
        }.bind(this))

        this.canvas.addEventListener('mouseleave', function(e){
            return false
            this.mouse.x = undefined
            this.mouse.y = undefined
            
        }.bind(this))
        

    }

    createGrid() {
        let index = 0
        // outer loop handles rows, inner loop handles columns
        // each row, we increment by cellWidth and add a new grid cell
        // once we get to the end of the height or width, we are done
        for (let y = 0; y < this.height; y += this.cellHeight) {
            for (let x = 0; x < this.width; x += this.cellWidth) {
                index++
                this.imageGrid.unshift(new Cell(this, x, y, index))
            }
        }
    }

    render() {
        this.imageGrid.forEach((cell, index) => {
            cell.update()
            cell.draw(this.context)
        
        })
    }

}



export {
    PortraitAnimation,
    Cell,
    Effect
}

