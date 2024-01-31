import ReadTime from "./readTime.js"
import FormValidation from './validateForm.js'
import LazyLoad from './lazyLoad.js'
import CopyCode from "./copyCode.js"
import TableOfContents from './tableOfContents.js'
import {PortraitAnimation, Effect, Cell, Particle} from "./animatePortrait.js"


const mainContent = document.getElementById('mainContent') || null


if (mainContent) {
	new TableOfContents(mainContent.querySelectorAll('h1,h2,h3,h4,h5,h6'))
}



new ReadTime('mainContent', 'readTime')

new FormValidation('mainContactForm')

new LazyLoad(document.querySelectorAll('.card-background'))
new LazyLoad(document.querySelectorAll('.logo'))
new LazyLoad(document.querySelectorAll('.lazy'))
//new LazyLoad(document.querySelectorAll('.portrait'))


new CopyCode('pre')




/*
**	Hacks 
**/

document.getElementById('currentYear').textContent = new Date(Date.now()).getFullYear()

window.addEventListener('load', function() {
	switch (location.pathname ) {
		case "/about/":
			const portrait = new PortraitAnimation('portrait', 'portraitImg')
			const effect = new Effect(portrait.canvas, portrait.image)

			const imageData = effect.imageGrid.map(cell => cell.getImageData())

			

			effect.init()


	
			effect.render()
	
			function animate() {
	
				if (effect.imageGrid[effect.imageGrid.length-1].speedX > 0 
				||  effect.imageGrid[effect.imageGrid.length -1].speedY > 0){
					effect.context.clearRect(0, 0, effect.canvas.width, effect.canvas.height)
				}
				effect.render()
				const particle1 = new Particle()

			particle1.draw(effect.context)
				requestAnimationFrame(animate)
				
			}
	
			animate()
	
			break
	} 
})


