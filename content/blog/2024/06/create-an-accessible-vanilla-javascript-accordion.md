---
title: 'Create an Accessible Vanilla Javascript Accordion'
date: 2024-06-22T08:57:31-04:00
author: Andrew M McCall
description: Javascript accordions are interesting little client widgets that can  help control and organize information and display it in a concise, digestable way. 
summary:  The accordion is a user interface component that helps structure and display website information through an expansion/contraction mechanism.  This article explores building a vanilla javascript accordion with accessibility in mind. 
publishDate: 2024-06-22T08:57:31-04:00
updateDate:  2024-06-22T08:57:31-04:00
draft: false
categories:
  - Web Development
tags:
  - Javascript
  - UI
  - a11ty
  - accessibility
---
<iframe id="odysee-iframe" style="width:100%; aspect-ratio:16 / 9;" src="https://odysee.com/$/embed/@megalawnalien:3/create-a-vanilla-javascript-accordion-that-is-accessible:f?r=HADqujT6idtBaZKLwMq9UWNb6LbwVV2z" allowfullscreen></iframe>
<small><strong>Note:</strong> there is no audio, just a guide to follow along</small>

Lately, I have come across older websites that all use some sort of drop in plugin to achieve the "accordion".  IF you are not familiar with what an accordion is in web development, it can be summarized as a common user interface element where content panels can be expanded or collapsed based on the user toggling an interactive element such as a button. They often get used to:

- Show and hide additional information in a way that reduces page clutter and gives greater degrees of focus to the currently expanded item.  
- They can be used to organize data in a hierarchical way, grouping information together under expandable headings.
- Allow users to view additional information without navigating away from the page.


Some of the key characteristics of the web page accordion are:

- One panel is open at a time, while the others are closed.  Some accordions allow expansion of all elements.
- Click or tap events handle expanding and contracting the accordion panels.
- The panel headings often act as the interactive trigger for the content.
- Are built with HTML, Javascript, CSS
- Can often be used for frequently asked questions, product specifications, settings menus, multistep forms, and more.  


In summary, an accordion is a user interface widget that expands and collapses sections of content to provide additional information in an organized and space-saving way,  They can also help with hierarchical organization and give websites dynamic functionality with interactivity.  


## The Problem With Drop In Javascript Accordions

As I mentioned above, I have seen a few of these accordions in the wild that are essentially drop in plugins that take care of the boiler plate.  There is really nothing wrong with these, but I want to highlight a few reasons to build your own vanilla Javascript accordion:

- Plugins and packages are often heavy in terms of their file sizes.  Plugin and package developers are often trying to handle every edge case, and make their product as feature rich as possible which ads extra bloat to your website.
- The more reputable javascript carousel packages do consider accessibility, but many smaller packages simply do not.  In 2024m accessibility is simply a standard, and not a nice to have, and by using packages that don't respect, or attempt accessibility will make your site more vulnerable to user experience issues or potentially even [lawsuits](https://www.whoisaccessible.com/guidelines/largest-web-accessibility-lawsuits/ "Largest Web Accessibility Lawsuits").  
- Owning your own code: writing and maintaining your own codecan be challenging, but you will always expand your learning, and in the event that a package or plugin becomes deprecated, you won't have to start over from scratch.  (Note this argument can go both ways).  It also makes your website smaller in size which will help it load faster and make it more appealing to search engines since it will load faster.  


## Requirements For A Vanilla Javascript Accordion Component

