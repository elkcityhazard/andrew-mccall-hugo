class CountUp {
    constructor(elID = "", currentIndex = 0, limit = 100, baseInterval = 30, coolDown = 90, animate=false) {
        this.elID = elID
        this.element = document.getElementById(this.elID) || "undefined"
        this.currentIndex = +currentIndex
        this.limit = this.element !== "undefined" ? +this.element.dataset['count'] || this.element.firstElementChild.children.length : 0
        this.baseInterval = +baseInterval
        this.coolDown = +coolDown
        this.percentOf = Math.floor(this.limit * this.coolDown / 100)
        this.animate = animate
        if (!this.element) return null
        this.initCountUp()
        
    }

    initCountUp() {
        if (!this.element || typeof(this.element) === "undefined") {
            return null
        }
        if (this.element === null) return null

            if (this.element) {
            document.addEventListener('DOMContentLoaded', this.incrementCount.bind(this))

         document.addEventListener('DOMContentLoaded', this.handleAnimate.bind(this))        
            }

        
    }

    incrementCount() {
        if (!this.element || typeof this.element === "undefined") return
        if (this.currentIndex > this.limit || this.animate) return null  // bail out if done

            if(typeof this.element !== "object") return false

        this.element.innerText = this.currentIndex
        this.incrementSpeed = this.currentIndex / this.limit * 100 < this.coolDown ? this.baseInterval : this.baseInterval * (this.currentIndex - this.percentOf)
        setTimeout(() => {
            return this.incrementCount(this.elID, this.currentIndex++, this.limit, this.baseInterval, this.coolDown)
        }, this.incrementSpeed)


    }

    handleAnimate() {
        if (!this.animate) return false
        if (this.currentIndex == this.limit) return null
            if(typeof this.element !== "object") return false
            let childEl = this.element.firstElementChild

            this.incrementSpeed = this.currentIndex / this.limit * 100 < this.coolDown ? this.baseInterval : this.baseInterval * (this.currentIndex - this.percentOf)

            childEl.style.transform = `translateY(-${100 * this.currentIndex}%)`
            childEl.style.transition = `transform ${this.incrementSpeed}ms ease`
          
            setTimeout(() => {
            return this.handleAnimate(this.elID, this.currentIndex++, this.limit, this.baseInterval, this.coolDown)
        }, this.incrementSpeed)


    }
}


export { CountUp }
