export default class TableOfContents {
	constructor(headings) {
		this.headings = headings
		this.tocObserver = null
		this.toc = Array.from(document.querySelectorAll('#TableOfContents a'))
		this.options = {
			rootMargin: '0px',
			threshhold: 1.0,
		}

		this.events()
	}

	events() {

		this.observe()

		this.headings.forEach(heading => {
			this.tocObserver.observe(heading)
		})

	

	}


	observe() {

		this.tocObserver = new IntersectionObserver(this.handleIntersect.bind(this), this.options)

	}

	handleIntersect(entries) {

		entries.forEach((entry, index) => {

		if (typeof this.toc[index] === "undefined") return null

			if (entry.isIntersecting) {
				
				this.toc.forEach(item => item.classList.remove('active'))

				this.toc.forEach((navItem) => {
					
					if (navItem.href.split('#')[1] == entry.target.id) {
						navItem.classList.add('active')
					}
				})
			} 
		})

	}
}