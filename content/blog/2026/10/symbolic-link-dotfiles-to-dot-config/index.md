---
title: 'Symbolic Link Dotfiles to Dot Config Folder Using Git'
date: 2026-10-31
author: Andrew M McCall
description:  A short note on keeping a git repo of your dotfiles and linking them into your .config folder for Linux users.  
summary:  Covers setting up a git repository, creating and IdentityFile, and managing your dotfiles using git.  
publishDate: '2026-10-31T09:51:42-04:00'
updateDate:  '2026-10-31T09:51:42-04:00'
images: ['/images/twitter-card.png']
draft: false
categories:
  - Linux
tags:
  - .Config
  - Dot Files
  - Config
---

My admittedly older dotfiles live at
[github.com/elkcityhazard/archconfigs](https://github.com/elkcityhazard/archconfigs "External Link: github.com"). Every time I setup a new Unix-like system i.e., Linux I have a need to reconfigure my `.config` directory for my personalized configurations. 

This assumes that you know how to create a git repo, and push files to git.  

## Setting Up Git For Dotfiles

Make sure you have git installed: `git --version`.  If not, refer to your
operating systems guide for installing git. Here are a few examples: 

```bash
# pacman
sudo pacman -S git
# dnf
sudo dnf install git
```

If you already have an existing config directory you might want to try copying
it:

```bash
mkdir -p ~/Dotfiles
cp -r ~/.config/* ~/Dotfiles/
cd ~/Dotfiles
git init && \
git add . && \
git commit -am "first commit" && \
git remote -v && \
git remote add origin git@github.com:{yourgitusername}/your-git-repo.git
```

Note if an existing remote exists we can update it with:

`git remote set-url origin git@github.com:{yourgitusername}/your-git-repo.git`

For convenience, I usually like to setup an IdentityFile.  This is in the event
I work on vendors, clients, or my own employers work on any computer I choose.  

```bash
mkdir -p ~/.ssh/github && \
ssh-keygen \
-C "emailaddr@hostname.com" \
-f ~/.ssh/github/id_ed25519 \
-N securepasskey
```

## Add an Identityfile to let git know what ssh key to use

If it doesn't already exist, create the file: `mkdir -p ~/.ssh && touch ~/.ssh/config`.

Update the text file with the following lines:
```sh
Host github.com
    Identityfile ~/.ssh/github/id_ed25519
    IdentitiesOnly yes
```

Alternatively, you can also create a custom alias:

```sh
Host github-alt.com
    Hostname github.com
    User git
    Identityfile ~/.ssh/github/id_ed25519
    IdentitiesOnly yes
```

## Verify The Git IdentityFile Connection

`ssh -T git@github-alt.com` or `ssh -T git@github.com`

Depending on what route you took you should see a message like:

> Hi {username}! You've successfully authenticated, but Github does not provide
> shell access. 

If all is working, you can start cloning your repos with either your custom
location or your custom alias. 

`git clone git@github.com:elkcityhazard/archconfigs.git`
or
`git clone git@github-alt.com:elkcityhazard/archconfigs.git`.

Of course, if we don't already have a repo then we need to push it up to the
remote:

```bash
git add .
git commit -am "my first dotfile commit"
git push -u origin main
```

## Symbolic Link Dotfiles to $XDG_CONFIG_HOME Directory

Now we have a clean way of cloning our repo into our newly created ~/Dotfiles
directory.  

The next thing we need to do is link our config files:

```bash
for item in ~/Dotfiles/*; do
    ln -s "\$item" ~/.config/(basename "item")
done
```

This works, but isn't completely ideal.  When things update you need to
go through a process to unlink everything. 

This would look similar to our linking script but we would replace the
action with `unlink ~/.config/$(basename "$item")`. 

## An Alternative To Manual Linking: Stow

[GNU Stow](https://gnu.org/software/stow/ "External Link: GNU Stow") is free
software designed to fix this exact problem.  

It manages all of this messy process for us so we can think less strenuously
about managing our config files.  

To get started we need to install stow.  

```bash
sudo dnf install stow
```

Navigate to your `~/Dotfiles` and run 
```bash
mkdir -p config/.config
shopt -s extglob
mv !(config) config/.config/
stow config
```

The `--adopt` flag can help you absorb existing local configurations into your repository. However, if you want your repository versions to completely overwrite existing system variations, you will run into conflicts such as `WARNING! stowing config would cause conflicts:`.

In that case, you just need to either remove or create backups of the existing conflicting target files in your home directory. For example:

```bash
rm ~/.config/alacritty/alacritty.toml
# OR
mv ~/.config/alacritty/alacritty.toml ~/.config/alacritty/alacritty.toml.bak
```
Once these are removed or backed up, you can run `stow config` without flags and your repository files will link to the system.

## Making Updates

On the current machine, we make updates as needed directly to the linked files and push them to the repo. Nothing needs to be updated with Stow because the files are live symlinks. After you make changes to your config, you would do the following: 

```bash
cd ~/Dotfiles
git add .
git commit -m "Update alacritty config"
git push
```

If you want to add a new program config file, you can manage it as its own package folder:

```bash
mkdir -p ~/Dotfiles/tmux/.config/tmux
mv ~/.config/tmux/tmux.conf ~/Dotfiles/tmux/.config/tmux/
cd ~/Dotfiles
git add .
git commit -m "Add tmux package config"
git push -u origin main
stow tmux
```

The reason this matters is because when you go to another machine, your workflow becomes straightforward: 

```bash
cd ~/Dotfiles
git pull
stow --restow config tmux
```

## Conclusion

I am hoping this makes my experience managing my own git easier.  I liked the
simplicity of using a bash for loop but I found it was not quite as
maintainable.  I am still learning the ins and outs of stow but I can see the
power and flexibility it offers for maintaining UNIX-like dotfiles.

