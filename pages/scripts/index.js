(() => {
  // ns-hugo:/home/andrew/Documents/hugo-projects/andrew-mccall.com/assets/scripts/readTime.js
  var ReadTime = class {
    constructor(input, output) {
      this.input = input;
      this.output = output;
      this.events();
    }
    events() {
      if (!this.input || !this.output) {
        return null;
      }
      this.calculateReadTime();
    }
    calculateReadTime() {
      let content = document.getElementById(this.input)?.innerText || "";
      if (!content)
        return null;
      let display = document.getElementById(this.output);
      let splitContent = content.split(" ").length;
      display.innerText = `${Math.ceil(splitContent / 200)} mins`;
    }
  };

  // ns-hugo:/home/andrew/Documents/hugo-projects/andrew-mccall.com/assets/scripts/validateForm.js
  var FormValidation = class {
    constructor(form, errors = []) {
      this.form = form;
      this.errors = errors;
      if (!this.form) {
        return null;
      }
      this.events();
    }
    events() {
      if (!this.form || typeof this.form == "undefined" || this.form === null) {
        return null;
      }
      if (this.form) {
        const contactForm = document.getElementById(this.form);
        if (!contactForm) {
          return null;
        }
        contactForm.addEventListener("submit", this.handleFormSubmit.bind(this));
      }
    }
    async handleFormSubmit(e) {
      this.resetErrors();
      try {
        e.preventDefault();
        const formData = new FormData(document.getElementById(this.form));
        let email = formData.get("email");
        let message = formData.get("message");
        let password = formData.get("password");
        if (password !== "")
          throw new Error("invalid form data");
        email = this.validateEmail(email);
        message = this.validateMessage(message);
        if (this.errors.length > 0) {
          for (const v of this.errors) {
            if (v.hasOwnProperty("email")) {
              const msg = document.createElement("p");
              msg.innerText = v?.email;
              document.querySelector('input[name="email"] + .error').appendChild(msg);
              document.querySelector('input[name="email"] + .error').classList.add("show-error");
            }
            if (v.hasOwnProperty("message")) {
              const msg = document.createElement("p");
              msg.innerText = v?.message;
              document.querySelector('textarea[name="message"] + .error').appendChild(msg);
              document.querySelector('textarea[name="message"] + .error').classList.add("show-error");
            }
          }
          throw new Error("invalid data");
        }
        const response = await fetch("https://api.formcake.com/api/form/91ab5345-3e83-4b1d-aed8-5b15ecb8d581/submission", {
          method: "POST",
          body: formData
        });
        const data = await response.json();
        if (response.status == 200) {
          location.assign("/success");
        }
      } catch (err) {
        console.error(err.message);
        return err;
      }
    }
    validateEmail(input) {
      if (input.trim().length == 0) {
        this.errors.push({
          email: "email cannot be empty"
        });
      }
      const validEmailPattern = input.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (!validEmailPattern) {
        this.errors.push({
          email: "invalid email"
        });
      }
      return input.trim().toLowerCase();
    }
    validateMessage(input) {
      if (input.trim().length == 0) {
        this.errors.push({
          message: "invalid message length"
        });
      }
      return input.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;").replaceAll("$", "&nbsp;").replaceAll("(", "&nbsp;").replaceAll(")", "&nbsp;").replaceAll("<?", "&nbsp").replaceAll("/", "&#x2F;").toLowerCase();
    }
    resetErrors() {
      this.errors = new Array();
      const formErrors = document.querySelectorAll("form .error");
      for (const error of formErrors) {
        error.classList.remove("show-error");
        while (error.firstChild) {
          error.lastChild.remove();
        }
        error.innerText = "";
      }
    }
  };

  // ns-hugo:/home/andrew/Documents/hugo-projects/andrew-mccall.com/assets/scripts/lazyLoad.js
  var LazyLoad = class {
    constructor(images) {
      this.images = images;
      this.currentObserver = null;
      this.events();
    }
    events() {
      if (!this.images) {
        return null;
      }
      this.currentObserver = this.observer();
      this.images.forEach((image) => {
        this.currentObserver.observe(image);
      });
    }
    options() {
      return {
        threshhold: 1
      };
    }
    observer() {
      return new IntersectionObserver(this.callback.bind(this), this.options);
    }
    callback(entries) {
      if (entries.length == 0) {
        return null;
      }
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          entry.target.src = entry.target.getAttribute("data-src");
          this.currentObserver.unobserve(entry.target);
          if (entry.target.complete) {
            entry.target.classList.add("loaded");
          } else {
            entry.target.onload = function(e) {
              e.target.classList.add("loaded");
            };
          }
        }
      });
    }
  };
  var lazyLoad_default = LazyLoad;

  // ns-hugo:/home/andrew/Documents/hugo-projects/andrew-mccall.com/assets/scripts/copyCode.js
  var copyCode = class {
    constructor(element) {
      this.element = element;
      this.events();
    }
    events() {
      const codeEl = document.querySelectorAll(this.element);
      if (!codeEl)
        return null;
      codeEl.forEach((el) => {
        el.addEventListener("pointerup", this.handlePointerUp.bind(this));
      });
    }
    async handlePointerUp(e) {
      try {
        let closest = e.target.closest("code");
        if (!closest) {
          closest = e.target.querySelector("code");
        }
        const boxParams = closest.getBoundingClientRect();
        const middle = (boxParams.right - boxParams.left) / 2;
        const hasMessage = e.target.closest("pre").querySelector("div");
        if (hasMessage)
          hasMessage.remove();
        const clipboardResult = await navigator.clipboard.writeText(closest.innerText);
        const success = document.createElement("div");
        success.innerText = "Copied!";
        let yPos = e.clientY - boxParams.top;
        let xPos = e.clientX - boxParams.left;
        if (xPos < middle) {
        }
        success.style.top = e.clientY - boxParams.top + "px";
        success.style.left = xPos + "px";
        success.style.transform = `translate(-33%, -33%)`;
        success.style.opacity = 0;
        success.classList.add("toast");
        e.target.closest("pre").append(success);
        e.target.closest("pre").querySelector("div").onanimationend = function(e2) {
          e2.target.remove();
        };
      } catch (err) {
        console.error(err.message);
        throw new Error(err);
      }
    }
  };

  // ns-hugo:/home/andrew/Documents/hugo-projects/andrew-mccall.com/assets/scripts/tableOfContents.js
  var TableOfContents = class {
    constructor(headings) {
      this.headings = headings;
      this.tocObserver = null;
      this.toc = Array.from(document.querySelectorAll("#TableOfContents a"));
      this.options = {
        rootMargin: "0px",
        threshhold: 1
      };
      this.events();
    }
    events() {
      this.observe();
      this.headings.forEach((heading) => {
        this.tocObserver.observe(heading);
      });
    }
    observe() {
      this.tocObserver = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
    }
    handleIntersect(entries) {
      entries.forEach((entry, index) => {
        if (typeof this.toc[index] === "undefined")
          return null;
        if (entry.isIntersecting) {
          this.toc.forEach((item) => item.classList.remove("active"));
          this.toc.forEach((navItem) => {
            if (navItem.href.split("#")[1] == entry.target.id) {
              navItem.classList.add("active");
            }
          });
        }
      });
    }
  };

  // <stdin>
  var mainContent = document.getElementById("mainContent") || null;
  if (mainContent) {
    new TableOfContents(mainContent.querySelectorAll("h1,h2,h3,h4,h5,h6"));
  }
  new ReadTime("mainContent", "readTime");
  new FormValidation("mainContactForm");
  new lazyLoad_default(document.querySelectorAll(".card-background"));
  new lazyLoad_default(document.querySelectorAll(".logo"));
  new lazyLoad_default(document.querySelectorAll(".portrait"));
  new copyCode("pre");
})();
