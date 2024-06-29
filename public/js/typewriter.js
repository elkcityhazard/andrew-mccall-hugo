class TypeWriter {
    constructor(titleEl) {
        this.titleEl = document.getElementById(titleEl)
        this.currentText = this.titleEl.textContent
        this.waitFactor = 4
        this.ticker = 125
        this.cursorFactor = 8
        this.complete = false
        this.messages = ["Andrew M McCall", "Golang Development", "Javascript Development"]
        this.currentIndex = 0
        this.currentMsg = 0


        this.events()
    }

    events() {
        if (!this.titleEl || typeof this.titleEl === "undefined") return null
       
        document.addEventListener('DOMContentLoaded', function(){
            this.typewriter()
            this.titleEl.addEventListener("load", this.setHeightOfTextContainer())
            this.titleEl.addEventListener('change', this.setHeightOfTextContainer())
            
        }.bind(this))
    }

    setHeightOfTextContainer() {
        this.titleEl.style.height = this.titleEl.scrollHeight + 'px'
    }

    updateTextContent() {
        this.titleEl.textContent = this.messages[this.currentMsg].substring(0, this.currentIndex) + (this.currentIndex % this.cursorFactor == 0 ? "|" : "")
    }


    typewriter() {

        const typewriter = setInterval(() => {
    
      let length = this.messages[this.currentMsg].length
  
      if (!this.complete) {
        if (this.currentIndex > length + this.waitFactor) {
          this.complete = true
        }
  
     
        this.updateTextContent()
        this.currentIndex++
  
      } else {
        this.updateTextContent()
        this.currentIndex--
        if (this.currentIndex < -this.waitFactor) {
          this.complete = false
  
          if (this.currentMsg < this.messages.length - 1) {
            this.currentMsg++
          } else {
            this.currentMsg = 0
          }
        }

        if (this.currentIndex <= 0) {
            this.titleEl.textContent = "|"
        }
      }
    }, this.ticker )

    }
}

export {TypeWriter}
  