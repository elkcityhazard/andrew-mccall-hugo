---
title: 'SCSS Use VS Import: How To Use @Use in SCSS'
author: Andrew M McCall
date: 2022-06-07 00:00:00
image: "/images/blog/2022/scss-use-vs-import-1200-600.webp"
images:
- "/images/blog/2022/scss-use-vs-import-1200-600.webp"
tags:
- SCSS
- CSS
- Frontend
- Web Development Tips
- scss cheatsheet
Description: SCSS Import is going away but what does that mean for you?  Let me explain
  how scss @use works quick and simple.
draft: false
---

You have probably seen many times that `@import` is gradually being deprecated in SASS.  So what is the alternative?  Sass wants us to use @use which actually requires a little bit more setup but comes with the ability to namespace your sass and make it easier to maintain in larger projects. 

## What Is Wrong With Using @Import in SASS?

I do not feel there is any better way to put this than cite the official SASS documentation:  

>   The @import rule has a number of serious issues:
>   
>       @import makes all variables, mixins, and functions 
>       globally accessible. This makes it very difficult 
>       for people (or tools) to tell where anything 
>       is defined. Because everything’s global, libraries 
>       must prefix to all their members to avoid naming 
>       collisions. @extend rules are also global, which 
>       makes it difficult to predict which style rules will 
>       be extended. Each stylesheet is executed and its CSS 
>       emitted every time it’s @imported, which increases 
>       compilation time and produces bloated output. 
>       There was no way to define private members or placeholder 
>       selectors that were inaccessible to downstream stylesheets.
> 
>   The new module system and the @use rule address all these problems.

Source: [sass-lang.com](https://sass-lang.com/documentation/at-rules/import "What is wrong with @import")


So, then, what do we do?  At first was a bit confusing for me to understand how the `@use` directive works in SASS.  
I felt like it required a lot of extra typing to achieve the same result but there must be a benefit.  It turns out
that it is not as difficult as it seems and does not require very many extra lines of code to get it to work right.

## How To Use The @Use SCSS Directive

The key element to the `@use` directive is that to get it to work efficiently it requires another directive which is called `@forward`.
Again, from the SASS documentation:

>   The @forward rule loads a Sass stylesheet and makes its mixins, 
>   functions, and variables available when your stylesheet is loaded with the @use rule. 
>   It makes it possible to organize Sass libraries across many files, while allowing 
>   their users to load a single entrypoint file.

Source: [sass-lang.com](https://sass-lang.com/documentation/at-rules/forward "@forward rule")

The `@use` directive works with both the `@forward` directive but to get it to work effectively there is
one more component that needs to be brought into the fold.  `@forward` directives need to be stored inside
an `_index.scss` file.  The idea is to create a subfolder in the main scss file structure.  It might be
called something like `_components`.  Inside this sub-directory you might have something like a button
component, a card component, and so on and so forth.

Of course it is totally fine to just use the `@use` directive for these components but the issue with this
approach is that we have to define the namespace for each `@use` directive.  This would make maintaining the
SASS structure difficult to say the least.  For example, any time we wanted to call a button it would look
like this:

`@use './_components/_button.scss' as button;`

To actually call the button into action it would need to look like this:

```
.some-class-name {
    color: button.$some-defined-color-variable;
}
```

### A Better Approach To @Import

Instead of calling each component with `@use` we can call `@use` on the `_index.scss` file localed in the `_components`
directory.  But first we must forward are required modules in the `_index.scss` file.   Think of `@forward` as
a more robust way of requiring css components.  The index file acts as a directory of sorts of all of your
required modules.  Inside of the `_index.scss` file we simply would include our scss components like this:

`@forward './_button.scss';`


Once we have all of the appropriate forward directives set up in the index, all we need to do to gain access to them
is call `@use './_components/_index.scss' as *;`.  Now that index file has passed on all of the forwarded scss
modules to the current scss module.  

__Note:__ the `*` imports the directives similiary to how `@import` works without a defined namespace.  Alternatively,
we could have done it like this: `@use './_components/_index.scss' as variables;`

In this case we would need to access our scss modules like this:

```
.some-class-name {
    color: variables.$blue;
}
```

##  Use @Use and @Forward to better organize your SCSS Partials

Where the `@use` and `@forward` directives really shine is that it makes organizing your SCSS Modules a breeze.
For example, let's say you want to have a SCSS Partials Library with different components.  These can be built out
individually in their own file and then simply brought into the index to be forwarded.  
I personally like to break out my custom page styles into their own pages folder to keep my templates as organized as possible. 
If I need to make a change to a template, I know exactly which SCSS file to go into and edit if needed.

## Final Thoughts: SCSS @use vs @import

I hope this brings some light to newer developers (or those new to SCSS) on how to better utilize the `@use` and `@forward` directives.
I personally don't feel that the official documentation covered the concept of creating a module index to forward
the necessary modules onto other SCSS modules.  To think of it another way:  the index file is almost like a table of contents for your modules.  When you are ready to use them simply call the `@use` directive on the index file and you will have full access to all of your defined scss directives that are forwarded.

If you still have questions feel free to contact me on the website or reach out on twitter @elkcityhazard.  

Need help with your SCSS?  I am happy to consult for free!  





