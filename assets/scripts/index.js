import ReadTime from "./readTime.js"
import FormValidation from './validateForm.js'
import LazyLoad from './lazyLoad.js'
import CopyCode from "./copyCode.js"
import TableOfContents from './tableOfContents.js'


const mainContent = document.getElementById('mainContent') || null


if (mainContent) {
	new TableOfContents(mainContent.querySelectorAll('h1,h2,h3,h4,h5,h6'))
}



new ReadTime('mainContent', 'readTime')

new FormValidation('mainContactForm')

new LazyLoad(document.querySelectorAll('.card-background'))
new LazyLoad(document.querySelectorAll('.logo'))
new LazyLoad(document.querySelectorAll('.portrait'))


new CopyCode('pre')




/*
**	Hacks 
**/

document.getElementById('currentYear').textContent = new Date(Date.now()).getFullYear()