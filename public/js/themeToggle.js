class ThemeToggle {
    constructor(checkboxId) {
        this.checkboxId = document.getElementById(checkboxId)
        this.events()
    }


    events() {
        document.addEventListener('DOMContentLoaded', this.recallState.bind(this))
        this.checkboxId.addEventListener('change', this.toggleTheme.bind(this))
        this.checkboxId.addEventListener('change', this.toggleAriaChecked.bind(this))
        this.checkboxId.addEventListener('change', this.toggleSunMoon.bind(this))
        this.checkboxId.addEventListener('change', this.saveState.bind(this))
        this.checkboxId.addEventListener('change', this.toggleLineColors.bind(this))

    }

    toggleAriaChecked() {
        this.checkboxId.checked ? 
        this.checkboxId.setAttribute('aria-checked', 'true') :
        this.checkboxId.setAttribute('aria-checked', 'false')
    }


    toggleTheme() {
        this.checkboxId.checked ? 
        document.body.setAttribute('data-theme', 'dark') :
        document.body.setAttribute('data-theme', 'light')

    }

    toggleSunMoon() {

        const [light, dark] = this.checkboxId.closest('div').querySelectorAll('svg')

        light.style.display = "none"
        dark.style.display = "none"

        if (this.checkboxId.checked) {
            light.style.display = "inline-block"
        }

        if (!this.checkboxId.checked) {
            dark.style.display = "inline-block"
        }
       


    }


    toggleLineColors() {

        return 
        let lines = document.querySelectorAll('line')


        this.checkboxId.checked ?
        lines.forEach(line => line.setAttribute('stroke', "white"))
        :
        lines.forEach(line => line.setAttribute('stroke', "black"))
    }

    saveState() {
        if (this.checkboxId.checked) {
            localStorage.setItem("theme", "dark")
        } else {
            localStorage.setItem("theme", "light")
        }
    }

    recallState() {
        const state = localStorage.getItem("theme")

        if (state === "dark") {
            this.checkboxId.checked = true
            this.toggleTheme()
            this.toggleAriaChecked()
            this.toggleSunMoon()
            this.toggleLineColors()
            this.saveState()

        } else  {
            this.checkboxId.checked = false
            this.toggleTheme()
            this.toggleAriaChecked()
            this.toggleSunMoon()
            this.toggleLineColors()
            this.saveState()
        }
    }
}



export {
    ThemeToggle
}