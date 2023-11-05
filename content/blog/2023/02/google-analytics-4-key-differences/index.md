---
title: "Google Analytics 4: Key Differences From Universal Analytics"
description: "My Notes From Google Skillshop Course on Google Analytics 4 On The Differences Between GA4 and Universal Analytics"
date:  2023-02-09T20:44:47-05:00
updated:  2023-02-09T20:44:47-05:00
image: "/blog/2023/02/google-analytics-4-key-differences/ga-4-key-differences.jpeg"
images:
- "/blog/2023/02/google-analytics-4-key-differences/ga-4-key-differences.jpeg"
categories:
- SEO
tags:
- Digital Marketing
- Google Analytics 4
- Google Analytics
- Universal Analytics
- 
- 
draft: false
---

# Google Analytics 4 vs Universal Analytics: A Comparison

- __Measurement__: Universal analytics measurement is session-based while Google Analytics 4 has a flexible event-based data model.  
- __Reporting__: Universal Analytics has limited cross-device and cross-platform reporting whereas Google Analytics 4 has greater support for full cross-device and cross-platform reporting.  
- __Automation__: Universal Analytics properties have limited support for automation.  Google Analytics 4 supports machine learning throughout to improve and simplify insight discovery.  

## What is An Audience?

an audience is simply a set of defined users based on attributes that are essential to your business. Some examples include: users that have already engaged with your brand or products, users shopping for a laptop computer or headphones, fans of anime and manga.  These would all comprise audiences in Google Analytics 4.   One of the advantages of Google Analytics 4 is that you have greater options in defining your audiences and segmenting users.  

One key addition is that if you assign Id's to users when they sign up on your website, you can actually pass those Id's on to GA4 to help define your audiences based on IDs that are sent to GA4.  

## Some Advanced Features That GA4 Makes Available

- **Explorations**: A useful tool that allows for an advanced discovery of insights about your users.
- **BigQuery Export**: Export analytics data to BigQuery to be saved securely in the cloud, and be able to combine it with other data sets and run queries against it.  


## Google Analytics 4: How It Collects & Processes Data

> The new way Analytics collects and stores data enables many of the benefits of the latest Google Analytics experience. Rather than using a session-based model, which groups user interactions within a given time frame, it uses an event-based model, which processes each user interaction as a standalone event.

Source: [Google Skill Shop](https://skillshop.exceedlms.com/uploads/resource_courses/targets/928607/original/index.html?_courseId=66663#/page/620f7224596b180cd13aa53d "Google Analytics 4 Skill Shop Course")

### Session Based Model

Analytics groups data into sessions and these session are the foundation for all reporting.  A session is as group of user interactions with your website that take place within a given timeframe (usually the time they are on the site).

### The Event Based Model

In GA4, you can still see session data, but Analytics collects and stores user interactions with your website or app as events.  Events provide insight to users' action on your website such as clicking, scrolling, downloading.  

Events have the ability to send information that gives a better understanindg  of the context of the event or actions of the user. This data includes value of purchase, geography, and what page someone may have visited.  

### Benefits Of An Event-Based Model

- More Flexible and Scaleable
- Perform a greater depth of calculations, faster
- The event based data model consistently measures events across platforms and provides a richer insight experience for digital marketers


### Basic Interactions Automatically Recorded

The first time a user visits your website the property will log "first visit" event

`Enhanced Measurement` can be enabled to automatically collect more events without adding code to the website.  

**Enhanced Measurements** allow us to measure common web events such as:

- pageview
- scrolls
- file downloads
- video views



## Identity Spaces In Google Analytics

While trying to understand user journeys, GA4 allows several different user identifiers.  Thse include user IDs that you assign to your user when the login, Google signals, and device ID.  These groups are called identity spaces.  


- **User-ID**: If you create your own persistent IDs for signed-in users, you can use this data to accurately measure user journeys across devices. To enable the User-ID feature, you must consistently assign IDs to your users and include the IDs along with the data you send to Analytics.
- **Google Signals**: Google signals uses data from users who are signed in to Google. With Google signals enabled, Analytics associates event data it collects from users on your site with the Google accounts of signed-in users who have consented to sharing this information.
Enabling Google signals is very simple. You don’t have to make modifications to your website or app to get started with this feature — just turn it on!
- **Device ID**: Analytics can also use device ID as an identity space. On websites, the device ID comes from the user’s browser. On apps, the device ID comes from app-instance ID. You don't need any further setup in Google Analytics to use device ID. 

### Identity Spaces In Universal Analytics Properties

In UA properties, reporting relies heavily on device ID.  A few reports can use the Google signals.  In UA, if User-ID is turned on, the data is reported separately from the rest of your data and cannot be integrated with other identity spaces.  Because identity spaces work separately in UA, it is harder to measure user journeys across devices and de-duplicate users in UA properties.  

### Identity Spaces in GA4 

GA4 processes data using all available identity spaces.  First, GA4 looks for User-Id because this feature uses data you collect.  Next it tried Google Signals and if that doesn't match it relies on device ID.  Since this is collected concurrently, GA4 can create a single user journey from all the associated data and, because these identity spaces are used in all of the reports, it is easier to de-duplicate users and track their journey across devices. 

>When you only have access to one identity space, like device ID, a single person could appear as a different user every time they interact with your business on a different device. But when you use multiple identity spaces, you can get better insight into user journeys, with more robust cross-device and cross-platform data and reporting that reflects de-duplicated users.

Source: [Google Analytics 4 Skill Shop Course](https://skillshop.exceedlms.com/uploads/resource_courses/targets/928607/original/index.html?_courseId=66663#/page/620f7224596b180cd13aa53d "Get Started Learning Google Analytics 4")

GA4 allows you to see how many unique users you have no matter what platform they use and see how many conversions occurred on your app and website last week and which is contributing the most.  

You can also see things such as how many people started on your app but visited your website to make a purchase.  


## Key Takeaways

- With GA4 properties, it’s easy to create new audiences, and you have more options when defining and segmenting these audiences.
- GA4 properties collect and store user interactions with your business as events instead of sessions. This allows Analytics to be more flexible and scalable, and to perform more custom calculations, faster. 
- GA4 properties combine the use of several different user identity spaces. This gives better insight into user journeys, with more robust cross-device and cross-platform data and reporting that reflects de-duplicated users.


## Get to Know Google Analytics 4 Properties

>How reporting and analysis work in Universal Analytics properties: Historically, Google Analytics organized your data into predefined reports, designed to reveal valuable insights. As more features became available in Analytics over time, more and more new reports became available to cover these new use cases, until there were dozens of available reports.  If you’ve used Analytics in the past, you may have noticed that you can customize these predefined reports to an extent with Custom Reports. But if the information you’re looking for isn't available in any of the existing reports, you may have difficulty finding the insight you’re looking for.

>In GA4 properties, reporting is simplified. Instead of a very long list of predefined reports that try to cover every use case, a handful of overview reports each cover a single insight about your business in a summary card, like "What are your user demographics?" If you want to go deeper, you can drill into a more comprehensive report by selecting the link at the bottom of each summary card. This experience gives you more flexibility and can provide you with deeper insights.


Note: material for this post can be found easily by signing up for Google Skillshare: [Google Skill Shop](https://skillshop.exceedlms.com/uploads/resource_courses/targets/928607/original/index.html?_courseId=66663#/page/620f7224596b180cd13aa53d "Google Analytics 4 Skill Shop Course")




