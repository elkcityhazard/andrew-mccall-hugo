---
title: Install Hugo With Chocolatey Package Manager On Windows 10 [video]
date: 2022-06-20 
image: "/images/blog/2022/install-hugo-windows-10-chocolately.jpeg"
images:
- "/images/blog/2022/install-hugo-windows-10-chocolately.jpeg"
categories:
- Web Development
tags:
- hugo
- static website generators
- golang
Description: Installing Hugo on Windows is really quite simple with Chocolately Package
  Manager.   This video will explain the process of installing Hugo on Windows 10.
draft: false
---

Installing [Hugo](https://gohugo.io "Hugo - The World's Fastest Website Generator") on Windows is easy with [chocolately package manager](https://community.chocolatey.org/ "Windows 10 Software Package Manager").

<iframe id="odysee-iframe" width="100%" height="315" src="https://odysee.com/$/embed/install-hugo-on-windows-10-chocolately-package-manager/1e56233689c0aa6ae056c04611e2b09ad7035178?r=HADqujT6idtBaZKLwMq9UWNb6LbwVV2z" allowfullscreen style="max-width: 100%; margin: 1em auto;"></iframe>

For those who are not familiar, Hugo is a static website generator that can help you manage blazing fast static websites with minimal effort.  

If you are on Windows, installing Hugo is easy using Chocolately Package Manager.  Here are the steps we take.

## Directions To Install Hugo on Windows 10 With Chocolately Package Manager

1. Navigate to [chocolately package manager](https://community.chocolatey.org/ "Windows 10 Software Package Manager")

2. Click the ["install"](https://chocolatey.org/install "install chocolately package manager") link which is located at the top right hand corner next to the light/dark toggle.

3.  Select `individual` install method

4. Open up an elevated administrator instance of Windows Powershell.  To accomplish this, the fastest way is to press the Windows key which will open up the start menu.  Start typing `Powershell`.  Next, you will need to right-click on Windows Powershell and select `Run As Administrator`

5.  Next we will need to check the `Execution Policy`.  This is as simple as copying and pasting the following line into the elevated Powershell: `Get-ExecutionPolicy`

The related section from the official installation documentation says the following:

>Run `Get-ExecutionPolicy`. If it returns `Restricted`, then run `Set-ExecutionPolicy AllSigned` or `Set-ExecutionPolicy Bypass -Scope Process`.

Once the Execution Policy is set all we need to do now is actually install chocolatey:

> Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))


Once you paste the text into Powershell, press `Enter` and wait a few moments for it to install.  Once the script has executed all that is left is to type `choco` to verify that Chocolately is now installed. 

6.  Once that is completed, we can get on with installing Hugo.  To  do that simply type `choco install hugo -a`.  This will automatically download the latest release of Hugo and the flag `-a` says to Chocolately to go ahead and install the package (you can manually confirm this by ommiting the -a flag).

7.  Once the package has installed, simply type `hugo version` to verify the installation.


This article is part of a series on how to create a Hugo website from scratch.  Read the original article here: [How To Create A Hugo Website From Scratch: An Overview](/blog/hugo-website-tutorial-how-to-create-a-hugo-website-from-scratch/ "How To Create A Hugo Website From Scratch")

