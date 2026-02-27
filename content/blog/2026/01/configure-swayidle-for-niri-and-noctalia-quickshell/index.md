---
title: 'Configure Swayidle for Niri and Noctalia Quickshell on Arch Linux'
date: 2026-01-24
author: Andrew M McCall
description: A straight to the point guide on configuring swayidle to lock and suspend your system when using Niri Compositor and Noctalia Quickshell Config on Arch Linux
summary:  Noctalia does not come with an idle listener by default so you have to pick your own.  This is my guide for configuring Swayidle to work with Niri and Noctalia Quickshell so your system locks and suspends. 
publishDate: '2026-01-24T10:16:49-05:00'
updateDate:  '2026-02-26T10:16:49-05:00'
images: ['/images/twitter-card.png']
draft: false
categories:
  - Linux
tags:
  - Arch Linux
  - Niri
  - Wayland
  - Quickshell
  - Noctalia 
---

## Configure Hibernation On Arch Linux

[This guide can help you configure hibernation](https://wiki.archlinux.org/title/Power_management/Suspend_and_hibernate "Arch official hibernation documentation")

1. You need to have swap enabled and ideally be the same size as your installed system memory
2. edit `/etc/mkinitcpio.conf` and add resume to your `HOOKS` dependencies: `HOOKS=(base udev autodetect microcode modconf kms keyboard keymap consolefont block filesystems resume fsck)`
3. get your UUID for your swap partition:  `lsblk -f`
4. edit `/boot/loader/entries/arch.conf` (if that is what yours is called)
5. add `resume=UUID={your swap UUID}` to the end of options
6. sudo mkinitcpio -P

## How To Configure Niri / Noctalia Quickshell Config For Automatic Lock Screen on Arch Linux

1. `sudo pacman -Syyu`
2. `sudo pacman -S swayidle`
3. `mkdir -p ~/.config/systemd/user`
4. `touch ~/.config/systemd/user/swayidle.service`
5. `vim ~/.config/systemd/user/swayidle.service`
6. [Add this to the swayidle.service file](#swayidle-service-file "SwayIdle Service File")
7. `systemctl --user add-wants niri.service swayidle.service`
8. `systemctl --user daemon-reload`
9. `systemctl --user status swayidle.service`
10. It should say enabled and active at this point. 

## Swayidle Service File

```
[Unit]
Description=SwayIdle Service
# Start the agent after the graphical session is ready (optional, good practice)
After=graphical-session.target

[Service]
Type=simple
ExecStart=/usr/sbin/swayidle -w \
timeout 300 'qs -c noctalia-shell ipc call lockScreen lock' \
timeout 600 'qs -c noctalia-shell ipc call sessionMenu lockAndSuspend'
# Ensure the process is restarted if it fails
Restart=on-failure
# Give the agent time to register with the D-Bus session
TimeoutSec=30

[Install]
WantedBy=graphical-session.target
```


## Explanation of How To Configure Niri / Noctalia Quickshell to use SwayIdle For Lock Screen 

Niri is a wayland compositor that is a [scrolling window manager](https://github.com/YaLTeR/niri "Niri Scrolling Window Manager").
Noctalia is a shell that runs on top of Niri to give you a [nice quickshell config](https://noctalia.dev/ "Quickshell config for Niri Scrolling Window Manager") to interact with your system.  
Swayidle is an [idle management daemon](https://github.com/swaywm/swayidle "Idle Management for Wayland Compositor") to help you manage things like screen lock and system suspend on wayland.

Unfortunately, at the time of writing, Noctalia does not offer a baked in solution for idle management.  If you want do not want to configure your own, I recommend [Dank Material Shell](https://github.com/AvengeMedia/DankMaterialShell "An alternative Quickshell configuration with off the shelf support for idle management").  

After installing swayidle we can use it to make `IPC` calls to do what we want.  The two challenges we need to solve is making this happen when we login to our shell and knowing what commands to call. 

To achieve this, we can look at the Noctalia IPC documentation.  They have clear examples of how to lock the screen: `qs -c noctalia-shell ipc call lockScreen lock` and how to lock and suspend: `qs -c noctalia-shell ipc call sessionMenu lockAndSuspend`.

If you are not familiar with what IPC is, It stands for `Inter Process Communication`. At a high level, it is a way separate processes on your computer can communicate with each other. 

Now that we know how we can manually trigger these events, we combine swayidle and systemd to actually handle this automatically for this. __Note:__ the `systemd` example is pulled directly from the [swayidle example](https://github.com/swaywm/swayidle/blob/master/swayidle.1.scd "SwayIdle example for adding itself to systemd") itself.

Finally, we need to create a way to make it start automatically.  We can create a `systemd` `user` folder in out `~/.config` directory.  I then created a swayidle.service file and added the above configuration such that we Exec the swayidle command which is given to us from the `SwayIdle documentation`.  Finally the command `systemctl --user add-wants niri.service swayidle.service` is used to start the service when niri loads and systemd looks for it's dependencies. 

We then reload the user daemon and check to see if everything is working. 

If you have any issues, feel free to find me at @elkcityhazard on indieweb.social or contact me via this website.  

## Conclusion

Overall, I find Noctalia to be a little snappier than Dank Material Shell on my system.  A minor pain is setting up system idle for locking and suspending but following this guide, reading the documentation carefully, and taking your time will enable you to have success in automatic locking and suspending.  

### Change Log

- 2025-02-26: Fixed an broken link to the Arch Wiki regarding hibernation configuration. 
