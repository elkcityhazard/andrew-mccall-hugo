---
title: 'Setup DisplayLink on Manjaro Linux'
date: 2024-06-15T11:07:16-04:00
author: Andrew M McCall
description: I explain the process I use to get displaylink drivers working on Manjaro linux.
summary: Getting displaylink drivers to work on Arch linux flavors can be challenging to newcomers. Here are my notes for getting displaylink drivers working on Manjaro Linux.
publishDate: 2024-06-15T11:07:16-04:00
updateDate:  2025-12-21T21:00:00-04:00
draft: false
categories:
  - Linux
tags:
  - Manjaro
  - Displaylink
  - FOSS

---
##  Dont want An Explanation? Here is the TL;DR;

```
// This part installs yay and builds it
sudo pacman- Syu

sudo pacman -S --needed base-devel git

cd ~/Downloads

git clone https://aur.archlinux.org/yay.git

cd yay

makepkg -si

// install necessary dependencies

# we need to figure out what kernel version we have so we can download the correct linux headers
uname -a  //    Linux computer-82wk 6.9.3-3-MANJARO 

sudo pacman -S linux69-headers

yay -S evdi-git

yay -S displaylink
sudo systemctl enable displaylink.service

sudo systemctl start displayalink.service


```
## The State of DisplayLink On Arch-Based Systems as of December 2025

It has been a while since I updated this how to guide. The reason that I
haven't is because it still works for the most part.  I haven't had to
install linux-headers by kernel version in a while.  

For Intel iGPUs and AMD GPUs it is usually a pretty low lift to get
displaylink working correctly.  I am using a displaylink dock from
AliExpress that was $40 usd and it is working mostly fine. 

Nvidia, on the other hand, has never played well for me.  Hopefully you
have an iGPU that accompanies your Nvidia card.  The best thing to do here
to let your iGPU be the primary GPU which will have good compatibility with
DisplayLink.  Then, you can use `prime-run` or `optimus-manager` to run
more demanding applications.  This also has the added benefit of working
mostly well with `xdg-desktop-portal`. iGPUs have plenty of power to do
OBS stream capturing for most people. 

But, what about if you _only_ have Nvidia?  Suffice it to say, it has not
been a great experience for me.  I have a `T1000` as well as a `T2000`
Nvidia card and DisplayLink on Arch Linux has not worked well with it.  No
level of kernel module parameters, variations on drivers, and tweaking has
resulted in a positive experience regarding DisplayLink.

### What To Do If You Only Have Nvidia

1. Try using an LTS kernel
2. Try using x11 instead of wayland.  I admit, I have only tried on wayland
   as I use `Niri` and `Gnome` as my primary desktop environments.
3. If you have a slightly more modern computer that supports thunderbolt or
   usb-c alt modes, just by a thunderbolt dock.  I have been having great
   success using the Dell WD22TB4 on a Dell as well as a Lenovo
   workstation. 
4. Don't stray too far from common desktop environments.  If you must use a
   DisplayLink option and Arch, try installing one of the more stable
   distros with a well supported desktop environment such as KDE or Gnome. 


So you have a fresh install of Manjaro Linux, a displaylink dock, and several displays that are not showing an image.  This is pretty much the common experience everytime I install an arch linux distribution on a new retired fleet dell or lenovo laptop.  It always tends to take me some time of messing around before I get my displaylink dock working again.  Because of this, I decided to write some notes so I can just look back and and spend less time re-learning how to ride the bike again. 


## Manjaro Housekeeping Tasks

