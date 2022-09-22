---
title: 'Hugo Website Tutorial: How To Create A Hugo Website'
date: 2021-12-22 00:00:00
updated: 2022-09-22 00:00:00
image: images/blog/hugo-website-tutorial-1200x600.webp
tags:
- hugo
- html
- css
- javascript
- JAMStack
- CMS
Description: Hugo is a powerful static website generator written in the GO language.
  It can help you create clean, modern websites that load quickly with little overhead.
draft: false
---

# Hugo Website Tutorial: How To Create Your First Hugo Website

Hugo is a powerful static website generator written in the GO language. It can help you create clean, modern websites that load quickly with little overhead.

## [VIDEO] Hugo Tutorials

1.  👉 [ [Video] How To Install Hugo On Windows 10 With Chocolately Package Manager (Less Than 2.5 Minutes)](/blog/2022/06/install-hugo-on-windows-with-chocolately-package-manager/ "Install Hugo On Windows 10 With Chocolately Package Manager")
2.  👉 [ [Video] How To Boostrap A New Hugo Theme And Display The Home Page ](/blog/2022/06/bootstrap-a-new-hugo-theme/ "Create A Hugo Theme From Scratch: Part 1")
3.  👉 [[Video] Output Structured Data Using Hugo, YAML, and Frontmatter](/blog/2022/09/frontmatter-data-and-hugo-templates/ "Learn about Hugo context and outputting structured data using frontmatter parameters")

## What is the Hugo static site framework?

Hugo is one of my favorite website build tools. It is very fast. They advertise themselves as being "blazingly fast." Hugo is a static website generator built with the GO language. It uses GO templating and than renders a 100% static website at build time. The reason you want this: speed. Static websites have less technology debt than other modern workflows that require a server backend to process and build pages on the fly.

Additionally, Hugo is also cheaper to maintain. Since there are no plugins to update or complicated server architecture to maintain, Hugo has a minimal economic and environmental footprint. I run my personal hugo site off of a content delivery network and it only costs me a few bucks a month.

This article will be dedicated to creating a dead simple hugo website tutorial. I will show you how to install Hugo and get your first site up and running. Along the way, we will cover a few basic aspects of Hugo I think new Hugo developers should know right away. This Hugo Tutorial is meant to help new Hugo developers abstract away some of the more difficult aspects of the official Hugo documentation.

## Installing Hugo

 👉 __New:__ [ [Video] How To Install Hugo On Windows 10 With Chocolately Package Manager (Less Than 2.5 Minutes)](/blog/2022/06/install-hugo-on-windows-with-chocolately-package-manager/ "Install Hugo On Windows 10 With Chocolately Package Manager")

