---
title: "Frontmatter Data And Hugo Templates: How To Output Data With Hugo Static Site Generator"
author: Andrew M McCall
date: 2022-09-21
image: "/images/blog/2022/front-matter-hugo-vid.jpeg"
images:
- "/images/blog/2022/front-matter-hugo-vid.jpeg"
categories:
- Web Development
tags:
- Hugo
- Frontmatter
- Data
- Static Site Generator
- Tools
Description: "Learn how easy it is output frontmatter data with Hugo creating this simple coffee shop menu"
draft: false
---

Hugo makes quick work of small client jobs.  It can even handle structured data like coffee shop menus or restaurant pricing.  

## VIDEO: Creating A Coffee Shop Menu Using Frontmatter YAML and Hugo

<iframe width="100%" height="450" src="https://www.youtube.com/embed/ziGT380FTC0" title="YouTube video player" loading="lazy" style="margin: 1rem auto;" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Creating A Hugo Homepage

`hugo new site my-coffee-shop && cd my-coffee-shop`

The first thing we are going to do is create a new Hugo website.  In the `config.toml` file, we added a `site title`.  

We also need to make sure we create a `index.html` page in the layouts folder as well as a `_index.md` file which will live at the base of our content folder.  This markdown file will be used to hold our structured data which we are going to output in the template.  

I brought in bootstrap from `cdnjs` since we are not learning css in this tutorial.  After that we created a new HTML boilerplate in the `index.html` file.  

Next we do some very basic bootstrap stylings just to give our menu some styling so we have something to look at.

## Using Frontmatter and YAML To Create Structured Data

