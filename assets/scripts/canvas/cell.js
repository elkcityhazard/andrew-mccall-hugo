export default class Cell {
	constructor(effect, x, y) {
		this.effect = effect
		this.x = x
		this.y = y
		this.width = this.effect.cellWidth
		this.height = this.effect.cellHeight
		this.slideX = 0
		this.slideY = 0
	}

	draw(context) {
		//context.drawImage(this.image, 0, 0, this.width, this.height)
		//context.drawImage(this.effect.image, 0, 0, this.x, this.y, 0, 0, this.width, this.height)
		context.drawImage(this.effect.image, this.x + this.slideX, this.y + this.slideY, this.width, this.height, this.x, this.y, this.width, this.height)
		//context.strokeRect(this.x, this.y, this.width, this.height)


	}

	update() {
		this.slideX =  Math.random()
		this.slideY =  Math.random()

	}
}