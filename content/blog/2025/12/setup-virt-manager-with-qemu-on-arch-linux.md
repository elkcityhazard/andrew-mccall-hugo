---
title: 'Setup Virt Manager With Qemu on Arch Linux'
date: 2025-12-20
author: Andrew M McCall
description: A no nonsense guide to setting up virt-manager on Arch Linux with qemu and libvirt
summary:  A no nonsense guide to setting up virt-manager on Arch Linux with qemu and libvirt 
publishDate: '2025-12-20T11:49:17-05:00'
updateDate:  '2026-01-25T11:49:17-05:00'
images: ['/images/twitter-card.png']
draft: false
categories:
  - Computers
tags:
  - Arch Linux
  - Virt Manager
  - Qemu
---

Virt Manager and QEMU is my preferred virtual machine management sytem on
Arch Linux. 

This is a step by step guide to ge tting up and running with virt manager
and QEMU.  

1. Download Dependencies
`sudo pacman -Syu qemu virt-manager libvirt dnsmasq ebtables iptables-nft`

It will prompt you to enter a number for qemu provider, I just pick number
one. 

2. Enable the libvirtd service
`sudo systemctl enable --now libvirtd`

3. Add yourself to the `libvirt` group

`sudo usermod -aG libvirt $(whoami)`

4. Reboot the machine

5. Launch virt manager

6. File => Add a Connection

7. `QEMU/KVM`

8. Fix Video VGA driver.  You probably don't want `VGA`.  `Virtio` or `QXL` is usually
better.

You should now be able to use QEMU to setup a new virtual machine with say
a fresh Arch iso file.  

__Note:__ You may encounter an error like: `Error starting domain: Requested operation is not
valid: network 'default is not active'`.  The solutution to this is run ththe following command
`sudo virsh net-autostart default`. Then reboot your system. This will start the default network when you load up virt manager.

Enjoy.

Reach out to me @elkcityhazard@indieweb.social if you have any questions.


### Change Log
- __2026-01-25:__ Updated spelling of `iptables-nft` for 1. Download Dependencies. 
