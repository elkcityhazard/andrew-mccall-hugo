export default class ReadTime {
	constructor(input, output) {
		this.input = input
		this.output = output

		this.events()
	}

	events() {

		if (!this.input || !this.output) {
			
			return null
		}
		
		//document.getElementById(this.output).addEventListener('click', this.calculateReadTime.bind(this) )

		this.calculateReadTime()

	}


	calculateReadTime() {


		let content = document.getElementById(this.input)?.innerText || ""


		if (!content) return null

		let display = document.getElementById(this.output)

		let splitContent = content.split(' ').length

		display.innerText = `${Math.ceil(splitContent / 200)} mins`

	}
	

}




