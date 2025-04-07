---
title: 'Web Components a Beginner Friendly Guide'
date: 2025-04-06
author: Andrew M McCall
description: "Some of my notes about getting started with Web Components
including how to create a Web Component as well as style them  and general
built in methods"
summary: "The basic elements of using the Web Components API broken down
into some of the most common things we do with them."
publishDate: '2025-04-06T10:07:46-04:00'
updateDate:  '2025-04-06T10:07:46-04:00'
images: ['/images/twitter-card.png']
draft: false
categories:
  - Web Development
tags:
  - Web Components
  - Javascript
  - CSS
---

## Render A Web Component In HTML

A Web Component as far as html is concerned is just a custom html tag.  
It can have regular html attributes as well as custom attributes.  

They can be custom, or extend existing elements. 

Here is an example of a custom web component vs a custom web component that
is extending an `HTMLAnchorElement`

```
<am-my-web-component class="can-have-class" text="can have custom attribute" is-visible="true">This content is the default slot</am-my-web-component>

<a is="am-custom-link">My Custom Link</a>
```

The difference in defining the two using Javascript is this:

```
customElements.define("am-my-web-component", MyWebComponent)
vs
customElements.define('am=custom-link', CustomLink, {extend: 'a'})
```

Extending the`HTMLAnchorElement` requires us to defind which html element
we are extending when we define the component in javascript.  

## The Anatomy Of A Web Component

1. It should extend some type of built-in html i.e., `HTMLElement` or
   `HTMLAnchorElement`
2. Must call `super()` to init the parent constructor class
3. Must attach shadow `this.attachShadow({mode: "open"})`
4. Must define: `customElements.define('am-my-custom', CustomElement)` or
   `customElements.define('am-my-extended', MyExtended, extends: 'a')`

```

class ButtonToggle extends HTMLElement {
    constructor() {
        super() // must be called to call constructor on parent class being
        extended
        this._state = {}
        this.template = document.createElement('template')
        this.template.innerHTML = `<div><slot></slot>Maybe After Text</div>`
        this.attachShadow({mode: "open"}) // can be closed
        this.shadowRoot.appendChild(this.template.content.cloneNode(true))
        // clone template and append to shadow root
    }

    // how to remove slots if needed
          _removeSlots() {
            this.shadowRoot
              .querySelector("slot")
              .assignedNodes()
              .forEach((node) => {
                node.remove();
              });
          }
}
```

## connectedCallback use to make DOM manipulations and work with component

`connectedCallback()` is a builtin method that is the entrypoint of the web
component.  This is where your initalized state is going to happen and when
you can make updates to the shadow DOM and add any event listeners.


## How to use the attributeChangedCallback in Web Components

This is a two parter:
1. you need to set up the `attribubuteChangedCallback(name,oldVal, newVal)`
   method.
2. You need to use a built in static method observedAttribues.  This is
   setup like this:

   ```
   static get observedAttributes() {
       return ['text', 'class', 'nameOfAttribute']
   }
   ```

   Then in `attributeChangedCallback` you can use a switch statement to
   handle business logic:

   ```
   attributeChangedCallback() {
       if (oldVal === newVal) return false

      switch (name) {
          case "text":
          // do something
          break
      }
   }
   ```

## Performing Cleanup When Component Is Unmounted

```

  disconnectedCallback() {
    // cancel fetch request?
    // remove event listeners
    this._myComponent.removeEventListener("mouseenter", this._myEvent);
    this._myOtherComponent.removeEventListener("mouseleave", this._otherMyEvent);
  }
```

## Styling Custom Components

### `:host`

`:host` can be used to give your web component default styling

```
:host {
    color: blue;
}

:host(.warning) {
    background: red;
    color: white;
}
```

### `:host-context`

Only has support in chromium right now and most likely not going to be
added to safari or firefox any time soon.

Can style the web component differently depending on the parent.  

```
:host-context(p) {
    border: 1px dotted red;
}
```

### `::slotted`

`::slotted` can help provide styles to the `<slot></slot>`.


## attributeChangedCallback() vs MutationObserver

The attributeChangedCallback is a nice interface for listening for
attribute changes.  

One can also use `MutationObserver` to handle attribute changes:

```
// openObserver gets this and aliases it to modal and returns a new
MutationObserver
  openObserver() {
    let modal = this;
    return new MutationObserver(function (mut) {
      mut.forEach((m) => {
        if (m.type === "attributes") {
          modal.toggleActive();
        }
      });
    });
  }
```

The callback function is just looping for each mutation and checking if the
type is 'attributes'.  If it is, it is calling the necessary method.

In the `connectedCallback` it can be instantiated like so:

```
this.myMutationObserver = this.openObserver()
.observer(this, {
    attribute: true,
    })
```
In the `disconnectedCallback` you might need to remove this:


```
this.myMutationObserver.disconnect()
```

## Named Slots

It is possible to use multiple slots. 

```
<div>
<header><slot name="title">Default Title Here</slot></header>
<section><slot name="body">Default Body Here</slot></section>
</div>
```

and to use in html:

```
<am-my-wc>
<h1 slot="title">My Title</h1>
<p slot="body">My Content</p>
</am-my-wc>
```

## Get Slot Content
```
    const slots = this.shadowRoot.querySelectorAll("slot");
    slots[1].addEventListener("slotchange", (event) => {
      console.dir(slots[1]);
      // slots[1].assignedNodes()
    });

```

## Custom events

