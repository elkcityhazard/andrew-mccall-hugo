(() => {
  // ns-hugo:/home/andrew/Documents/hugo-projects/andrew-mccall-hugo/assets/scripts/readTime.js
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

  // ns-hugo:/home/andrew/Documents/hugo-projects/andrew-mccall-hugo/assets/scripts/validateForm.js
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
            if (Object.prototype.hasOwnProperty.call(v, "email")) {
              const msg = document.createElement("p");
              msg.innerText = v?.email;
              document.querySelector('input[name="email"] + .error').appendChild(msg);
              document.querySelector('input[name="email"] + .error').classList.add("show-error");
            }
            if (Object.prototype.hasOwnProperty.call(v, "message")) {
              const msg = document.createElement("p");
              msg.innerText = v?.message;
              document.querySelector('textarea[name="message"] + .error').appendChild(msg);
              document.querySelector('textarea[name="message"] + .error').classList.add("show-error");
            }
          }
          throw new Error("invalid data");
        }
        return document.createElement("form").submit.call(document.getElementById(this.form));
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

  // ns-hugo:/home/andrew/Documents/hugo-projects/andrew-mccall-hugo/assets/scripts/lazyLoad.js
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

  // ns-hugo:/home/andrew/Documents/hugo-projects/andrew-mccall-hugo/assets/scripts/copyCode.js
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
        e.target.closest("pre").querySelector("div.success").onanimationend = function(e2) {
          e2.target.remove();
        };
      } catch (err) {
        console.error(err.message);
        throw new Error(err);
      }
    }
  };

  // ns-hugo:/home/andrew/Documents/hugo-projects/andrew-mccall-hugo/assets/scripts/tableOfContents.js
  var TableOfContents = class {
    constructor(headings) {
      this.headings = headings;
      this.tocObserver = null;
      this.toc = Array.from(document.querySelectorAll("#TableOfContents a"));
      this.options = {
        rootMargin: "10px",
        threshhold: 1
      };
      this.events();
    }
    events() {
      if (!this.toc)
        return;
      this.observe();
      this.headings.forEach((heading) => {
        this.tocObserver.observe(heading);
      });
    }
    observe() {
      this.tocObserver = new IntersectionObserver(
        this.handleIntersect.bind(this),
        this.options
      );
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

  // ns-hugo:/home/andrew/Documents/hugo-projects/andrew-mccall-hugo/assets/scripts/animatePortrait.js
  var PortraitAnimation = class {
    constructor(canvas, image) {
      this.canvas = document.getElementById(canvas);
      this.ctx = this.canvas.getContext("2d");
      this.image = document.getElementById(image);
      this.canvas.width = this.image.width;
      this.canvas.height = this.image.height;
      this.events();
    }
    events() {
      if (!this.canvas || !this.ctx || !this.image) {
        return null;
      }
      console.info("portrait animation 0.0.1...");
    }
  };
  var Cell = class {
    // we need to have a reference to the effect class
    constructor(effect, x, y, index) {
      this.effect = effect;
      this.index = index;
      this.x = x;
      this.y = y;
      this.positionX = Math.abs(Math.random() * this.effect.width + 1);
      this.positionY = Math.abs(Math.random() * this.effect.height + 1);
      this.speedX;
      this.speedY;
      this.width = this.effect.cellWidth;
      this.height = this.effect.cellHeight;
      this.image = effect.image;
      this.slideX = 0;
      this.slideY = 0;
      this.vx = 0;
      this.vy = 0;
      this.ease = 0.01;
      this.friction = 0.8;
      this.randomize = Math.random() * 50 + 1;
      setTimeout(function() {
        this.start();
      }.bind(this), this.index * 2);
    }
    getImageData() {
      return this.effect.context.getImageData(this.x, this.y, this.width, this.height);
    }
    draw(context) {
      context.drawImage(this.image, this.x + this.slideX, this.y + this.slideY, this.width, this.height, this.positionX, this.positionY, this.width, this.height);
      context.strokeStyle = this.speedY > 0 || this.speedX > 0 ? `rgba(0,0,0,${this.speedX})` : `rgba(0,0,0,0)`;
      context.strokeRect(this.positionX, this.positionY, this.width, this.height);
    }
    start() {
      this.speedX = (this.x - this.positionX) / this.randomize;
      this.speedY = (this.y - this.positionY) / this.randomize;
    }
    update() {
      if (Math.abs(this.speedX) > 0 || Math.abs(this.speedY) > 0) {
        this.speedX = (this.x - this.positionX) / this.randomize;
        this.speedY = (this.y - this.positionY) / this.randomize;
        this.positionX += this.speedX;
        this.positionY += this.speedY;
      }
      const dx = this.effect.mouse.x - this.x;
      const dy = this.effect.mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.effect.mouse.radius) {
        const angle = Math.atan2(dy, dx);
        const force = distance / this.effect.mouse.radius;
        this.vx = force * Math.cos(angle);
        this.vy = force * Math.sin(angle);
      } else {
        this.vx = 0;
        this.vy = 0;
      }
      this.slideX += (this.vx *= this.friction) - this.slideX * this.ease;
      this.slideY += (this.vy *= this.friction) - this.slideY * this.ease;
    }
  };
  var Effect = class {
    constructor(canvas, image) {
      this.canvas = canvas;
      this.context = this.canvas.getContext("2d");
      this.particlesArray = [];
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.cellWidth = this.width / 15;
      this.cellHeight = this.height / 25;
      this.image = image;
      this.imageGrid = [];
      this.createGrid();
      this.mouse = {
        x: void 0,
        y: void 0,
        radius: 100
      };
      this.active = false;
      this.canvas.addEventListener("mousemove", function(e) {
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
      }.bind(this));
      this.canvas.addEventListener("mouseleave", function(e) {
        this.mouse.x = void 0;
        this.mouse.y = void 0;
      }.bind(this));
    }
    init() {
      for (let y = 0; y < this.height; y += this.cellHeight) {
        for (let x = 0; x < this.width; x += this.cellWidth) {
          this.particlesArray.push(new Particle(x, y));
        }
      }
    }
    createGrid() {
      let index = 0;
      for (let y = 0; y < this.height; y += this.cellHeight) {
        for (let x = 0; x < this.width; x += this.cellWidth) {
          index++;
          this.imageGrid.unshift(new Cell(this, x, y, index));
        }
      }
    }
    render() {
      this.imageGrid.forEach((cell, index) => {
        this.particlesArray.forEach((particle, index2) => {
          particle.draw(this.context);
        });
        cell.update();
        cell.draw(this.context);
      });
    }
  };
  var Particle = class {
    constructor(x, y) {
      this.x = void 0;
      this.y = void 0;
      this.size = 10;
    }
    draw(context) {
      context.fillRect(this.x, this.y, this.size, this.size);
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
  new lazyLoad_default(document.querySelectorAll(".lazy"));
  new copyCode("pre");
  document.getElementById("currentYear").textContent = new Date(Date.now()).getFullYear();
  window.addEventListener("load", function() {
    switch (location.pathname) {
      case "/about/":
        let animate = function() {
          if (effect.imageGrid[effect.imageGrid.length - 1].speedX > 0 || effect.imageGrid[effect.imageGrid.length - 1].speedY > 0) {
            effect.context.clearRect(0, 0, effect.canvas.width, effect.canvas.height);
          }
          effect.render();
          const particle1 = new Particle();
          particle1.draw(effect.context);
          requestAnimationFrame(animate);
        };
        const portrait = new PortraitAnimation("portrait", "portraitImg");
        const effect = new Effect(portrait.canvas, portrait.image);
        const imageData = effect.imageGrid.map((cell) => cell.getImageData());
        effect.init();
        effect.render();
        animate();
        break;
    }
  });
})();
