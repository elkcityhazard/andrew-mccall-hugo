export default class copyCode {
	constructor(element) {
		this.element = element


		this.events()
	}

	events() {

		const codeEl = document.querySelectorAll(this.element)

		if (!codeEl) return null

			codeEl.forEach((el) => {
				el.addEventListener('pointerup', this.handlePointerUp.bind(this))
			})

	}


	async handlePointerUp(e) {



		try {

			let closest = e.target.closest('code')

		if (!closest) {
			closest = e.target.querySelector('code')

		}

		const boxParams = closest.getBoundingClientRect()

		const middle = (boxParams.right - boxParams.left) / 2

		const hasMessage = e.target.closest('pre').querySelector('div')

		if (hasMessage) hasMessage.remove()

		const clipboardResult = await navigator.clipboard.writeText(closest.innerText)


		const success = document.createElement('div')



		success.innerText = "Copied!"

		let yPos = e.clientY - boxParams.top

		let xPos = e.clientX - boxParams.left

		if (xPos < middle) {
			//xPos = middle
		}





		success.style.top = (e.clientY - boxParams.top) + 'px';
		success.style.left = xPos + 'px'
		success.style.transform = `translate(-33%, -33%)`
		success.style.opacity = 0;
		success.classList.add('toast')

		e.target.closest('pre').append(success)

		e.target.closest('pre').querySelector('div.success').onanimationend = function(e) {
				
				e.target.remove()
			}


		} catch (err) {
			console.error(err.message)
			throw new Error(err)
		}		
	}


}