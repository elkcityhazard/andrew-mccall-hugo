/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/countUp.js"
/*!***************************!*\
  !*** ./src/js/countUp.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CountUp: () => (/* binding */ CountUp)
/* harmony export */ });
class CountUp {
  constructor(
    elID = "",
    currentIndex = 0,
    limit = 100,
    baseInterval = 30,
    coolDown = 90,
    animate = false,
  ) {
    this.elID = elID;
    this.element = document.getElementById(this.elID) || "undefined";
    this.currentIndex = +currentIndex;
    this.limit =
      this.element !== "undefined"
        ? +this.element.dataset["count"] ||
        this.element.firstElementChild.children.length
        : 0;
    this.baseInterval = +baseInterval;
    this.coolDown = +coolDown;
    this.percentOf = Math.floor((this.limit * this.coolDown) / 100);
    this.animate = animate;
    if (!this.element) return null;
    this.initCountUp();
  }

  initCountUp() {
    if (!this.element || typeof this.element === "undefined") {
      return null;
    }
    if (this.element) {
      document.addEventListener(
        "DOMContentLoaded",
        this.incrementCount.bind(this),
      );
      document.addEventListener(
        "DOMContentLoaded",
        this.handleAnimate.bind(this),
      );
    }
  }

  incrementCount() {
    if (!this.element || typeof this.element === "undefined") return;
    if (this.currentIndex > this.limit || this.animate) return null; // bail out if done

    if (typeof this.element !== "object") return false;

    this.element.innerText = this.currentIndex;
    this.incrementSpeed =
      (this.currentIndex / this.limit) * 100 < this.coolDown
        ? this.baseInterval
        : this.baseInterval * (this.currentIndex - this.percentOf);
    setTimeout(() => {
      return this.incrementCount(
        this.elID,
        this.currentIndex++,
        this.limit,
        this.baseInterval,
        this.coolDown,
      );
    }, this.incrementSpeed);
  }

  handleAnimate() {
    if (!this.animate) return false;
    if (this.currentIndex == this.limit) return null;
    if (typeof this.element !== "object") return false;
    let childEl = this.element.firstElementChild;

    this.incrementSpeed =
      (this.currentIndex / this.limit) * 100 < this.coolDown
        ? this.baseInterval
        : this.baseInterval * (this.currentIndex - this.percentOf);

    childEl.style.transform = `translateY(-${100 * this.currentIndex}%)`;
    childEl.style.transition = `transform ${this.incrementSpeed}ms ease`;

    setTimeout(() => {
      return this.handleAnimate(
        this.elID,
        this.currentIndex++,
        this.limit,
        this.baseInterval,
        this.coolDown,
      );
    }, this.incrementSpeed);
  }
}




/***/ },

/***/ "./src/js/themeToggle.js"
/*!*******************************!*\
  !*** ./src/js/themeToggle.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeToggle: () => (/* binding */ ThemeToggle)
/* harmony export */ });
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
        // removed by dead control flow



        // removed by dead control flow

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





/***/ },

/***/ "./src/js/typewriter.js"
/*!******************************!*\
  !*** ./src/js/typewriter.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TypeWriter: () => (/* binding */ TypeWriter)
/* harmony export */ });
class TypeWriter {
  constructor(titleEl) {
    this.titleEl = document.getElementById(titleEl);
    this.currentText = this.titleEl.textContent;
    this.waitFactor = 4;
    this.ticker = 125;
    this.cursorFactor = 8;
    this.complete = false;
    this.messages = [
      "Andrew M McCall",
      "Golang Development",
      "Javascript Development",
    ];
    this.currentIndex = 0;
    this.currentMsg = 0;

    this.events();
  }

  events() {
    if (!this.titleEl || typeof this.titleEl === "undefined") return null;

    document.addEventListener(
      "DOMContentLoaded",
      function () {
        this.typewriter();
        this.titleEl.addEventListener("load", this.setHeightOfTextContainer());
        this.titleEl.addEventListener(
          "change",
          this.setHeightOfTextContainer(),
        );
      }.bind(this),
    );
  }

  setHeightOfTextContainer() {
    this.titleEl.style.height =
      this.titleEl.scrollHeight > 0 ? this.titleEl.scrollHeight + "px" : "3rem";
  }

  updateTextContent() {
    this.setHeightOfTextContainer();
    this.titleEl.textContent =
      this.messages[this.currentMsg].substring(0, this.currentIndex) +
      (this.currentIndex % this.cursorFactor == 0 ? "|" : "");
  }

  typewriter() {
    const typewriter = setInterval(() => {
      let length = this.messages[this.currentMsg].length;

      if (!this.complete) {
        if (this.currentIndex > length + this.waitFactor) {
          this.complete = true;
        }

        this.updateTextContent();
        this.currentIndex++;
      } else {
        this.updateTextContent();
        this.currentIndex--;
        if (this.currentIndex < -this.waitFactor) {
          this.complete = false;

          if (this.currentMsg < this.messages.length - 1) {
            this.currentMsg++;
          } else {
            this.currentMsg = 0;
          }
        }

        if (this.currentIndex <= 0) {
          this.titleEl.textContent = "|";
        }
      }
    }, this.ticker);
  }
}




/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _themeToggle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./themeToggle.js */ "./src/js/themeToggle.js");
/* harmony import */ var _typewriter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./typewriter.js */ "./src/js/typewriter.js");
/* harmony import */ var _countUp_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./countUp.js */ "./src/js/countUp.js");



const toggle = new _themeToggle_js__WEBPACK_IMPORTED_MODULE_0__.ThemeToggle("themeToggle");
const typewriter = new _typewriter_js__WEBPACK_IMPORTED_MODULE_1__.TypeWriter("siteHeader");
const countUp = new _countUp_js__WEBPACK_IMPORTED_MODULE_2__.CountUp("postCount", 0, null, 30, 80, false);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map