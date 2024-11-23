---
title: 'Neovim Custom File Extension Syntax Highlighting'
date: 2024-11-22
author: Andrew M McCall
description: A walkthrough of my experience setting up syntax highlighting for custom go template file extensions.
summary:  We learn how to use treesitter injections to setup syntax highlighting for custom file extensions
publishDate: '2024-11-22T20:41:05-05:00'
updateDate:  '2024-11-22T20:41:05-05:00'
draft: false
categories:
  - Web Development
tags:
  - Go
  - Neovim
  - Treesitter
  - SCM Injections
---
## An Introduction To Syntax Highlighting In Neovim

Neovim uses Treesitter under the hood to handle tasty syntax highlighting.  Using your favorite neovim plugin manager (or not), it is really quite trival to set this up.  

From the nvim-treesitter plugin page:

> The goal of nvim-treesitter is both to provide a simple and easy way to use the interface for tree-sitter in Neovim and to provide some basic functionality such as highlighting based on it

Source: [nvim-treesitter/nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter "Neovim Treesitter Plugin")

From my own lazy plugin setup:

```
local plugin = {
"nvim-treesitter/nvim-treesitter",
build = ":TSUpdate",
}
return plugin
```

In our after directory, we would have a lua file that looks a bit like `nvim-treesitter`'s own example:

```
require'nvim-treesitter.configs'.setup {
  -- A list of parser names, or "all" (the listed parsers MUST always be installed)
  ensure_installed = { "c", "lua", "vim", "vimdoc", "query", "markdown", "markdown_inline" },

  -- Install parsers synchronously (only applied to `ensure_installed`)
  sync_install = false,

  -- Automatically install missing parsers when entering buffer
  -- Recommendation: set to false if you don't have `tree-sitter` CLI installed locally
  auto_install = true,

  -- List of parsers to ignore installing (or "all")
  ignore_install = { "javascript" },

  ---- If you need to change the installation directory of the parsers (see -> Advanced Setup)
  -- parser_install_dir = "/some/path/to/store/parsers", -- Remember to run vim.opt.runtimepath:append("/some/path/to/store/parsers")!

  highlight = {
    enable = true,

    -- NOTE: these are the names of the parsers and not the filetype. (for example if you want to
    -- disable highlighting for the `tex` filetype, you need to include `latex` in this list as this is
    -- the name of the parser)
    -- list of language that will be disabled
    disable = { "c", "rust" },
    -- Or use a function for more flexibility, e.g. to disable slow treesitter highlight for large files
    disable = function(lang, buf)
        local max_filesize = 100 * 1024 -- 100 KB
        local ok, stats = pcall(vim.loop.fs_stat, vim.api.nvim_buf_get_name(buf))
        if ok and stats and stats.size > max_filesize then
            return true
        end
    end,

    -- Setting this to true will run `:h syntax` and tree-sitter at the same time.
    -- Set this to `true` if you depend on 'syntax' being enabled (like for indentation).
    -- Using this option may slow down your editor, and you may see some duplicate highlights.
    -- Instead of true it can also be a list of languages
    additional_vim_regex_highlighting = false,
  },
}
```

Source: [nvim-treesitter/nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter "Neovim Treesitter Plugin")


Nvim-treesitter works through three concepts:
- Language Parsers
- Queries
- Modules

Language parsers are installed to interface with treesitter directly to parse a syntax tree. The tree can be viewed via the command `:InspectTree` command.  This is entered via normal mode, and if `nvim-treesitter` is installed, will show you a comprehensive view of the syntax tree.  While the tree is open, you can press `o` to open up the query editor.  This can also be accessed in normal mode via `:EditQuery`.  This is where you can practice writing your queries to use later.

Queries are powerful tools and can even help you define custom formatting and syntax highlighting in specific filetypes.  For example, TJ DeVries can teach you how to format embedded sql statements in rust:

{{< youtube v3o9YaHBM4Q >}}

Language parsers interact with this tree to add the syntax highlighting. 

