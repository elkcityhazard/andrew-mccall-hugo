---
title: How To Host A Static Website For Cheap On Bunny CDN
date: 2020-10-28 00:00:00 Z
image: images/blog/underwater-cable-map-1200-600.svg
tags:
- web hosting
description: This is meta description.
draft: false
---

## How To Host A Website On BunnyCDN

We all want our web hosting to be as cheap as possible, especially when we are starting out. Often, many aspiring developers turn to shared hosting solutions to program their first static sites. This is convenient because in the beginning most developers struggle with basic tasks like connecting through ftp and uploading their site. As we progress, however, we begin to realize the limitations of shared hosting such as resource sharing and slow responses during peak times. This is when we start exploring other options available to us.

## BunnyCDN Hosting

As the web has grown the limitations of the world wide web have becoming apparent. As more businesses began relying on the internet as a core part of their business there needed to be away to transcend the limitations of the internet.


For example, let us assume that this fictional page is being stored somewhere on a server in Argentina. For those in Argentina the page will most likely load quite quickly because the data has very little distance to travel. Now, let us suppose someone in Russia is requesting this fictional page. The data is requested and then it travels the cable network until it reaches the destination which introduces latency along the way. Because of geographical distance the content is delivered at a much lower speed to the end user.

## How A Content Delivery System Solves The Geo Location Problem

Content Delivery Networks distribute content evenly throughout the world

To solve the problem content delivery networks started popping up to distribute content evenly throughout the world. Essentially content is hosted on an origin server and then mirrored on several cdn nodes throughout the world to put the content closer to the end user. This can help solve a very important problem for website owners: making sure your website is fast! Of course, this is not the only optimization you need to make to have a fast website but that is for another time.

## How To Host Your Site Completely On A CDN

This example uses bunnyCDN but you can do this with other cdn’s as well.

### Set Up Storage Zone and Pull Zone

In the main admin panel you need to first create a storage zone. You can name this whatever you want for example: my-new-domain. I do not include www or .com in this storage zone.

Once the storage zone is created you need to link it to a pull zone. There will be a link after you create the storage zone that is labeled “Connect Pull Zone”.

once you click on that link you will be brought to a page to set up the pull zone. fill out the default hostname with whatever name you like, for example: my-new-domain.b-cdn.net.

Now you have a storage zone set up with a pull zone connected to it.

### Set Up Edge Rules For Custom Domain Name

Go to your edge rules and click on add new edge rule.

The action will be **Set Request Header**

The condition matching will be **Match Any**

The conditions will be **If Request URL Match Any ***

click save edge rule.

### Add the Custom Hostname

Now go back to your pull zone and click on the pull zone you want to work with. Next, add a new hostname. This is the one that I make into the domain name I want to use: for example: my-new-domain.com

Now you need to have access to your DNS records for your domain. You will go to the website where you registered your domain because you need to make a custom dns record.

I will use a website like https://ip-lookup.net/ to find the public ip address of my cdn. For Example: https://my-new-domain.b-cdn.net. Once you get the IPv4 public address you need to go back to your dns provider and make a new dns record.

Ideally you will have a dns provider that supports cname flattening. This will make it easier to get set up with your ssl cert in the end but I was able to get it working by making an a record to my cdn ip address.

The next step is to activate your ssl and enforce it then purge your cache.

#### Final Thoughts On BunnyCDN Hosting

I was able to get this up and running with pointing an a record to the public ip address. It is my understanding that the ideal is to use a cname which only works at Top level domains with cname flattening. I’m not sure what is going to happen if I leave it like this but it is a consideration since it isn’t 100% correct.