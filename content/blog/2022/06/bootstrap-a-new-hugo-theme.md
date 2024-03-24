---
title: Bootstrap A New Hugo Theme From Scratch [video]
author: Andrew M McCall
date: 2022-06-21 00:00:00
image: "/images/blog/2022/002-create-a-new-hugo-theme-and-hello-world-home-page.jpeg"
images:
- "/images/blog/2022/002-create-a-new-hugo-theme-and-hello-world-home-page.jpeg"
categories:
- Web Development
tags:
- hugo
- static website generators
- golang
Description: Part 2 after Installation.  This video covers initiating a new theme
  and getting hugo to see it in your project.
draft: false
---

A part of using Hugo is the freedom of making your own theme.  In this tutorial, I will explain how to bootstrap a new Hugo theme so you can customize it exactly how you want to. I will go over verifying installation, creating a theme, telling Hugo how to use your new theme, and we walk through the very basics of setting up a theme so that the home page displays.  

Need help installing hugo?  I have a [How To Install Hugo Tutorial](/blog/2022/06/install-hugo-on-windows-with-chocolately-package-manager/ "installing Hugo Is Easy With Chocolately Package Manager") that is a part of this Hugo theme tutorial  that can help you get started.  

<iframe id="odysee-iframe" width="560" height="315" src="https://odysee.com/$/embed/bootstrap-a-hugo-theme-and-hello-world-home-page/702fe749b7f345a6ead2c9af686a43d7c71a11e8?r=HADqujT6idtBaZKLwMq9UWNb6LbwVV2z" allowfullscreen style="max-width: 100%; margin: 1em auto; display: block;"></iframe>


This starts in your favorite terminal prompt.  


1. Verify your Hugo install with `hugo version`

2. Verify your working directory with `pwd`

3. `hugo new site mysite' 👉 mysite is the name of your project

4. `cd mysite`

5. `hugo new theme mytheme` 👉**mytheme** can be replaced with the name of your theme

6. if you are using [VS CODE](https://github.com/Microsoft/vscode "Visual Studio Code"), then type `code .` and your project should open up in VS Code. 

7. Find your `config.toml` file.  Add an entry `theme = "mytheme"` where **mytheme** is the name of the theme you created at the terminal prompt with .

8. At this point we can open a new terminal in the directory and type `hugo server`.  Nothing will serve at this point.  

9. Next, I am creating a new file at the base of the content directory called `_index.md`.  This is a markdown file.  Markdown is how you create pages in Hugo.  It accepts something called **frontmatter**. 

If you want to learn [how to write frontmatter](/blog/markdown-syntax-for-quick-development-and-fast-content-creation/ "How To Write Markdown") I have a post to get you started.  Essentially, markdown is a way to pass data into Hugo's templates.  I will explore this more later on in this mini course.  Markdown has very simple content but it can be limited in it's scope.  

10. After you create the content file, we need to edit the `index.html` file which is located under `themes/mytheme/layouts`.  This is where you put in your html.  Hugo uses to Golang templating syntax.  Variables are wrapped in double-curly braces like this: `{{ .Title }}`.

11.  Next, we can include stylesheets into our templates.  To do this, we are the static directory inside of the theme.  This is probably the easiest way.  hugo strips the `/static` prefix so when you include your html you do not need to add `/static` to access the stylesheet.  

I highly recommend checking out the following resources to learn more about bootstrapping a Hugo theme.  

- [Hugo New Theme](https://gohugo.io/commands/hugo_new_theme/#readout "create a new hugo theme")

- [Go Text/Template Package](https://pkg.go.dev/text/template "Go Text Template Package")

In the next article, we will start fleshing out our single and list pages and talk about how partials and context work.  


This article is part of a series on how to create a Hugo website from scratch.  Read the original article here: [How To Create A Hugo Website From Scratch: An Overview](/blog/hugo-website-tutorial-how-to-create-a-hugo-website-from-scratch/ "How To Create A Hugo Website From Scratch")