We need to set up the section for our menu.  But before we can fully create our coffee shop menu, we need to create the data to be outputted by the template.  This is going to be achieved using [frontmatter](https://gohugo.io/content-management/front-matter/ "Hugo Frontmatter Documentation") as well as [YAML](https://yaml.org/ "Yet Another Markup Language").  

The `_index.md` file will look this:

```
---
menu:
  - title: "Latte"
    description: "A coffee drink that features steamed milk"
    sizes:
      - type: small
        price: 2.99
        size: 12 oz
      - type: medium
        price: 3.99
        size: 16oz
      - type: large
        price: 4.99
        size: 20oz
    ingredients:
      - Milk
      - Coffee
  - title: "Americano"
    description: "A Coffee Beverage featured Espresso and hot water"
    sizes:
      - type: small
        price: 3.99
        size: 12 oz
      - type: medium
        price: 4.99
        size: 16oz
      - type: large
        price: 5.99
        size: 20oz
    ingredients: 
      - Water
      - Espresso
  - title: "Mocha"
    description: "A Coffee Beverage with cocoa"
    sizes:
      - type: small
        price: 2.29
        size: 12 oz
      - type: medium
        price: 3.29
        size: 16oz
      - type: large
        price: 4.29
        size: 20oz
    ingredients: 
      - Water
      - Cocoa
      - Milk
---
```

We declare a frontmatter parameter named `menu`.  To distinguish a new item in the menu, we start each item with a `-` and indent accordingly according to `YAML` specification.  If we need to create a new list group, such as "sizes", we create a new list declaration by defining the list name and a `:`.  Again, to define a new item in the list we start with a `-`. Each property will then be indented and typed out accordingly with the format of `property: value`.

## Using Hugo To Output The Structured Data

The first thing we need to do is hop back into our index.html template.  Since we defined the menu as a frontmatter parameter, we will need to access it using built in Hugo functions which are based off of Go Templates.  I highly recommend reading the [GO documentation](https://pkg.go.dev/text/template "Go Text/Template Package Documentation") to learn more about the inner workings of Hugo's templating engine.

To best describe what we need to do, let us break down our code:

```
<div class="row">

                {{ with .Params.menu }}

                {{ range . }}

                <div class="col-12 col-md-6 col-lg-4 mx-auto p-3">
                    <div class="card bg-dark text-light">
                        <div class="card-header">
                            <h3>{{ .title }}</h3>
                            <p class="card-description">{{ .description }}</p>
                        </div>
                        <div class="card-body">
                            {{  with .sizes }}
                                <ul class="list-group">
                                    {{ range . }}
                                    <li class="list-group-item"><strong>{{ .type }}: </strong> ${{ .price }} - {{ .size }}</li>
                                    {{ end }}
                                </ul>
                            {{ end }}
                            {{ with .ingredients }}
                            <div class="text-center p-3"><strong>Ingredients</strong></div>
                                <ul class="list-group">
                                    {{ range . }}
                                    <li class="list-group-item">{{ . }}</li>
                                    {{ end }}
                                </ul>
                            {{ end }}

                        </div>
                    </div>
                </div>

                {{ end }}


                {{ end }}
            </div>
```

The first thing we are doing is selecting the menu from the frontmatter variable.  Hugo let's you define your own frontmatter params and the way you access them in the template is through the `.Params` declaration.  Hugo is passing in the data to the template as an interface.  We are using the `{{ with .Params.menu }}` function to first, check that there is data and also hoisting the context of that data to the dot.  There is no better explanation of the dot then the fantastically written article by Regis Philibert entitled, [Hugo, the scope, the context and the dot](https://www.regisphilibert.com/blog/2018/02/hugo-the-scope-the-context-and-the-dot/ "Read More About Hugo Context And The Dot").

To borrow (rip directly) from Regis' article:

>I’m using the word scope in the title here, because it’s what first come to mind when dealing with the issue and I guess what people will eventually seek help for. But I suppose we’ll be talking more about the « context »
>The scope is really what is available to you at a certain point in your code. From inside a function or a class for exemple.
>But in Hugo Templates, most of the time, only one object is available to you: the context. And it is stored in a dot.
>Yep, that dot. {{.}}
>So you end up using the properties of this object like so: .Title, .Permalink, .IsHome

Source: [Hugo, the scope, the context and the dot](https://www.regisphilibert.com/blog/2018/02/hugo-the-scope-the-context-and-the-dot/ "Read More About Hugo Context And The Dot")

Once we switched the context to the menu itself, we can start accessing the properties using the dot.  Since we have a list of items, we are going to use the [range function to iterate over the context](https://gohugo.io/templates/introduction/#iteration "Hugo Iteration Tutorial and Documentation").  This is how we access the title and description.  Then, once we get to the sizes, we will need to range yet again. This is because sizes is another list, which in Go and Hugo world means map, array, or slice.

Again, we are going to use the `with` function to check first if the sizes exist, and then range over the context provided by the with statement.

The reason why the context shifts to the dot is because GO, and thus Hugo, is a pass by value language.  This means that context is reset within the scope of the function body.  It has no awareness of any reference, it is simply just accepting the values and doing what it needs to do with it.  In Golang, we would pass a pointer reference to the function to update the variable itself but Hugo does not work this way. This is why the context goes from say `.sizes.type` to simply `.type`.  

Finally, all we are doing is checking to see if ingredients exist and using the same principles as we have already seen to loop through the ingredients and output it as a list group.


## Final Thoughts

Learning how context works in Hugo can be challenging at first but as you can see, a simple example can help clarify how it works and make it easier to digest.  If you are a freelancer or have a smaller project, Hugo can be an amazing tool to make money quickly as this framework can spin up production ready static sites very quickly.  

This is a part of a larger series of videos on Hugo.  Read and watch the rest of my hugo videos by clicking the links below: 

- [Bootstrap A New Hugo Theme From Scratch](/blog/2022/06/bootstrap-a-new-hugo-theme/ "Set up a hugo website tutorial")
- [Install Hugo On Windows With Chocolately](/blog/2022/06/install-hugo-on-windows-with-chocolately-package-manager/ "Install Hugo With Chocolately On Windows 10")
- [A Complete Beginners Guide To Hugo](/blog/hugo-website-tutorial-how-to-create-a-hugo-website-from-scratch/ "Complete Beginners Guide To Hugo")