The rules that dictate how code is highlighted are a combination of queries and modules.  For example, php can inherit a module to help handle inline html.  Queries are like a manifest of rules.  They tell treesitter how to parse particular branches and leafs of the syntax tree.  

The dialect we use to write these queries is a dialect of Scheme.  If you want to read more about scheme, you can head over to the treesitter documentation here: [Treesitter: How To Write A Query](https://tree-sitter.github.io/tree-sitter/using-parsers#query-syntax "Treesitter Query Syntax Documentation").


In some ways, it is similar to CSS in the respect that we are matching selectors - drilling them down to the necessary specificity that we need to enable specific syntax highlighting.

## A problem with custom filetypes and Nvim Treesitter

Now that we have a basic introduction, we can get into what my problem was.

Nvim-Treesitter has a language parser for go templates called gotmpl.  Overall this works pretty great, but it has a very specific extension requirement that just doesn't work for me.  I prefer to use either `layout.base.tmpl`, `mypage.gohtml`, `home.page.tmpl`.  You get the picture. Typically, I am building my template cache and using globs to distinguish whether it is a layout, a page, or a partial.  

This makes the experience of editing the file kind of sad.  It is just a boring gray document with no character.  

This has the consequence of making it more difficult to work on as well. But there is a solution.

We need to add a few lines of code and write something called an [Injection](https://tree-sitter.github.io/tree-sitter/syntax-highlighting#language-injection "Treesitter Language Injections").

## Setting Up Neovim & Treesitter For Language Injections

1. The first thing we need to do is register the filetypes want to use. There is detailed documentation on adding filetypes [here](https://neovim.io/doc/user/filetype.html "Neovim Filetype Documentation"), but it is a relatively straight forward process. 
```
vim.filetype.add({
    extension = {
        gohtml = "gohtml",
    }
})
```
This can accept extension,pattern,or filename.   I have it included before I use `require('nvim-treesitter.configs').setup({})`.  That way the filetype is readily available for treesitter.  

2. Next, we need to associate our `gotmpl` language parser with the new filetype:

```
vim.treesitter.language.register('gotmpl', 'gohtml')
```

At this point, it was working pretty much okay.  But the html was only being partially highlighted for me. 

3. To fix this, I wrote an `injection` to create a "good enough" level of syntax highlighting to cover my basis.  I needed to create an injections.scm file which I housed in: /after/queries/gotmpl/injections.scm.  
```
;; extends 
 
((text) @injection.content
(#set! injection.language "html")
 (#set! injection.combined))

```

Note: the injection keywords are coming directly from Neovim documentation: [here](https://neovim.io/doc/user/treesitter.html#_treesitter-queries "Neovim Treesitter Query Injection Documentation").

Notice that I used `;; extends`?  That is in the event this gets updated somewhere else by a plugin.  We won't lose any of the defaults or custom because we are extending the injection.  

5. At this point, things were looking pretty good.  I could probably refine it more, but what interested me more was getting some completion and LSP working better. 

It is beyond the scope of this article to discuss LSP and completion setup, but the only other thing we really needed to do to get completion working better in my custom filetypes was to add them to the lspconfig.  For example, here I added html:

```
require("lspconfig").html.setup({
        filetypes = {"html","gohtml,gotmpl"},
				capabilities = html_capabilities,
			})
		end,
```


## Final Thoughts On Nvim-Treesitter Syntax Highlighting For Custom Filetypes

So this was quite a learning experience for me.  Initially, I though the query needed to be named after my custom filetype, but that was not the case.  

Since I associated the custom filetype with `gotmpl` it was kind of like an inheritance.  That was kind of the gotcha.  I think it is actually pretty obvious, but when you are learning something new, it is easy to have narrow tunnel vision.  

I look forward to extending this later on to automatically formatting embedded code.  It is always a pain to to manually format those edge cases and with the power of Treesitter, we can easily move beyond that.  

Neovim has been a fun text editor to learn. One aspect I have enjoyed is learning how things we take for granted actually work under the hood. Almost no one ever considers how much effort goes into syntax highlighting, but editing and maintaining your own queries can shine light on a "solved" problem.  



