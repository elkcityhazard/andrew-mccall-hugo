export default class ImagePortrait {
    constructor(canvasEl) {
        this.canvasEl = document.getElementById(canvasEl)
        this.ctx = this.canvasEl.getContext('2d')
        this.image = new Image()
        this.image.src = this.fetchImage()
        this.width = this.image.width
        this.height = this.image.height
        this.grid = []
        

        this.events()
    }

    events(){
        this.ctx.drawImage(this.image, 0, 0, this.width, this.height)
    }

    // other methods

    fetchImage() {
        this.image.src = this.canvasEl.nextElementSibling.src
        this.canvasEl.nextElementSibling.remove()
    }

    createGrid(cellWidth, cellHeight) {
        const cellsHorizontally = Math.floor(this.width / cellWidth)
        const cellsVertically = Math.floor(this.height / cellHeight)

        for (let i = 0; i < cellsVertically; i++) {
            for (let j = 0; j < cellsHorizontally; j++) {
                const x = j * cellWidth
                const y = i * cellHeight
                const imageData = this.ctx.getImageData(x, y, cellWidth, cellHeight)
                this.grid.push(imageData)
            }
        }
    }

    render() {
        this.grid.forEach((cell, index) => {
            this.ctx.putImageData(cell, 0, 0)
            const dataURL = this.canvasEl.toDataURL()
            const img = new Image()
            img.src = dataURL
            img.classList.add('portrait')
            this.canvasEl.insertAdjacentElement('afterend', img)
        })
    }
}


class Cell {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.imageData = this.ctx.getImageData(this.x, this.y, this.width, this.height)
    }
}