Unlike other flavors of Static Site Generators, Hugo is dead simple to install. Remember, [gohugo.io](https://gohugo.io "gohugo.io") has comprehensive documentation as well to get you started. If you need further support, you can reach out to myself, or visit the official website which also has an active developer forum. Many examples have been included from their website to demonstrate concepts.

All installation methods require you to visit the following page: [https://github.com/gohugoio/hugo/releases](https://github.com/gohugoio/hugo/releases)

This is where you will find your operating specific installer or binary. Also, a thing to note here: you can see the changelog for each release. That is handy to see what features are being developed and implemented and what fixes were shipped.

### Windows

The official documentation explains several ways to install Hugo on windows. It can be viewed at [https://gohugo.io/getting-started/installing/#windows](https://gohugo.io/getting-started/installing/#windows)

I personally prefer the method of using a package manager likey Chocolatey.

If you don't know what a package manager is or why you need one, I won't bore you with the details. All you need to know about package managers is that they help you install software more efficiently and also help you maintain your software updates in one place.

On windows, I prefer to use [https://chocolatey.org/](https://chocolatey.org/)

If you decide to use this method, you just need to navigate to the "get started" page and follow the directions. It involves copying and pasting code into an admin-elevated powershell terminal. You need to open up windows powershell by right-clicking on the icon and selecting "run as administrator." Once the terminal opens you simply need to set your Execution Policy to "non-restricted." To do this paste the following code:

`Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))`

This will start the installation process. Once you are done you can then install Hugo.

In the same powershell terminal you can paste one of two commands:

```ps1
choco install hugo -confirm
```
or

```ps1
choco install hugo-extended 
```

If you are newer to web development, you will most likely need the first option. For those who use a more modern workflow, hugo-extended is packed full of additional features such as baked in sass/scss support, fingerprinting, bundling features and more.

### Mac

I personally prefer to use the homebrew package manager to install hugo on mac. Unfortunately, some older macs are not supported by homebrew anymore. If you have a mac that is less than 8 years old, you should be okay. If you want to learn more about [Homebrew on Mac](https://brew.sh/ "homebrew package manager"), you can do so by clicking the contextual link.

Once you have installed homebrew on your version of Mac, it is very simple to install Hugo.

All you need to do is open up a command line and type `brew install hugo.`

This will install all of the dependencies and packages necessary to run the Hugo binary on Mac.

Again, if you need help, simply reach out to me and I will be happy to help.

### Linux

There are quite a few different methods to install Hugo on linux. Personally, I like to download the .tar.gz file from the github repo, extact it, and than move the binary into the /usr/local/bin directory (if you want it installed globally).

If you don't feel like you can handle a manual install like this, I can recommend either using the snap store, default package repositories (i.e., sudo apt-get install hugo), brew install hugo, any of the other popular methods that install packages on Linux. Again, if you need help drop me a note and I will help you.

## Creating a new Hugo static Site

Now that we have installation out of the way, we can get on to the fun part. I have a folder on my desktop called hugo-sites. I recommend you create a similar named folder to store your hugo projects. After you create the folder, the next step will be to open up a command prompt there. Not sure how to open a terminal window? Take a few moments to search your favorite internet search engine and you will find a wealth of information. On many desktop environements, it is built in to the right-click context menu. I do remember, however, on windows having to make a minor tweak to the registry to get this option available to me.

Once you are done and the terminal is open simply type `hugo new site name-of-the-site`. This will automatically generate a new site project for you. Once it is done you will need to enter that directory. On most terminals (I can't think of an exception) simply type `cd name-of-my-site.`

## Creating A New Theme for a Hugo Static Site

👉 **New**: [ [Video] How To Boostrap A New Hugo Theme And Display The Home Page ](/blog/2022/06/bootstrap-a-new-hugo-theme/ "Create A Hugo Theme From Scratch: Part 1")

You can start building your hugo project right away if you want to. I personally prefer to create a theme, though. Themes are great because when you want to change the look of your site, all you need to do is port the content into a new theme and make minor tweaks. Once you are inside the project directory that houses your config.yaml file, make sure to get back into the terminal prompt and type `hugo new theme nameoftheme.`

Again, make sure you are in your project folder in the terminal! Once you run the command, Hugo will generate a new theme for you. The last thing you need to do to start using the new theme is to link to it in the config.toml file. To do so, you simply add near the top of your config tile a line that looks something like this:

`theme = "nameoftheme"`

Now that we have that out of the way. We can start using our new theme! Theming is where Hugo goes from a boring old static website generator to something more powerful and extensible.

## Defining layout structure for a Hugo static site

By default you get quite a bit to work with when Hugo spins up a new website.

`. ├── archetypes ├── config.toml ├── content ├── data ├── layouts ├── static └── themes`  
  

### Hugo Archetypes Directory

Archetypes are basically your predefined frontmatter files that are used when you are creating new pages with Hugo. Many developers will use `hugo new` to create new content files and Hugo will pull from the archetypes to structure the markdown page. The config file is the site configuration module. This is where you put the global variables and configurations for your Hugo static site. This will hold your default title, meta Description, and menus for your website. Content is where we hold our markdown files and is generally the layout of your website. This might have directories named "blog", "about-us", "services" and so on.

### Hugo Data Directory

The data directory is great if you need to render any type of structured data. For example, maybe you have a collection of items like baseball cards that are organized in a structured method. You can store the file in the data directory as a JSON file and Hugo will be able to render it via the GO templates to the page.

### Hugo Layouts Directory

Layouts are exactly what they sound like. If you are making a standalone Hugo project, you can actually put your layout templates in this folder. I personally do not do it this way because I like the interchangability of the themes method. But, if you know you are not going to be re-theming often, you can store your layouts in the layout folder to minimize your directory strucuture.

### Hugo Static Directory

The static directory stores anything that is going to be served that often remains unchanged. This would be things like your images, javascript files, and css files. These are files that generally would be candidates for cdn delivery.

### Hugo Themes Directory

The themes directory is the method we will be talking about the most. This houses your themes which is awesome because you can change your theme when necessary and your content is still living in the content directory which makes re-theming a breeze!

## The Baseof File

So if you are still following along you should have a theme and the base set up for a Hugo static site. In your themes folder, you will have a folder with then name, "_default." Inside the folder, there will be a file called baseof.html. This, as it's name suggets, is the base layout template that you can build additional templates out of. This is where you create your blocks.

A block allows you to create the outer wrapper of your pages, overriding parts as necessary for each page template. The baseof file holds the blocks and extends them to each page template. Blocks are handly because you can define main sections of your page that you will most likely always have such as the header. You may have a few different types of header Blocks. The advantage here is that you can swap them out very easily since they are components. Hugo themselves provides a great example of how the block system works:

```go-html-template
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{{ block "title" . }}
      <!-- Blocks may include default content. -->
      {{ .Site.Title }}
    {{ end }}</title>
  </head>
  <body>
    <!-- Code that all your templates share, like a header -->
    {{ block "main" . }}
      <!-- The part of the page that begins to differ between templates -->
    {{ end }}
    {{ block "footer" . }}
    <!-- More shared code, perhaps a footer but that can be overridden if need be in  -->
    {{ end }}
  </body>
</html>
```

Then, when you want to override a block on a new template, all you have to do is create a new html file and define a new block from the template like this:

{{ define "main" }}

my unique html markup goes here.

{{ end }}

As you can see, the block and baseof system gives Hugo some powerful flexibility to create modular websites with ease.

## How Context Works In Hugo

👉 **NEW:** [[Video] Output Structured Data Using Hugo, YAML, and Frontmatter](/blog/2022/09/frontmatter-data-and-hugo-templates/ "Learn about Hugo context and outputting structured data using frontmatter parameters")

Context is probably the single most important concept to grasp with Hugo. It is the foundation of what makes Hugo so powerful. If you do not come from a programming background, context will most likely be a bit more difficult to grasp. Without over complicating it, context is just the currently focused bit of information in an array of similar pieces of information.

For example, lets pretend we have a blog. Say we have a section of our blog devoted entirely to cats. It will most likely have a folder named cats with a leaf bundle file like "_index.md" to signify that it is a collection of like articles.

If we had a template file we might have a section that looks like this:
```
{{ range .Pages }}

<h2>{{ .Title }}</h2>

{{ end }}
```
In this case, the context is pointing to the group of pages in the folder as signified by the dot notation and the word "Pages" appeneded to it. Then, we are simply looping through each page's title and outputting them one by one.

For most cases, that is the generalized version of context. As this is an introduction, I won't go to deeply into context. Just know that is scoping the next item in an array if items and bringing it to the execution stack to be worked with. If you want to learn a ton of information about context I recommend the following article. https://www.regisphilibert.com/blog/2018/02/hugo-the-scope-the-context-and-the-dot/

## Templating The Hugo Theme

In the theme folder you will have a folder called layouts. This is where you keep your theme template files. There will be a _default folder as well as a partials folder. As I am sure you can guess, we put components inside the partial folders. These are accessed in the templates with a custom piece of code specific to Hugo. To include a partial in a template, all you need to do is type out: {{ partial "header.html " }}. That is it. Hugo will know what to do and bring the partial into the template when it builds the pages.

## Website Tracking Code

Hugo also has some built in template partials. These are known as internal templates. One of these is the Google Analytics internal template. This is great if you use Google's service for website tracking code. To make your website tracking code work, all you need to do is add the following bit to your site config file first:

```go-html-template
googleAnalytics = 'G-MEASUREMENT_ID'
```

Then, somewhere in your head partial all you need to do is include the following:

```go-html-template 
{{ template "_internal/google_analytics_async.html" . }}  
```

Now you have included your Google analytics website tracking code into your Hugo project.

Unfortunately there is not support for other types of website tracking code at this time built in. Thankfully, we can easily create partials to include other website tracking code in our projects. I highly recommend using [https://www.plausible.io/](https://www.plausible.io/) because it is an open source project that is privacy-focused tracking software. It tracks visitors but the most you can find out about them is their country of origin. A great feature of this is it does not use cookies which is an added bonus.

## Markdown & Frontmatter

Hugo uses markdown and frontmatter to manage content. I have an article to help you get started on frontmatter here: [Markdown Editor Tutorial](https://www.andrew-mccall.com/blog/markdown-syntax-for-quick-development-and-fast-content-creation/)

The main takeaway for this article is that markdown is how we create our content. Frontmatter is basically how we store our variables, arrays, and objects to render out onto the page. I want to point out that these are not, technically speaking, variables, arrays, and objects. Frontmatter is not a programming language. I just think it is easier to abstract away some of the complexity and think of it this way. For example, you may want to be able to easily update a list of services on a page. You can achieve that pretty easily with frontmatter:
```go-html-template
---
title: services
headless: true
services:
- name: "Walk On Times"
Description: "This is our general admission gameplay time. You don't need to call ahead to book a time with us when there is walk-on time available."
url: "/paintball-services/walk-on-play"
icon: "/images/icons"
- name: "Corporate Events"
Description: "Paintball is great for team building because it allows the players to work together as a cohesive unit to achieve a goal."
url: "/paintball-services/corporate-entertainment-services"
icon: "/images/icons"
- name: "Paintball Parties"
Description: "Birthday Parties and special events are our specialties! Area 51 Paintball can help you plan a birthday or party event."
url: "/paintball-services/paintball-parties"
icon: "/images/icons"
- name: "Paintball Equipment Repair"
Description: "We can help troubleshoot and repair your broken paintball markers and equipment to help you."
url: "/paintball-services/paintball-equipment-repair"
icon: "/images/icons"
- name: "Paintball Equipment Sales"
Description: "Ready to upgrade your gear? We have a full selection of top models for you to choose from."
url: "/paintball-services/paintball-equipment-sales"
icon: "/images/icons"
---
```
Note the declaration for headless. It is set to true. This is how you tell Hugo that you want to use the frontmatter from a markdown file but you don't want to actually render a page for it. Now, if I want to output some services, I can simply use a statement like this:

```go-html-template

{{ with .services }}
{{ range $index, $service := . }}
<h1 id="{{$index}}">{{ .name }}</h1>
<p id="{{$index}}"> {{ .Description }} </p>
{{ end }}
{{ end }}
```

I am sure you can see how this is handy. By the way, I also just showed you to get the index and the context from an array in Hugo.

Frontmatter and markdown are pretty powerful but I also appreciate the fact that it is simple in nature. It really cannot do too much in and of itself which does limit you but also makes you think critically about your project. If you can't do it with markdown, your project may be growing too complex and you need to scale it back.

## Hugo Image Processing

Hugo has some very handy image processing capabilities. Your client sent you a bunch of random sized photos and you need thumbnails? No problem. Images are a first class citizen in Hugo. They are considered page resources which means you can put them in your page bundle for processing. This is especially handy for gallery pages. Simply drag all those photos into a directory named "gallery" in your content sub directory. Make sure you have an index.md file as well. You can than create a page template in your theme's default directory called "gallery.html" Hugo should automatically assign this layout to it, but sometimes I have had to add layout: gallery in my frontmatter for that page.

This gallery layout now has powerful image processing capabilities. The complete image processing documentation can be viewed here: [https://gohugo.io/content-management/image-processing/](https://gohugo.io/content-management/image-processing/)

A simple example of creating thumbnails from your images:

```go-html-template
{{ with .Resources.ByType "image" }}
{{ range . }}

```

```go
{{ $image := $resource.Resize "100x100" }}
<figure>
<img src="{{ $image | absURL }}" loading="lazy" decoding="async" height="100" width="100" />
</figure>
{{ end }}  
{{ end }}  
```

Again, check out the official image processing documentation to see all of the features.

## Hugo Asset Bundling

I personally don't feel that the Hugo documentation does a great job of explaining asset bundling in the documentation. The official documentation on asset bundling in Hugo can be found here: [https://gohugo.io/hugo-pipes/bundling/](https://gohugo.io/hugo-pipes/bundling/)

The key take away here is that you can create an asset folder either in your main project directory or theme folder. Then, you can put assets with like MIME type into folders and bundle, minimize, and process them into one file. To learn this, it a good idea to look at the source code of other Hugo themes and you will get a better idea of how to bundle assets.

You can also process assets in other ways. One example is processing scss files and using PostCSS to take advantage of build time css features that don't exist in traditional css.

## Hosting

So you have been playing around and you have made a simple site with Hugo but now you don't know how to host it. I personally recommend vercel or github pages. These are CI/CD services that will build your page each time it's git repository changes. I won't go to deep into how hosting with a git-based solution works, but the one advantage that can be taken from this method is that you can often host your site for free this way.

The official documentation for github deployment: [https://gohugo.io/hosting-and-deployment/hosting-on-github/](https://gohugo.io/hosting-and-deployment/hosting-on-github/)

An easier way that I like with Vercel: [https://vercel.com/guides/deploying-hugo-with-vercel](https://vercel.com/guides/deploying-hugo-with-vercel)

## Conclusion

This tutorial has taught you a bit about how to use Hugo for generating static websites quickly and efficiently. I have also gone over several imporant features and techniques. The work is not done, however. Hugo is a powerful static website generator that can create very dynamic content despite it's limitations to static generation.

Need help getting started with Hugo? I offer free one on one consulting and training sessions. Book an appointment with me or simply leave me a message on the site. I can be found @elkcityhazard on twitter.