1. Should be reusable
2. Should be accessible and pass all [a11y](https://www.a11yproject.com/checklist/ "A11y Project Checklist")
3. Should be lightweight

With our goals in mind, let us start building our own vanilla Javascript accordion! 

## Setting Up HTML For Vanilla Javascript Accordion


```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A Vanilla Javascript Accordion UI Component that is lightweight and open source.">
    <title>Document</title>
    <link rel="stylesheet" href="./style.css">
    <script src="./index.js" defer></script>
</head>
<body>
    <div id="app">
        <h1>Accordion Demo</h1>
        <main>
       <section class="accordion">
            <div class="inner">
                <div id="accordion">
                    <div class="item">
                        <button>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, saepe minus. Consequatur, veniam. Vel, iusto quaerat aliquam deleniti inventore et.</button>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti praesentium dolorem iste fugiat facere officiis iure minus? Voluptatum et ut dignissimos molestias in! Est facilis soluta quam voluptatem, fugit nam aut nemo maxime dolore maiores odit, corrupti perspiciatis dolorum itaque.</p>
                    </div>
                    <div class="item">
                        <button>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, saepe minus. Consequatur, veniam. Vel, iusto quaerat aliquam deleniti inventore et.</button>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti praesentium dolorem iste fugiat facere officiis iure minus? Voluptatum et ut dignissimos molestias in! Est facilis soluta quam voluptatem, fugit nam aut nemo maxime dolore maiores odit, corrupti perspiciatis dolorum itaque.</p></div>
                    <div class="item">
                        <button>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, saepe minus. Consequatur, veniam. Vel, iusto quaerat aliquam deleniti inventore et.</button>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti praesentium dolorem iste fugiat facere officiis iure minus? Voluptatum et ut dignissimos molestias in! Est facilis soluta quam voluptatem, fugit nam aut nemo maxime dolore maiores odit, corrupti perspiciatis dolorum itaque.</p></div> 
                    <div class="item">
                        <button>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, saepe minus. Consequatur, veniam. Vel, iusto quaerat aliquam deleniti inventore et.</button>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti praesentium dolorem iste fugiat facere officiis iure minus? Voluptatum et ut dignissimos molestias in! Est facilis soluta quam voluptatem, fugit nam aut nemo maxime dolore maiores odit, corrupti perspiciatis dolorum itaque.</p></div> 
                    <div class="item">
                        <button>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, saepe minus. Consequatur, veniam. Vel, iusto quaerat aliquam deleniti inventore et.</button>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti praesentium dolorem iste fugiat facere officiis iure minus? Voluptatum et ut dignissimos molestias in! Est facilis soluta quam voluptatem, fugit nam aut nemo maxime dolore maiores odit, corrupti perspiciatis dolorum itaque.</p></div> 
                    </div>
                </div>
            </div>
       </section> 
        </main>
    </div>
    
</body>
</html>
```

- We have a landmark area which is the `main` html tag.
- The section tag holds are accordion.
- Note that we have an id on a `div` and it is set to "accordion".  That will be the entry point for our javascript.
- In hindsight, it might be better to upgrade this to a `ul` or a `ol` since technically an accordion is probably a list.  I chose not to in this particular instance, but something to consider for next time.
- Note: I haven't added any aria labels yet because I plan to do that with Javascript. 



## Setting Up The CSS For Vanilla Javascript Accordion

```
main,
h1{
    max-width: 60rem;
    width: 100%;
    margin: auto;
}

.accordion {
    padding-block: 1rem;
    
}
.accordion button {
    background: white;
    border: 1px solid indigo;
    border-radius: 1rem 1rem 0 0;
    color: black;
    text-transform: uppercase;
    cursor: pointer;
    min-height: 2.25rem;
    padding-inline: 2.25rem;
    position: relative;
    -moz-transition: all 300ms ease;
    -webkit-transition: all 300ms ease;
    transition: all 300ms ease;
}

.accordion button:focus {
    background: black;
    color: white;
}

.accordion button::before {
    border-radius: 50%;
    color: black;
    border: none;
    background: white;
    position: absolute;
    top: 50%;
    left: 0;
    content: "\002B";
    width:2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(0.25rem, -50%);
    height: 2.0rem;
    width: 2.0rem;
    font-size: 2rem;
    z-index: 2;
    -moz-transition: all 300ms ease;
    -webkit-transition: all 300ms ease;
    transition: all 300ms ease;
}
.accordion button.active::before {
    transform: translate(0.25rem,-50%) rotateZ(45deg);
}
.accordion p {
    margin: 0 auto 1rem;
    padding-inline: 1rem;
    line-height: 2;
    height: 0;
    overflow: hidden;
    -webkit-transition: all 300ms ease;
    -moz-transition: all 300ms ease;
    transition: all 300ms ease;
}

.accordion button:focus + p {
    background: #e6e6e6;
}
```

The styles are not particularly difficult, but lets walk through them:

1.  The button is the main interactive element to the accordion.  To create a focus state, I am using `css::before` to create a button.  I also want to style the current active accordion button based on the button being in focus.  
2. We should be able to clearly know what accordion item is expanded.  So we use `:focus` on the button to ensure that we can style the currently focused accordion element. 
3. Transitions help our brains understand what is happening.  By creating subtle transitions, we can better convey to the user that the state of the application has updated. 
 


## Implementing the Vanilla Javascript Accordion Javascript Code

```
function Accordion(accordionId, resetOnEveryClick = false) {

    this.accordion = document.getElementById(accordionId)
    this.accordionBtns = this.accordion.querySelectorAll('button')
    this.lastClickedId = null
    this.resetAllActive = resetOnEveryClick
    this.events = function() {
        this.init()
    }

    this.init = function() {

        for (let [index, btn] of this.accordionBtns.entries()) {

            let parentContainer = btn.closest('div') || null
            let msgContainer = parentContainer.getElementsByTagName('p')[0] || null

            if (!parentContainer || !msgContainer) return null

            let childId = "msg-" + index

            msgContainer.id = childId
            msgContainer.setAttribute('aria-labelledby', `btn-${index}`)
            msgContainer.setAttribute('aria-controlledby', `btn-${index}`)


            btn.id = "btn-" + index
            btn.setAttribute("role", 'button')
            btn.setAttribute("aria-label", `${index + 1} of ${this.accordionBtns.length}`)
            btn.setAttribute("aria-expanded", false)
            btn.setAttribute("aria-controls", childId)
            btn.addEventListener('pointerup', this.handleClick.bind(this))
        }

    }


    this.handleActiveState = function(e) {
        let contentBox = e.target.nextElementSibling
        e.target.focus()
        e.target.setAttribute('aria-expanded', true)
        contentBox.setAttribute('aria-expanded', true)
        contentBox.style.height = contentBox.scrollHeight + 'px'

    }

    this.handleNotActiveState = function(e) {
        let contentBox = e.target.nextElementSibling
        e.target.blur()
        e.target.setAttribute('aria-expanded', false)
        contentBox.setAttribute('aria-expanded', false)
        contentBox.style.height = 0
    }

    this.handleClick = function(e) {
        //  this check exists so the panel isn't stuck
        //  when the resetOnClick mode is set to true
        if (e.target.id === this.lastClickedId) {
            this.lastClickedId = e.target.id
            if (e.target.classList.contains('active')) {
                e.target.classList.remove('active')
                this.handleNotActiveState(e)
            } else {
                e.target.classList.add('active')
                this.handleActiveState(e)
            }
            return
        }
        if (this.resetAllActive) {

            this.accordionBtns.forEach((btn) => {
                if (btn.classList.contains('active')) {
                    btn.classList.remove('active')
                    let contentBox = btn.closest('div').getElementsByTagName('p')[0]
                    contentBox.style.height = 0
                }
            })
        }
        if (this.lastClickedId !== e.target.id) {
            this.lastClickedId = e.target.id
            e.target.classList.toggle('active')

            if (e.target.classList.contains('active')) {
                this.handleActiveState(e)
            } else {
                this.handleNotActiveState(e)
            }
        }
    }
    this.events()
}



new Accordion("accordion", false)

```

There is a lot to cover here but none of it is too difficult to understand:

1.  In this case, I am creating a factory function, but it could easily be a class.  A class might be better from a readability standpoint, but this function works just as well.  
2. We are passing in the id of the carousel which we set previously when writing the html.  We also have a flag to control the behavior of the vanilla j:w
avascript accordion.  This basically just toggles the behavior of closing the last opened accordion item.
3. At the top, we are defining the variables we need to control our accordion.  Note, we are also creating a method to initialize our vanilla Javascript accordion.  `this.events()` gets called at the end of the function to get everything started.
4. All `this.events` does is wrap the `this.init` function which sets everything up. 
    - Uses `this.accordionBtns` which is set at the top of the function using `querySelectorAll` on `this.accordion`
    - We want to get the index so we can generate some default attributes.  This is achieved by using `Object.entries()` on the `this.accordionBtns`.  
    - We loop through the buttons and set up the default attributes.  
    -   Finally, we need to add an event Handler to each button.  This eventHandler handles the toggling of the state/
5. `this.handleClick` is the main logic for our application. 

```
this.handleClick = function(e) {
        //  this check exists so the panel isn't stuck
        //  when the resetOnClick mode is set to true
        if (e.target.id === this.lastClickedId) {
            this.lastClickedId = e.target.id
            if (e.target.classList.contains('active')) {
                e.target.classList.remove('active')
                this.handleNotActiveState(e)
            } else {
                e.target.classList.add('active')
                this.handleActiveState(e)
            }
            return
        }
        if (this.resetAllActive) {

            this.accordionBtns.forEach((btn) => {
                if (btn.classList.contains('active')) {
                    btn.classList.remove('active')
                    let contentBox = btn.closest('div').getElementsByTagName('p')[0]
                    contentBox.style.height = 0
                }
            })
        }
        if (this.lastClickedId !== e.target.id) {
            this.lastClickedId = e.target.id
            e.target.classList.toggle('active')

            if (e.target.classList.contains('active')) {
                this.handleActiveState(e)
            } else {
                this.handleNotActiveState(e)
            }
        }
    }
```
6. The first section of `this.handleClick` checks to see if the current click is the same as the last click.  We need to handle the logic slightly different for that case, in the event that we want the person using the application to be able to open AND close the accordion item.  Withouth this check, if we have `resetOnEveryClick` set to true, repeated clicks will never expand and contract the same button.  To get around this, we simply handle this case as an edge and return from the function.  
7.  Otherwise, if `resetOnEveryClick` is set to true, we loop through all of the buttons and look for any that have an `active` class on them.  IF they do, we simply close the content box, then continue on handling the click event.  
8.  Since we have logic for when `e.target.id` === btn.id`, the rest of the logic should exclude that case.  These cases really just act more like a traditional `toggle` event where we toggle the active class on the button, then utilize either `this.handleActiveState` or `this.handleNotActiveState`.  These functions are just setting and unsetting the attibutes for aria, and showing and hiding the content box.
9.  The trick to hiding the content box is achieved by setting the contentBox height to 0 with an `overflow:hidden`.  When the button has active state, we simply set the height to the content box's scrollHeight. 
10. And that is pretty much it! 


## Final Thoughts

It's not as hard as you think to create a vanilla Javascript accordion that is accessible and reusable.  
