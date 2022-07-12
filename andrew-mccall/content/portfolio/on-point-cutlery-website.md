---
title: On Point Cutlery
date: 2021-10-03 
image: images/portfolio/on-point-cutlery.webp
categories:
- design
- web development
Description: A brochure-style website for a local knife sharpening business.  Created
  with bootstrap, animate on scroll, jquery, and a small bit of vanilla js
draft: false
project_info:
- name: Client
  icon: fas fa-user
  content: On Point Cutlery
- name: Project Link
  icon: fas fa-link
  content: https://onpointcutlery.com/
- name: Skills
  icon: fas fa-globe
  content: Web Design/Development
---

## Website Design Traverse City: On Point Cutlery

The client required a website for their mobile sharpening business.  The aim was to add professional authority to their business with an online presence.  Their goal was to attract more customers via organic search to their business.

To achieve their goal, we decided the best approach was to use a simple static website.  I chose Hugo as the static site generator to generate the static pages efficiently.  To streamline the process, I chose the following tools:

- Bootstrap 4.6 for css
- Animate On Scroll Library
- JQuery
- Magnific Plugin
- Google Fonts
- FormCake
- Vanilla JS
- Git
- Deployed With Vercel

## Project Concerns

### CSS/JS Assets

This project relied on some heavy libraries and plugins.  I installed as much as the css that I could and used Hugo to minify and bundle them together so there would be fewer requests.  There were a few cdn requests so I made sure to preload them to speed up the initial response time.  

### Images

I converted as many as the images I could to webp format.  One thing I would do differently is to make a jpg fallback and use html 5 picture tag to natively fallback to jpeg or png if needed.  As it is, webp is mostly supported now but there are a few Safari browsers that won't be able to support it.


### Deployment

Since this project is pretty small, I decided rather than hosting it on a cheap shared hosting service to use vercel to build from git and serve at the edge. 

## Final Thoughts

A perfect use case of when less is more.  On Point Cutlery did not want to be overwhelmed with a complicated website.  This site gets straight to the point for them and delivers the information they want to share with their potential customers.  









<!-- #### Project Details

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.


#### Project Requirements

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
mollit anim id est laborum. -->