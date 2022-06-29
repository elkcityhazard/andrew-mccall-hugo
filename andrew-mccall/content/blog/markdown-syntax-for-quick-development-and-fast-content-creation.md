---
title: Markdown Syntax For Quick Development and Fast Content Creation
date: 2021-08-17 
image: images/blog/start-markdown-1200-600.svg
tags:
- Static Websites
- JAMStack
description: Markdown is a markup language that was developed to be easy for writers
  to write. It allows writers to generate web pages quickly and readably.
draft: false
---

Markdown is a markup language developed to be easy for writers to write. It allows writers to generate web pages quickly with excellent readability.  It's main purpose is to keep things simple and straightforward so that the writer can focus on the content rather than formatting. Markdown syntax is an alternative to HTML.   It is not as powerful, but in some cases, it may be easier for a writer who doesn't know HTML (or doesn't want to know HTML) than learning that language.

## Define Syntax

We can define syntax as the way in which language elements are ordered to form phrases and clauses.  Syntax refers to how we structure the document, the reserved keywords we use, and the order in which we use the keywords.  With markdown, we are not required to define syntax.  It is already completed for us. 

## Markdown Syntax Formatting

All markdown files end with a .md extension.  Each markdown file requires a section called frontmatter.  Frontmatter is distinguished by three opening and closing dashes like so:
```
---
title: 'This is how to write frontmatter'
---
```

Frontmatter is a mandatory section for markdown files. It includes metadata about the file, such as title and author information. 

The body of your document starts after the end of the frontmatter.  Some markdown editors will format your documeent for you.  However, not all markdown editors are created equally. 

To learn more about markdown syntax you can vis the official markdown documentation:

<https://daringfireball.net/projects/markdown/syntax>



## Why Use Markdown Syntax Over WYSIWYG Editors

What you see is what you get editors are very popular and effective for creating content.  So, why use markdown instead?  Markdown is incredibly portable.  Almost any text editing software can natively read markdown files.  Unlike some WYSIWYG editors like Microsoft's own Word, your files are not locked into a proprietary file format that lacks portability.

In addition, markdown syntax can be used to create virtually any type of document.   Whether you are creating website content, books, documentation, notes, emails, and more!   

Markdown Syntax is cross-platform.  Whether you use Linux, Mac, or Windows, your markdown files will be compatible with your operating system. 

Markdown syntax encourages the simplified over the complicated.  This is not to say that writing in markdown makes your document simple.  Markdown encourages a clutter-free writing experience.  It is a document format created for the internet to make the composition process as simple as possible.  If the writer is able to get comfortable with a few formatting conventions, they will find their composition time will improve considerably as a direct result of their efficiency in creating documents. 

## How To Use Markdown Syntax

The best way to start utilizing markdown syntax is to  use it in your projects.  Github has it's own flavor of markdown syntax called, "github flavored markdown."  A great way to practice markdown syntax is to host a simple page on Github or Gitlab pages. For the most part, markdown files are stored inside a designated folder.  For example, for those using Hugo static page generator, markdown files are stored insde of the "content" folder.  Markdown has a few simple conventions that will cover most basic article writing needs.  For example, H1 tags are designated by starting the line with a '#' tag.  For example,

```

# This is how we write an h1 tag

```

## Link Markdown

Link markdown is not very difficult.  Link markdown can create several different types of links. 

- Inline link markdown
- Relative link markdown
- Mailto link markdown
- Reference link markdown

we can make a link to `[Google](https://google.com)` like this.

Adding a title property is super easy as well:

we can make a link to `[Google](https://google.com "Put your title property inside quotes like this")` like this. 

To make an email address or a URL into a link quickly you can enclose it in brackets:

<yoshi@google.com>

<https://google.com>



To emphasize links:

`**[Google](https://google.com)**`

`*[Google](https://google.com)*`

`[`code`](#code "this is how we format a link as code")`



## Markdown Editors

Although markdown is very simple to compose some prefer to use markdown editors.  My favorite of all markdown editors is ghostwriter.  As markdown editors go, it has two great things going for it: first, it is an open source project, and second, it has a rich feature-set that makes writing a bit easier. Not all open source markdown editors are the same.  What I like about ghostwriter is it has a great focus mode and it also gives you useful statistics regarding your document.  The fact that it is free and open source software makes it a no-brainer to try. 

## Code Block Markdown

Creating a code block markdown document is super simple.  All you need to do to create a code block markdown document is put your code block markdown document between three backticks like so:

\`\`\` 

const myVar = document.getElementById('myDomElement');  

\`\`\` 



As you can see, markdown code blocks are pretty easy to use.  Another way we can achieve markdown code blocks is with inline markdown code blocks.  This is achieved by simply using a pair of back ticks to create the markdown code blocks.  For example:

To create a new date in javascript, all you need to do is call the new date object like so:
```
 `const today = new Date()`
```
Markdown is pretty flexible regarding markdown code blocks which is a convenient feature and makes writing code examples simple.  Markdown code blocks are very useful for teaching coding principles with your blog. Unfortunately, not all markdown code blocks are created equally.  John Gruber created the basics of markdown code blocks but, for many, that was not enough.  Originally, markdown code blocks were meant to be just tab indented.  As markdown has evolved, there has been many extended syntax added.  That means that not all markdown code blocks are the same.  Since extended markdown syntax is available, there has been many markdown processesors created to bridge the gap between the origins of markdown and extended syntax. Although most markdown editors will support original markdown, check with your markdown processing software to ensure it is rendering the markdown  code blocks the way you want it.  

## Markdown Final Thoughts

I personally use markdown in my every day content management workflow.  I like the simplicity of it and also the distraction-free aspect of markdown.  At first, it can be difficult to get the hang of but once you create a few articles it will becomes second nature.



### FAQ

1. What do you think about the Markdown syntax?
 - Markdown syntax is easy to use and very flexible. Using a simple abbreviation system, you can manipulate your original file into any format. Writing a blog? Just turn on the HTML. Writing a book? Just turn on the boilerplate. Markdown syntax also renders faster than HTML. If you are an HTML wizard, and you don't want to write your post in markdown because it is too simple, that's fine. But me? I like the simplicity. And I prefer to write in markdown, then just copy and paste into whatever format I need.
2. What is your favorite Markdown editor?
 - The editor I use is Atom which is a text editor written by GitHub. It can be downloaded from Atom Text Editor . The editor is very easy to use and has a lot of features. It has a nice and simple interface and you can even use it on your own website with a few clicks. You can also set up a workspace by installing the Atom Dashboard app. It allows you to open any file or folder in Atom by just one click. You can even set up a custom keyboard shortcut to open the workspace. I feel that this is the best online text editor available today.
3. How do you write your blog posts in Markdown?
 - There are several ways of writing blog posts in Markdown. The easiest way is to use Wordpress and the Ghost editor. All you have to do is install Wordpress into your web address and then install the Ghost editor. The editor is fully responsive and you can write your posts using your desktop pc or your mobile.
4. Have you ever encountered a bug with Markdown?
 - Sometimes when we write a Markdown document, we face some issues when converting Markdown to HTML. The issue is related to two things: HTML tags and Markdown syntax. The syntax is very simple and straightforward but there are some areas where our knowledge of the HTML syntax might not be as strong as it should be. So to avoid the issue, we should more careful about how we're writing our HTML tags. Usually, when we write an HTML document, we use <p> tag to format a paragraph, but if we use the same syntax here in Markdown then it will create an extra line. Which generally isn't what we want!  So make sure you're properly writing your HTML tags and read the official syntax guide just to be safe!



















