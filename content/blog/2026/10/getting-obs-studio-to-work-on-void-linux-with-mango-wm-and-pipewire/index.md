---
title: 'Getting OBS Studio to Work on Void Linux With Mango WM and Pipewire'
date: 2026-10-18
author: Andrew M McCall
description: "These are the steps I used to get OBS Studio to work on Void Linux With Mango Window Manager and Pipewire."
summary: "A walkthrough of setting up OBS Studio on Void Linux using Mango Window Manager, Pipewire, with Greetd as the display manager" 
publishDate: '2026-10-18T11:31:15-04:00'
updateDate:  '2026-10-18T11:31:15-04:00'
images: ['/images/twitter-card.png']
draft: false
categories:
  - Linux
tags:
  - Void Linux
  - OBS Studio
  - Streaming
  - Pipewire
  - Greetd
---

I recently decided to do a [Void Linux](https://voidlinux.org/download/ "External Link: Download Void Linux") installation on an old-ish Dell Inspiron 5515 with a Ryzen 7 5500u and 16GB DDR4 ram.  I say "old-ish" because the [Ryzen 7 5700u is built using the ZEN 2 architecture](https://www.amd.com/en/support/downloads/drivers.html/processors/ryzen/ryzen-5000-series/amd-ryzen-7-5700u.html "External Link: Ryzen 7 5700u Specifications"). The reality is, the laptop was released in 2021 and for the most part is quite capable for day to day tasks. 

## Is the Dell Inspiron 5515 Still Worth It In Late 2026 /  Early 2027? 

On an aside, there are two major dowsides that I have personally experienced with this laptop: The screens are awful to look at.  Washed out is an understatement. This isn't a complete deal breaker.  Obviously we can do small things like use an external monitor.  There are also aftermarket screens available for this laptop.  Many of these models come with touch screens.  The problem there is they are not two-in-one laptops so the feature implementation falls pretty flat.  It would have been nicer if they would have completely omitted the touch aspect and invested in a slightly nicer screen. 

The second issue and the one that is more impactful to me is the build quality.  When the laptop was new, it was an acceptable consumer build quality with a top metal chassis and a plastic bottom.The thing that I have noticed now that this model is over 5 years old is that they suffer from a ssimilar manufacturing issue.  There is a threaded mount that afixes the back corner screws into the motherboard.  The issue is the mount is made of plastic and eventually breaks consistently on these models.  I have purchased 2 used chassis for this laptop and they  all have the same issue where one of the back corner bottom screws does not screw in.  

I don't think it is a huge deal breaker, but something to be aware of if you want to buy this laptop on the used market.  I haven't noticed any issues specifically with the hinges yet but I personally like my bottom case to be well secured in the event a liquid accident happens or the laptop was to enter a dusty environment.  

That being said, I think if you can find this model used for sub $149 USD, it is still a worthwhile laptop to be had.  The AMD 5700u processor still has plenty of power despite the ZEN2 architecure and whether you turn it into a Linux machine like I did or continue to use Windows 11 on it I can't find any fault with it.  Bonus is that it has expandable RAM so you can install 32GB DDR4 ram if you want.  It even allows to two full size m.2 SSD's if you want!  


## Installing Mango Window Manager On Void Linux

I won't spend too much time on this.  I simply followed the [Void Linux Full Disk Encryption User Guide](https://docs.voidlinux.org/installation/guides/fde.html "External Link: Void Linux Full Disk Encryption Guide") to install the base system.  This is really well documented.  That being said, it isn't designed for newcomers.  My personal recommendation is that you have experience doing a chroot install then you should have no issues.  I did have to bounce around the Void Linux documentation and also reference the [Arch Wiki](https://wiki.archlinux.org/title/Installation_guide "External Link: Arch Linux Installation Guide"). 

Once I had the base system installed, installing [Mango Window Manager](https://mangowm.github.io/ "External Link: Mango Window Manager: Lightweight and Feature Rich Modern Wayland Compositor Based On WLRoots and SceneFX") was trivial since it is already in the xbps repository.  Previously, many had created custom install scripts but thankfully that is a thing of the past.  In fact, at the time of writing, garbage-town Gemini still cites a list manual processes to install it but the reality is that [Mango Window Manager is now officially in void-packages](https://github.com/void-linux/void-packages/tree/master/srcpkgs/mangowc "External Link: Void Packages Github Repo For The Mango Window Manager Template Used By XBPS Package Manager").   

The basic steps is as simple as:

1. `xbps-install mangowc`
2. `usermod -aG wheel,audio,video,input,rest... yourusername`
3. `passwd yourusername`
4. `EDITOR=vim visudo` - uncomment the wheel section
5. `xbps-instasll -Sy dbus`
6. `ln -s /etc/sv/dbus/ /var/service/`
7. `xbps install pipewire wireplumber`
8. `su - yourusername`
9. `dbus-run-session mango`

## Breaking Down The Basic Steps Of Getting Mango Windo Manager Running On Void Linux

Right now we don't have a session or a seat manager.  If you were to restart the computer after a fresh install and login you would have to manually launch Mango yourself.  The command for that is `dbus-run-session mango`.  As you can see, there are other intermediary steps as well.  We first installed the mango package.  We don't want to do stuff often as the `root` user in Linux Userspace Land. Instead, we want to create a lower privileged user to do our work with.  Since we don't have a session or seat manager, I added my username to some groups so I could interact with them.  Specifically, we want to make sure we are in wheel, audio, and video for pipewire.  By default Void does not allow the wheel group to perform actions as root.  This is handled by utilizing the visudo utility and uncommenting the line so we can execute privileged commands.   Finally, we need to make sure dbus is installed and active.  Since Void Linux uses [runit](https://smarden.org/runit/ "External Link: runit - a UNIX init scheme with service supervision") we start the service by symlinking it to `/var/service` directory.  finally we switch to our newly created user and start mango in a dbus session. 


## Configure OBS Studio to work with Wayland and Pipewire on Void Linux running Mango Window Manager

If all has gone well, you should have a very minimal install of Mango Window Manager. I think the first thing to do is to run through some commands then explain them: 

1. `sudo xbps-install -Sy pipewire wireplumber obs xdg-desktop-portal xdg-desktop-portal-wlr`
2. `sudo mkdir -p /etc/pipewire/pipewire.conf.d`
3.  `sudo ln -s /usr/share/examples/pipewire/20-pipewire-pulse.conf /etc/pipewire/pipewire.conf.d/`
4. `mkdir -p ~/.config/mango`
5. `cp /etc/mango/config.conf ~/.config/mango/config.conf`
6. `vim ~/.config/mango/config.conf`
7. [Add These Lines](#mango-config-for-pipewire-and-xdg-desktop-portal "Mango Config Lines")
8. `mkdir -p ~/.config/xdg-desktop-portal`
9. `touch ~/.config/xdg-desktop-portal/mango-portals.conf`
10. [Add These Portal Declarations](#configure-xdg-desktop-portals "Configure XDG Portals for Mango Window Manager")
11. Reboot your system.  
12. If you configured a session manager great, oterhwise login to the tty and run `dbus-run-session mango`
13. Try adding a capture source, you should have pipewire now.  

## Mango Config For Pipewire and XDG Desktop Portal

```ini 
env=XDG_CURRENT_DESKTOP,mango
env=QT_QPA_PLATFORM,wayland
env=XDG_SESSION_DESKTOP,mango
env=XDG_CURRENT_SESSION_TYPE,wayland
env=GDK_BACKEND,wayland
env=MOZ_ENABLE_WAYLAND,1

exec-once = pipewire
exec-once = wireplumber
exec-once = pipewire-pulse

exec-once = /usr/libexec/xdg-desktop-portal -r
exec-once = /usr/libexec/xdg-desktop-portal-wlr
```

## Configure XDG Desktop Portals

```ini 
[preferred]
default=gtk # if you have it installed
org.freedesktop.impl.portal.ScreenCast=wlr
org.freedesktop.impl.portal.Screenshot=wlr
```

In the `xorg` days, OBS was quite trivial to setup.  This is because xorg comes from a different time. I want to be clear: I am not knocking `xorg`.  I still think it is fantastic and what I can say simply is that any time I want a lightweight install `xorg` is a fantastic choice.  Although I have mostly moved on to `Wayland` for compositing these days, the truth is that `Wayland` offers an architecture that can cause bloated installs if we are not careful. Quickshell anyone?  The point that is clear here is that `xorg` allowed us to easily spy on our screen and share our frame buffer to OBS Studio.  Wayland has added security features to make this experience less "batteries included".  

At the time of writing, there are two primary ways that most use to unlock screen sharing in a Wayland environment.  One is installing the popular [WLROBS](https://hg.sr.ht/~scoopta/wlrobs "Share Your Wayland Compositor With OBS").  This does have some drawbacks, though.  The Primary one is that it does not allow us to share individual applications with OBS.  This may not matter for you.  The mercurial repo provides details on how to install it.  The one thing I will note is that the package names are not one for one when it comes to Void Linux.  

## Installing Wlrobs on Void Linux

1. `sudo xbps-install -Sy base-devel mercurial wayland-devel libobs-devel meson ninja`
2. `hg clone https://hg.sr.ht/~scoopta/wlrobs`
3. `cd wlrobs`
4. `meson setup build`
5. `ninja -C build`
6. `mkdir -p ~/.config/obs-studio/plugins/wlrobs/bin/64bit`
7. `cp build/libwlrobs.so ~/.config/obs-studio/plugins/wlrobs/bin/64bit`

__Note:__ I did run into some minor system dependencies while doing this.  I won't comment too much on them, but you should be able to use your favorite search engine or LLM of choice to resolve any dependencies.  I am leaving these instructions here for those who might struggle with the `Pipewire` implementation.

Continuing on, Wayland works a little different. To share our screen, we need three things to happen.  We need to give permission, we need Pipewire to act as the delivery router, and we need OBS Studio to consume the stream.  

### How OBS, Pipewire, and Wayland Work Together via XDG Desktop Portal


| Component | Primary Role | Key Responsibility under Wayland | Connection / Interaction |
| :--- | :--- | :--- | :--- |
| **XDG Desktop Portal** <br> xdg-desktop-portal-wlr | **The Gatekeeper** <br>(Security & Permissions) | • Requests permission from the user to share a screen or window.<br>• Negotiates capturing interfaces with the compositor. | Interacts directly with the system compositor (Sway/dwl), creates a secure video stream, and hands it over to **PipeWire**. |
| **PipeWire** <br>pipewire | **The Courier** <br>(Multimedia Router) | • Manages the low-latency audio/video multimedia streams.<br>• Transports data safely from the system level to apps. | Takes the authorized screen stream from the **Portal** and multiplexes/routes it securely to **OBS Studio**. |
| **OBS Studio** <br>obs-studio | **The Consumer** <br>(Recorder & Streamer) | • Provides the user interface to pick sources via "Screen Capture (PipeWire)".<br>• Encodes, saves, or streams the captured video feed. | Requests a stream from **PipeWire**, receives the raw video frames, and pipes them into its rendering/recording engine. |

__Note__: This was generated with the use of LLM but reviewed by me for accuracy.  

The first part of this we did by installing the necessary `xdg-desktop-portal` for mango. It is important to note here that sometimes you need more than one `xdg-desktop-portal`.  Your window manager documentation will usually let you know what ones you need.  There is also this really goodArch Wiki which goes over [Common XDG Desktop Portal Capabilites](https://wiki.archlinux.org/title/XDG_Desktop_Portal "External Link: XDG Desktop Portal Wiki Article on archlinux.org").

For the purposes of Mango Window Manager I went to the [Mango Window Manager XDG Portal Documentation](https://mangowm.github.io/docs/configuration/xdg-portals "External Link: Mango Window Manager XDG Desktop Portal Documentation").

Because I read the documentation. I added the necessary `xdg-desktop-portal` lines to my `mango-portals.con` at `~/.config/xdg-desktop-portal`.  This ultimately takes precedence over the default stored at `/usr/share/xdg-desktop-portal/mango-portals.conf`.  I mention this because it is a good reference and I believe now this ship the necessary config provided you install `xdg-desktop-portal-wlr` and start it in your mango config. 


## Conclusion

That was enough for me to get my OBS Studio using Pipewire to capture screen recordings.  That being said, things may change and your system may be different.  I will do my best to update this if anything breaks.  

From a high level view we covered: 

1. Installing `pipewire` and `wireplumber`
2. Starting Pipewire via the mango config
3. Installing `xdg-desktop-portal` and `xdg-desktop-portal-wlr`
4. Starting `xdg-desktop-portal` and `xdg-desktop-portal-wlr` via the mango config
5. Updating the mango config file
6. Updating the `mango-portals.conf` file
7. Starting Mango Window Manger via `dbus-run-session mango`
8. We covered installing `wlrobs` an alternative method for sharing wayland screen for screen capture
9. Installing OBS Studio on Void Linux.  

Feel free to send me a message if you still need help, and remember, Linux can be done YOUR way!
