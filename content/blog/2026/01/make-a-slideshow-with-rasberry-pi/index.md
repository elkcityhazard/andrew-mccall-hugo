---
title: 'Make a Slideshow With Rasberry Pi'
date: 2026-01-04
author: Andrew M McCall
description: "I explain how to make a simple photo slideshow using an old Raspberry PI 3B+."
summary: "This is my instructions for how to create a fast and easy photo slideshow using a raspberry pi 3B+ and an old television."  
publishDate: '2026-01-04T21:05:24-05:00'
updateDate:  '2026-01-04T21:05:24-05:00'
images: ['/images/twitter-card.png']
draft: false
categories:
  - Projects
tags:
  - raspberry pi
  - feh
  - bash
---

## Right to the point instructions

## What You Need
- An old Raspberry PI - I used a 3B+
- A spare sd card to install OS on
- A spare thumb drive with photos
- Raspberry Pi Imager
- An old TV - I have an old roku tv
- A few minutes of time.

## How to create a simple slideshow using FEH on the Raspberry PI 3B+

1. Format your SD Card using your preferred method
2. Download Raspberry PI Imager
3. Install whatever OS you want to work with. I just used the stock
   Raspberry PI OS
4. Boot into your PI.
5. Open up `Terminal` `sudo apt update && sudo apt upgrade -y; sudo apt
   install feh`
6. `sudo fdisk -l` to find your drive it will usually be something like
   `/dev/sda1` for the the partition
7. `sudo blkid` or `sudo blkid /dev/sda1 -s UUID -o value`. __Note:__ You could use `PARTUUID` if you wanted.
8. `sudo vim /etc/fstab`
9. add to end of fstab like `UUID={uuid} /media/picture ext4 defaults 0 2`
   save and exit.
10. `sudo mount -a` to remount
11. create a bash script in say `/home/pi/scripts/slideshow.sh`
12. create script 
```
#!/usr/bin/env bash
PICTURE_DIR="/media/pictures"
exec feh -F --hide-pointer -z -R 20 "$PICTURE_DIR" 
```
What this does:
- executes feh in the `PHOTO DIR`
- hides the pointer
- displays in full screen mode
- display photos recursively if photos are sub directories
- randomizes
13. save the script and make sure to make it executable `chmod +x /home/pi/scripts/slideshow.sh`
14. Add this desktop entry to `/home/pi/.config/autostart/slideshow.desktop`:
```
[Desktop Entry]
Type=Application
Exec=/home/pi/scripts/slideshow.sh
Hidden=false
X-GNOME-Autostart-enabled=true
Name=Photo Slideshow
Comment=Start photo slideshow at boot

```

15. Since the script is in the autostart folder, it should start up without
    issue.

## Reutilizing an old Raspberry Pi 3B+

I had one sitting around.  They are still completely capable server
only machines, but I haven't had much of a use case for this one particular
unit.  Over the holiday, I found a thumb drive with our wedding photos on
it.  Because I had some extra time, I decided to dig outthis raspberry pi
and an old 720p Roku tv and see what I could come up with.  

Initially, I was going to create a simple web app using something like Hugo
or Eleventy.  That would be overkill.  Then I got an idea to just use FEH,
a command line application that displays photos.  

I won't re-hash the script here.  I will explain my process.  Writing the
bash script was the easiest part.  FEH is well documented using `man feh`.
The major challenge to the project was getting it started.  My first
attempt was writing a systemd service.  This went in
`/etc/systemd/system/slideshow.service`.  Unfortunately, no matter what I
did, I couldn't get this to work. I tried setting `DISPLAY=:0` but to no
avail, I could not get it to start.  

I think it would have worked if I moved my systemd service to the user
space instead of the system space, but while I was researching, I realized
that you can put desktop entries into `~/.config/autostart` folder and pi
will handle starting it for you.  I created the following desktop entry:
```
[Desktop Entry]
Type=Application
Exec=/home/pi/scripts/slideshow.sh
Hidden=false
X-GNOME-Autostart-enabled=true
Name=Photo Slideshow
Comment=Start photo slideshow at boot

```

When I rebooted, my slideshow started playing without issue and it has now
been running for over 3 days.  


