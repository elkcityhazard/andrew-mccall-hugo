---
title: 'Obs Studio Fix Pipewire With Nvidia and Intel Graphics on Niri and Wayland'
date: 2026-01-25
author: Andrew M McCall
description: "I have strugged to get OBS Studio and Pipewire working to capture my screen on Arch
Linux, Wayland, Niri, using Intel iGPU and Nvidia. Here is how I solved the problem."  
summary: "Incomplete EGL implementation and linear buffer import issues with Nvidia causes issues
with pipewire and screen casting in dual gpu configurations. The solution is to use Nvidia as the
render device with Niri."  
publishDate: '2026-01-25T11:13:57-05:00'
updateDate:  '2026-01-25T11:13:57-05:00'
images: ['/images/twitter-card.png']
draft: false
categories:
  - Linux
tags:
  - Arch Linux
  - OBS Studio
  - Niri
  - Wayland
  - Intel
  - Nvidia
---

## What I did To Solve The Problem

1. `sudo pacman -S nvidia-open-dkms nvidia-utils nvidia-settings nvidia-prime`
2. add `nvidia-drm.modeset=1` at `/boot/loader/entries/arch.conf` at the end of my `options` list
3. while you are there you might as well add `i915.enable_psr=0` to solve any built-in display
   flickering
4. `sudo mkinitcpio -P`
5. Open up a terminal and run: `ls -l /sys/class/drm/renderD*/device/driver`
6. In my case my Nvidia device is: `lrwxrwxrwx 1 root root 0 Jan 24 08:58 /sys/class/drm/renderD129/device/driver -> ../../../../bus/pci/drivers/nvidia`
7. Open up `~/.config/niri/config.kjl` with vim
8. [Minimal Niri Debug Config For OBS Studio](#minimal-niri-debug-config "My minimal Niri Debug Config") update your niri config from the codeblock below
9. This tells Niri to use the `Nvidia` device as the primary rendering device.
10. Don't forget to install PipeWire: `sudo pacman -S pipewire wireplumber pipewire-pulse`
11. `systemctl --user disable --now pulseaudio.service pulseaudio.socket`
12. `systemctl --user enable --now pipewire.service pipewire-pulse.service wireplumber.service`
13. reboot

## Minimal Niri Debug Config

```
debug {
   10   render-drm-device "/dev/dri/renderD129"
   11   honor-xdg-activation-with-invalid-serial
   12   wait-for-frame-completion-before-queueing
   13 }
   14
```

## Introducing my problem with OBS Studio, Pipewire, Arch, Wayland, Niri, and Dual Intel/Nvidia GPU

I recently did a fresh install of Arch Linux using the Wayland Protocol, Niri as the Window
Compositor.  This is on a 10th generation Intel i7 cpu with an iGPU as well as a dedicated Nvidia
GPU.

The GPU in question is a `Quadro T1000` so still relatively recent. 

Unfortunately, when I tried to use OBS-Studio with `Pipwire` all I could get OBS to "capture" was a
blank screen.  

Here are my reflections and attempt to consolidate a couple of different sources on how I fixed the
problem in hopes it may help myself or someone later.  

## The Problem with OBS Studio, Wayland, and Dual Intel/Nvidia GPU

[Pipewire: Nvidia fails to import linear buffers](https://github.com/obsproject/obs-studio/issues/12498#issuecomment-3186757691 "Problem: Nvidia has an incomplete implementation of EGL which OBS relies on")

In my experience, by default, when an integrated Intel GPU is present, as well as a dedicated GPU,
Niri defaults to the Intel GPU as the render device.  This is fine for most cases.  But for whatever
reason, caused issues on my Lenovo P15 Gen1 running dual GPUs.  

## Niri Specific Issues Related To OBS Screencasting

> Niri is using your iGPU for rendering and obs is using your Nvidia gpu. This explains why the initial set of modifiers consists of the linear and the invalid modifier. It is clear that it is this way and not the other way around because niri successfully uses GBM to allocate a linear buffer with the rendering usage, which would fail on Nvidia. Obs is unable to import the linear buffer because obs imports pipewire buffers as GL_TEXTURE_2D, but linear images are external only on nvidia. Obs is unable to import the buffer with invalid modifier because either Intel allocates such buffers as linear or because Nvidia is unable to handle the invalid modifier in cross device scenarios.

__Source:__ [ScreenCast shows window selection but only black screen (OBS Mainly)](https://github.com/YaLTeR/niri/issues/2223#issuecomment-3184053797 "ScreenCast shows
window selection but only black screen (OBS mainly)")

If we run NVTOP we can see what is going on:
 ```
 579945 andrew   0  Graphic N/A     638MiB  16%     2%    582MiB qs -c noctalia-shell
 577849 andrew   0  Graphic N/A     408MiB  10%    16%    477MiB /usr/bin/niri --sess
 675905 andrew   0  Graphic N/A     215MiB   5%     0%    691MiB /usr/lib/firefox/fir
 639305 andrew   0  Graphic N/A     103MiB   3%     0%    462MiB /opt/helium-browser-
 577849 andrew   1  Graphic   1%     86MiB   0%     0%    477MiB /usr/bin/niri --sess
 651042 andrew   0  Graphic N/A      40MiB   1%     0%    285MiB alacritty
 ```

 In my case, I have already fixed the problem, but previously, everything was using `1` as the
 render device.

 The solution that worked for me is further down in this thread:

 ```
 Any of the following would solve this

    - run niri on the Nvidia gpu (this is the one OP wants)
    - run obs on the igpu
    - make obs import linear buffers as GL_TEXTURE_EXTERNAL_OES. This also requires separate shaders
    - make obs switch to a rendering technology for this millennium (vulkan) that doesn't require hacks like GL_TEXTURE_EXTERNAL_OES
```

## What the fix was for me

The problem is that Niri is using the iGPU. By setting the render device in niri config, we can fix
the issue.

First, I opened up a terminal and ran:
```
ls -l /sys/class/drm/renderD*/device/driver
lrwxrwxrwx 1 root root 0 Jan 25 11:35 /sys/class/drm/renderD128/device/driver -> ../../../bus/pci/drivers/i915
lrwxrwxrwx 1 root root 0 Jan 25 11:35 /sys/class/drm/renderD129/device/driver -> ../../../../bus/pci/drivers/nvidia
```
Then I updated my Niri Config Debug section:

```
 debug {
   10   render-drm-device "/dev/dri/renderD129"
   11   honor-xdg-activation-with-invalid-serial
   12   wait-for-frame-completion-before-queueing
   13 }
```

Once I did that, I was able to use Pipewire to successfully capture my screen on my integrated panel
as well as my desktop monitors. 




