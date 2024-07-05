class CountUp {
    constructor(elID = "", currentIndex = 0, limit = 100, baseInterval = 30, coolDown = 90) {
        this.elID = elID
        this.element = document.getElementById(elID)
        this.currentIndex = +currentIndex
        this.limit = +this.element.dataset['count']
        this.baseInterval = +baseInterval
        this.coolDown = +coolDown
        this.percentOf = Math.floor(this.limit * this.coolDown / 100)
        this.initCountUp()
    }

    initCountUp() {
        document.addEventListener('DOMContentLoaded', this.incrementCount.bind(this))
    }

    incrementCount() {
        if (this.currentIndex > this.limit) return null  // bail out if done
        this.element.innerText = this.currentIndex
        this.incrementSpeed = this.currentIndex / this.limit * 100 < this.coolDown ? this.baseInterval : this.baseInterval * (this.currentIndex - this.percentOf)
        setTimeout(() => {
            return this.incrementCount(this.elID, this.currentIndex++, this.limit, this.baseInterval, this.coolDown)
        }, this.incrementSpeed)
    }
}


export { CountUp }
