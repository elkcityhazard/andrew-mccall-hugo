---
title: 'Why I Dont Recommend Getflywheel or Wpengine for Most Wordpress Hosting'
date: 2024-07-20T13:25:28-04:00
author: Andrew M McCall
description: An explanation on why managed Wordpress hosting like GetFlywheel & WPEngine isn't always the best choice and what to do instead. 
summary:  I explain my experience working for an agency that uses GetFlywheel and WPEngine for Wordpress Hosting
publishDate: 2024-07-20T13:25:28-04:00
updateDate:  2025-03-08T17:54:28-04:00
draft: false
categories:
  - Web Development
tags:
  - Hosting
  - Wordpress
  - PHP
  - VPS
---

## TL;DR  Summarizing  Why I don't recommend getflywheel.com or wpengine.com

- [WP Engine is not WordPress](https://wordpress.org/news/2024/09/wp-engine/ "WP Engine is not WordPress")
- Shared hosting runs out of resources easily and often
- Local By Flywheel is pretty clunky these days
- Server is locked down, unable to customize nginx, install any 3rd party
  software
- Caching changes need to have a support ticket
- You have to pay for server side automatic updates for plugins (3 lines of
  code in crontab)
- Expensive compared to alternatives that are just as fine and dandy
- 500 errors due to constrained resources
- Nagging sales emails

I am sure there are many flywheel hosting reviews out there who can point out some very convenient features of flywheel hosting.  This is meant to be more of a reflection on my own experience using flyhweel web hosting services.  To provide some perspective, the current agency I work for uses both Flywheel and Kinsta for Wordpress hosting.  These were set up well before my time, and at first, I really didn't have a problem with them.  After all, there are many convenient features such as easy local development syncs, daily backups, and genuinely decent customer support.  

So what could possibily be wrong?  It really comes down to my own preference.  Let me just highlight areas that I have had difficulties or raised issues with.  

## Flywheel Web Hosting Is Just Shared Hosting Unless You Ask

At the end of the day, hosting services like Flywheel and WPEngine are businesses that want to make money.  To achieve this, like many other hosting companies, the lower plans stuff as many clients as possible on the same server.  For low traffic websites, this isn't a huge issue.  But as site traffic grows, we can quickly run into resource allocation limits.  Internal Server Errors due to php memory overflow and other customers having spikes in their traffic have often caused performance issues with sites in our own account.  

Flyhweel is exceptionally stingy when it comes to allocating additional resources to your websites.  The process often involves waiting in the chat queue, talking to someone, trying to explain the same problem to a new person, getting them to allocate a few extra resources, then waiting until it happens again.

This resource contstraint has often caused plugin and core Wordpress updates to fail as well, which means being stuck in the process of trying to update, failing, then finally realizing you need to reach out yet again to Flyhweel to get additional Resources.  

At first, I thought these were anomolies, but now that I have worked with them for well over a 2 years, the problem continues to crop up consistently.  

## Flywheel & WP Engine Cost More, But It May Be Worth It To You

The __X Factor__ for Flyhweel and WP Engine is their customer support. To be fair, it has been quite good and this may be worth it to you, but not necessarily to me.  

Flywheel and WP Engine seem to target a group of agencies that just don't have the capacity or understanding to manage servers for clients.  This means Flywheel & WP Engine abstract a lot of things away.  For example, as a client, you have no ability to edit your nginx config.  This is something you need to ask the customer service chat agent to do for you.  

There is no ability to install additional software on your server or use `sudo`.  This actually makes my job more difficult because a lot of things can be solved having full access to the server.  

Conversely, less experienced developers, this can be a bonus feature since it leaves the burden of server maintenance on Flywheel or WP Engine.  This leads me to my next point.

## Less Customization Of The Server

Making nginx configs are behind a walled garden that only customer agents can help you change.  I will say their redict tool is very convenient, but I have needed to make nginx configuration changes and their support can be hit or miss in terms of understanding the requests, or having the skill to make the changes themselves. 

## Flywheel & WPEngine Caching Can Be Very Stubborn

Especially when it comes to the staging environments, the caching can be a little intense.  Often times when you want to a show a client some website change, they have difficulty viewing it because they don't understand the details of caching.  Pages can appear broken, site's can just not load, and almost always due to stale cache being served.

## Random 500 Internal Server Errors

At our agency, resources get very constrained which causes sites to crash
periodically.  

## You Have To Pay For Automatic Plugin Updates

If we manage our own server, we can easily utilize tools like systemd, crontab, and wp-cli to manage our Wordpress installation.  On my own projects, I simply set up a systemd service torun `wp plugin update --all' on a weekly basis.  This has pretty much never failed me, except the occasional need to roll back a plugin version which is also very easy.  

Flywheel doesn't let you add anything to the system services or crontab.  To achieve this using their service, you have to pay $5 USD per website to have your plugins set to update server side.  

On 25 sites, that adds up very quickly each month.  A better solution is to easily log in to your server and set up a crontab or system service.  

## Automatic Plugins Rollbacks can be annoying

- Recently, a plugin was not getting the minimum required PHP version.
  Instead of updating all of the plugins it could, it reverted them all.
  This is really annoying. We don't always have time to upgrade PHP and
  check the site thoroughly.  A better behavior would be to continue
  upgrading the ones that it can and send an email.  Instead, you do get an
  email, but none of the updates move forward.  

  If you aren't able to update the php version quickly and check your
  theme, this means either having to SSH into the server to run `wp plugin
  update --all` or using the WordPress admin dashboard to do these
  manually.

## Large Sites Cause Syncing Issues

The Local Development Tool has many positive attributes and it has never been easier to set up a local Wordpress development environment using it.  For small sites, it is almost always all one needs to have an efficient and positive Wordpress development experience.  That being said, many of our clients have older and much larger websites.  Once the database tables increase in size to the 30GB plus range, Local By Flywheel tends to struggle.  Pulling and pushing sites tends to take an inordinately long time; sometimes it will even take up an entire mornining to pull down the site from localhost.  

For these sites, I almost always resort to rsync because it is simply more efficient at processing the large amount of data.  

If you are interested in syncing a Wordpress site locally, I suggesting reading up on this excellent tutorial: [How To Clone A Wordpress Website With WP-CLI and Rsync](https://permanenttourist.ch/2021/02/how-to-clone-a-wordpress-website-with-wp-cli-and-rsync/ "How To Clone A Wordpress Website With WP-CLI and Rsync")

## Where to host instead of Flywheel or WP Engine?

I think the most important thing to take away is that Wordpress is more resource intensive than folks tend to understand.  Cheap hosting does a disservice to your business because they are often on over-taxed servers with limited resources.  

If you don't know how to set up a virtual private server, I think the best thing you can do is pay someone to setup and maintain your server for you.  Having a dedicated server for your business is always going to be the best in the long run.  Being a steward of your own data, and having the full availability of your server resources, is going to give your website the best chance at providing a good user experience.  In the age of bloated site builders, bloated ad tech, spyware, and large Wordpress plugin payloads, Wordpress websites need all of the resources you can afford.  

I have a tutorial on setting up your own [virtual private server](/blog/2022/05/vps-hosting-security-ubuntu-20-04/ "Virtual Private Server Tutorial - Setup and Secure").  I can also note that services such as Linode have great one click installs for Wordpress that are really quite affordable.  

I personally use Hetzner cloud which has been working pretty well for me.  Heztner has shared and dedicated hosting as well.  What I can say about their shared vps hosting is that I feel like they do a bit better job at allocating resources and not stuffing as many customers on to one bare metal server.  Additionally, when you use a virtual private server, you can install whatever you want on that server and have full access to your data.  

I use tools like wp-cli and rsync to make syncing changes back and forth easier, and I have even configured github actions to actually sync the site for me from local to the server.  

In conclusion, I think Flywheel and WPEngine serve their purpose.  If you are looking for a very hands-off approach to hosting Wordpress sites, they may be for you.  But after working with them for over 2 years, I have run into a few too many issues that have made me decide to move to a self hosting platform to make my own personal workflow easier.  


### Additional WordPress Articles By Me

- [WordPress Self Hosted - A Guided Tour To Running WordPress Independent Of Big Hosting](/blog/2024/12/wordpress-selfhosted/ "Self Hosting WordPress: My Guide To
  Running WordPress Independent Of Big Hosting")
- [Import Content From Hugo Into Wordpress](/blog/2024/08/importing-content-from-hugo-into-wordpress/ "My quick and dirty experience with migrating a Hugo website to WordPress")

