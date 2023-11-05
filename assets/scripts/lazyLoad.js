class LazyLoad {
    constructor(images) {
        this.images = images
        this.currentObserver = null
        this.events()
    }
    events() {

        if (!this.images) {
            return null
        }

        this.currentObserver = this.observer()
        this.images.forEach((image) => {
            this.currentObserver.observe(image)
        })
    }

    options() {
        return {
            threshhold: 1.0
        }
    }


    observer() {
        return new IntersectionObserver(this.callback.bind(this), this.options)
    }

    callback(entries) {
        if (entries.length == 0) {
            return null
        }
        entries.forEach(entry => {

            if (entry.intersectionRatio > 0) {
                entry.target.src = entry.target.getAttribute('data-src')
                this.currentObserver.unobserve(entry.target)

                	if (entry.target.complete) {
                		entry.target.classList.add('loaded')
                	} else {
                		entry.target.onload = function(e) {
                    e.target.classList.add('loaded')
                }

                	}
            }
        })
    }
}

export default LazyLoad