As of this writing, I do not believe that display link is in the official Manjaro linux repositories.  Conveniently, it is in the [Arch User Repository](https://aur.archlinux.org/packages?O=0&K=displaylink "Dispaylink Driver in Arch User Repository").  For those who are newcomers to Arch-flavored Linux, the <abbr title="Arch User Repository">AUR</abbr> is a community-driven collection of software packages for Arch Linux Users.  It allows users to create and share their own packages and there is a voting component to help users vet the quality of the packages.  

To use the <abbr title="Arch User Repository">AUR</abbr> we need to do some housekeeping to get everything setup correctly. 

## Install YAY On Manjaro Linux

Yay is an <abbr title="Arch User Repository">AUR</abbr> helper which is designed to simplify the process of managing packages on Arch Linux.  It has features such as automating the process of compiling and installing packages from the <abbr title="Arch User Repositiry">AUR</abbr>, and helping to keep them updated locally on your machine. 

1. `sudo pacman -Syu`.  This will update the standard repositories and make sure all repos are up to date and download the latest installed packages. It will also sync the mirrors so that we can get fresh packages from the repositores.

2. Next, we need to install some basic essential tools for everything else.  `sudo pacman -S --needed base-devel git`. The `--needed` flag will help us only get and build the packages we don't already have.  All this does is make the process more efficient since we are reusing packages that we might already have downloaded. `base-devel` are just essential tools to build packages on Arch-flavored Linux distrubtions.  We install `git` so we can install `yay`.  If you are not familiar with `git`, it is version control software that helps us get packages from git repositories and maintain their versioning. 

3. `cd ~/Downloads && git clone https://aur.archlinux.org/yay.git && cd yay`. I personally just move into Downloads so I can delete the folder after I finish installing `yay`.  All we are doing in this step is making sure that we are in the Downloads directory, downloading the `yay` package from the <abbr title="Arch User Repository">AUR</abbr> and moving into the newly created directory from the `git clone` operation.  If you are unfamiliar with `git clone` it is just a `git` command to initialize a new project, and create a copy of a target repository.  It initializes the project, sets up any remote urls for syncing data, fetches the data, creates the local branches, and checks out the default branch.  

4. Once we are inside the `yay` directory, we can run `makepkg -si`.  This will simply build the package for our system.  There will be a few steps involved that you need to take action on, but once you are done you should be able to type `yay -V` and it should cat out the version information of Yay. 



## Installing The Linux Headers

My most recent attempt, I kept running into an error with evdi not being in the correct `lib/modules` directory and it was referencing my linux kernel version.  To this this issue, I needed to install the correct `linux-headers` for my kernel version.  

1. `uname -a`.  This will give us basic information about the system, and most importantly, we can see what kernel version we are using.  This can even be further refined to just `uname -r` which will print out something like this: `6.9.3-3-MANJARO`.

2. Now that we know we are running kernel version 6.9, we can install the linux-headers using pacman: `sudo pacman -Syu linux69-headers`.  This should be all we need for this step.  

## Installing EVDI-GIT Which Is A Dependency Of Displaylink 

> The Extensible Virtual Display Interface (EVDI) is a software project developed by DisplayLink, primarily aimed at enabling user-space Linux programs to manage additional displays and receive updates for them. Initially created as a foundation for DisplayLink's Display driver for Ubuntu Linux, EVDI facilitates the operation of current-generation USB 3.0 Universal Docking Stations and USB Display Adapters. However, its utility expanded beyond DisplayLink's original intent, becoming a generic interface that other applications could leverage, leading to its open-sourcing on GitHub 

- Source [Displaylink - Github](https://displaylink.github.io/evdi/#:~:text=Extensible%20Virtual%20Display%20Interface%20(EVDI,and%20receive%20updates%20for%20them "EVDI definition on Github")

1. `yay -S evdi-git`.  There are a few different versions of `evdi` in the <abbr title="Arch User Repository">AUR</abbr>.  The thing to note, is that kernel development is particularly quick, and often times, it breaks displaylink.  Using the git package, although might not be as stable, will often implement fixes in a more timely manner that fix these breaking changes.  That being said, if you happen to be on a more stable linux kernel, using `evdi` might be preferrable since it will more likely be stable.  

2. `yay -S displaylink`.  This will install the display link package.  Not much to be said here.

3. `sudo systemctl enable displaylink.service`.  This will enable the display link service on start up.

4. `sudo systemctl start displaylink.service`.  This will start the displaylink service.

5.  Note you may need to restart to get everything working.  `sudo reboot`.  




## Troubleshooting displaylink issues on Manjaro Linux

If for whatever reason, you are are still having issues, I highly recommend reviewing the packages in the <abbr t itle="Arch User Repositry">AUR</abbr>.  In addition to comments, there is also detailed information about dependencies which can help troubleshoot displaylink issues.  Furthermore, the Arch and Manjaro community boards are a great place to search for help as well.  

If you still need help, feel free to reach out directly to me and I am happy to help.

Love yourself now, then, and tomorrow.




