---
title: 'Install Nerd Fonts on Arch Linux Manually'
date: 2026-02-14
author: Andrew M McCall
description:  "Many applications depend on Nerd Fonts to display correctly. Learn how to manually
install nerd fonts on Arch Linux using curl and wget." 
summary: "Quickly install Nerd Fonts on Arch Linux using nerdfonts.com, curl, and unzip.  No special
packages needed. Manage Nerd Fonts with ease and bonus content on setting the font in Alacritty." 
publishDate: '2026-02-14T20:51:44-05:00'
updateDate:  '2026-02-14T20:51:44-05:00'
images: ['/images/twitter-card.png']
draft: false
categories:
  - Linux
tags:
  - Arch Linux
  - Nerd Fonts
  - Curl
  - Unzip
  - Alacritty

---

<iframe width="100%" height="auto"
src="https://www.youtube.com/embed/GUkiTccl3wE?si=gHtkY8a8dX8w_IEO" title="YouTube video player"
frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
style="height: auto;aspect-ratio:16/9;"></iframe>

## Prerequisites to installing Nerd Fonts On Arch Linux
This tutorial assumes you have the following packages installed:
1. Curl
2. Unzip

## Installing Nerd Fonts Manually On Arch Linux Instructions

__Note__: In this example I am using `0xProto Nerd Font` but please use the correct font when
following the directions below.

 1. `cd ~/Downloads`
 2. `mkdir  fonts`
 3. Navigate to [nerdfonts.com](https://nerdfonts.com)
 4. Click `Downloads`
 5. Find the font you want to install
 6. Right-click on the `Download` button and select copy link
 7. In the `~/Downloads/fonts` folder fetch the zip file with: `curl -LO
https://github.com/ryanoasis/nerd-fonts/releases/download/v3.4.0/0xProto.zip`
 8. `sudo mkdir -p /usr/share/fonts/nerd-fonts/0xOProto`
 9. `sudo unzip 0XProto.zip -d /usr/share/fonts/nerd-fonts/0xOProto`
 10. `fc-cache -fv`
 11. `vim ~/.config/alacritty/alacritty.toml`
 12. [Update Alacritty Following This Template](#alacritty-toml-example "Alacritty TOML Example For
Nerd Fonts")


## Alacritty TOML Example

```
[general]
import = [
    "~/.config/alacritty/themes/themes/tokyo_night.toml"
]

[font]
size = 14.0 # Set your desired size

[font.normal]
family = "BlexMono Nerd Font"
style = "Regular"

[font.bold]
family = "BlexMono Nerd Font"
style = "Bold"

[font.italic]
family = "BlexMono Nerd Font"
style = "Italic"
```

## What Are Nerd fonts

Nerd fonts are special fonts that can be installed that support icons and ligatures.  Many
applications in the Linux ecosystem depend on Nerd Fonts to offer a more visually pleasing
experience when displaying text.  They can display icons and also support ligature for some fancy
text output.  Nerd Fonts are supported by all major operating system but do not come pre-installed
most of the time.  

Nerd Fonts can be used in lieu of popular icon libraries such as Font Awesome and a nice benefit is
that in can be used to patch existing fonts.  This allows us to embed new icons into an existing
typographical fontface. Nerd Fonts have great community support and continue to recieve updates and
improvements as the project matures.  You can read all about Nerd Fonts at
[nerdfonts.com](https://nerdfonts.com "Nerd Fonts website") or at
[github.com](https://github.com/ryanoasis/nerd-fonts "Nerd Fonts on github.com")