``` 
handleClick(event) {
    switch (event.target.id) {
      case "cancelBtn":
        this.hide();
        const cancelEvent = new Event("cancel", {
          bubbles: true, // bubbles up
          composed: true, // composed means it can leave the shadow dom
        });
        event.target.dispatchEvent(cancelEvent);
        break;
      case "okayBtn":
        this.hide();
        const okayEvent = new Event("confirm");
        event.target.dispatchEvent(okayEvent);
        break;
      default:
    }
  }
  events() {
    this.cancelBtn.addEventListener("click", this.handleClick.bind(this));
    this.confirmBtn.addEventListener("click", this.handleClick.bind(this));
  }

  connectedCallback() {
    this.events();
  }

```

This over-complicates it in object oriented programming because you can
usually just use `this.dispatchEvent(myCustomEvent)`

Note: you still most likely need to at `bubbles: true` and `composed: true`
so the event bubbles up and also can leave the shadow dom.  


## A Complete Example Of A Web Component

```
// modal.js
class AmModal extends HTMLElement {
  constructor() {
    super();
    this.template = document.createElement("template");
    this.pointerEventType = "none";
    this.opacity = 0;
    this.template.innerHTML = `
        <style>
        #backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.75);
        z-index: 10;
        pointer-events: ${this.pointerEventType};
        opacity: ${this.opacity};
        transition: all 350ms;
        -webkit-transition: all 350ms;
        -moz-transition: all 350ms;
        }
        #modal {
            background: #fff;
            border-radius: 3px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.25);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            z-index: 100;
            position: fixed;
            top: 35%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 50%;
            pointer-events: ${this.pointerEventType};
            -webkit-transition: all 350ms;
            -moz-transtion-all: all 350ms;
            transition: all 350ms;

        }

        :host([open]) {
        #backdrop,
        #modal {
        opacity: 1;
        pointer-events: all;
         }
        }

        :host([open]) #modal {
        top: 50%;
        }

        header {
        padding: 1rem;
        border-bottom: 1px solid #fff;
        }
        header h2 {
        font-size: 1.25rem;
        }

        ::slotted(h2) {
        margin-bottom: 0;
        overflow-wrap: break-word;
        }

        #main {
        padding: 1rem;
        }

        #actions {
         border-top: 1px solid #ccc;
         padding: 1rem;
         display: flex;
         justify-content: flex-end;
        }
        #actions button {
        margin: 0 0.25rem;
        }
        </style>
        <div id="backdrop">
        <div id="modal">
        <header>
        <slot name="title">Default Header</slot>
        </header>
        <section id="main">
        <slot></slot>
        </section>
        <section id="actions">
        <button id="cancelBtn">Cancel</button>
        <button id="okayBtn">Okay</button>
        </section>
        </div>
        </div>
        `;
    this.isOpen = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    this.cancelBtn = this.shadowRoot.getElementById("cancelBtn");
    this.confirmBtn = this.shadowRoot.getElementById("okayBtn");

    const slots = this.shadowRoot.querySelectorAll("slot");
    slots[1].addEventListener("slotchange", (event) => {
      //console.dir(slots[1].assignedNodes());
    });
  }

  toggleActive() {
    if (this.hasAttribute("open")) {
      this.isOpen = true;
      this.shadowRoot.getElementById("backdrop");
      this.render();
      return;
    }
    this.isOpen = false;
    this.shadowRoot.getElementById("backdrop");
    this.render();
  }

  open() {
    if (!this.hasAttribute("open")) this.setAttribute("open", "");
  }

  hide() {
    if (this.hasAttribute("open")) this.removeAttribute("open");
  }

  handleClick(event) {
    event.target.focus();
    switch (event.target.id) {
      case "cancelBtn":
        this.hide();
        const cancelEvent = new Event("cancel", {
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(cancelEvent);
        break;
      case "okayBtn":
        this.hide();
        const okayEvent = new Event("confirm", {
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(okayEvent);
        break;
      default:
    }
    event.target.blur();
  }

  handleKeyPress(e) {
    if (e.key === "Escape") {
      this.hide();
    }
    if (e.key === "Enter") {
      this.open();
    }
  }

  events() {
    this.cancelBtn.addEventListener("click", this.handleClick.bind(this));
    this.confirmBtn.addEventListener("click", this.handleClick.bind(this));
    this.shadowRoot
      .getElementById("backdrop")
      .addEventListener("click", this.hide.bind(this));

    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

  connectedCallback() {
    this.events();
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this.handleKeyPress);
    this.cancelBtn.removeEventListener("click", this.handlClick);
    this.confirmBtn.removeEventListener("click", this.handleClick);
  }
}

customElements.define("am-modal", AmModal);

// modal.html


<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="modal.js" defer></script>
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        margin: 2rem;
        font-family: sans-serif;
      }
    </style>
  </head>
  <body>
    <am-modal>
      <h2 slot="title">My Custom Slot</h2>
      <p>Show Me The Money!</p>
    </am-modal>
    <button>Show Details & Confirm</button>
  </body>
  <script>
    const [confirmButton] = document.getElementsByTagName("button");
    const [modal] = document.getElementsByTagName("am-modal");

    modal.addEventListener("confirm", () => {
      console.log("confirmed");
    });

    modal.addEventListener("cancel", () => {
      console.log("cancelled...");
    });

    confirmButton.addEventListener("click", function (e) {
      modal.open();
    });
  </script>
</html>
```
