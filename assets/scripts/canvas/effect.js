import Cell from "./cell"

export default class Effect {
	constructor(canvas, imageEl) {
		this.canvas = canvas
		this.imageEl = imageEl
		this.width = this.canvas.width
		this.height = this.canvas.height
		this.cellWidth = this.width / 10
		this.cellHeight = this.height / 15
		this.cell = new Cell(this, 0, 0)
		this.imageGrid = []
		this.createGrid()
		this.image = document.getElementById(imageEl)


	}

	createGrid() {
		for (let y = 0; y < this.height; y += this.cellHeight) {
			for (let x = 0; x < this.width; x += this.cellWidth) {
				this.imageGrid.push(new Cell(this, x, y))
			}
		}

	}

	render(context) {

		
		this.imageGrid.forEach((cell, index) => {
			cell.update()
			cell.draw(context)

		})
	}
}

