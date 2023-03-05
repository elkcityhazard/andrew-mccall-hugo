---
title: "Unmarshaling Duplicate XML Namespaces With Golang Using Standard Library Regex Package"
description: "I ran into issues with the Go Standard encoding/xml package and how it handled duplicate XML namespaces.  Here is how I solved it with Go standard library."
date:  2023-03-04T00:00:00
updated:  2023-03-05T00:00:00
image: "/images/blog/2023/03/duplicate-xml-namespaces-1600x900.jpeg"
images:
- "/images/blog/2023/03/duplicate-xml-namespaces-1600x900.jpeg"
categories:
- Web Development
tags:
- XML
- Go
- Golang
- encoding/xml
- Go Standard Library
- Hugo
- JSON
- XML To JSON
draft: false
---

## Introducing My Problem With Hugo RSS Feed

I recently ran into an interesting issue parsing my Hugo XML feed.

Here is what the feed looks like: [andrew-mccall.com RSS Feed](https://www.andrew-mccall.com/blog/index.xml "andrew-mccall.com RSS Feed")

As you can see it has a relatively simple structure:

- rss
    - channel
        - title
        - link
        - description
        - generator
        - language
        - copyright
        - lastBuildDate
        - atom:link
        - Items
            - title
            - link
            - pubDate
            - guid
            - description


`Go` should be able to make relatively short work of this RSS feed.  

I started off creating a standard RSS type which is just a `stuct`.

The RSS Feed struct looked like this:

```
type RSS struct {
	Channel Channel `xml:"channel"`
}

type Atom struct {
	XMLName xml.Name `xml:"http://www.w3.org/2005/Atom link"`
	Href    string   `xml:"href,attr"`
	Rel     string   `xml:"rel,attr"`
	Type    string   `xml:"type,attr"`
}

type Channel struct {
	Title         string `xml:"title"`
	Link          string `xml:"link"`
	Description   string `xml:"description"`
	Generator     string `xml:"generator"`
	Language      string `xml:"language"`
	Copyright     string `xml:"copyright"`
	LastBuildDate string `xml:"lastBuildDate"`
	Atom          Atom   `xml:"http://www.w3.org/2005/Atom link"`
	Items         []Item `xml:"item"`
}

type Item struct {
	Title      string `xml:"title"`
	Link       string `xml:"link"`
	PubDate    string `xml:"pubDate"`
	Guid       string `xml:"guid"`
	Descripton string `xml:"description"`
}
```

As you can see there are several `namespaces` named `link`.  This ended up causing quite a bit of pain for me.  The `link` inside of `Item` is no issue.  Where the issue lies is in the `Channel struct`.  

If we examine the keys we have two places where we are using the `link` namespace.  In the beginning, I did not think it was going to be in issue.  After all, one `Space` is the schema for an atom link with a `Local` name of `link` and other one is just `link` with `Space` attached to it.  I thought that `xml.Unmarshal` would be able to figure this out and `unmarshal` the XML appropriately.

Unfortunately, this is what I got:

```
{
    "Channel":{
        "Title":"The Blog on Andrew McCall - Fullstack Web Developer - Traverse City, Michigan",
        "Link":"",
        "Description":"Recent content in The Blog on Andrew McCall - Fullstack Web Developer - Traverse City, Michigan",
        "Generator":"Hugo -- gohugo.io","Language":"en-us",
        "Copyright":"Copyright \u0026copy; 2021 [andrew mccall](https://andrew-mccall.com)",
        "LastBuildDate":"Sun, 29 Jan 2023 00:00:00 +0000",
        "Atom":{"XMLName":{"Space":"http://www.w3.org/2005/Atom","Local":"link"},
        "Href":"https://www.andrew-mccall.com/blog/index.xml",
        "Rel":"self",
        "Type":"application/rss+xml"
        }
// Items omitted for brevity
}

```

If you notice, `Link` is completely empty.  I believe this go-source review explains what is happening:

>All issues of 13400 which are not new functionalities have fixes. There are minor incompatibilities between them due to the handling of prefixes. Duplicating a prefix or an namespace is invalid XML. This is now avoided. XML produced is always valid.

Source: [Go Review: Google Source](https://go-review.googlesource.com/c/go/+/109855 "Go Review: Google Source")

I believe that what is happening is Go is ignoring the duplicate namespaces in the same Channel struct because it is invalid XML.

Unfortunately, the world isn't perfect and sometimes we are forced to deal with imperfect things.  

If we know for a fact that we don't need one of these RSS values, we can simply omit either `Link` or `Atom` from `Channel` and everything will work and you can `unmarshal` one of the other.  

<style>
img:not(1n).lazy:hover {
    transform: scale(1.5);
    -webkit-transform-origin: top left;
    -moz-transform-origin: top left;
    transform-origin: top left;
    -moz-transform: all 250ms ease-in-out;
    -webkit-transform: all 250ms ease-in-out;
    transition: all 250ms ease-in-out;
    cursor: crosshair;
}
</style>

__Remove ATOM__

![Remove Atom Link!](/images/blog/2023/03/xml-atom-removed-from-channel-final.png "Atom Link Removed From Channel")

__Remove Link__

![Remove Link!](/images/blog/2023/03/xml-atom-removed-from-channel.png "Link Removed From Channel")

## How I Solved The Duplicate Namespace Issue

```
stringToTransform := string(body)

        // Regex all XML links

		re := regexp.MustCompile(`(<link>)(https?:\/\/)(w?w?w?\.?)([a-zA-Z0-9-\.\/]*.)(</link>)`)

        // do a regex replace all keeping in mind the result is a copy of the original

		transformed := re.ReplaceAllString(stringToTransform, `<siteLink>$2$3$4</siteLink>`)

        // unmarshal the transformed string

		err = xml.Unmarshal([]byte(transformed), &rss)

		// err = xml.Unmarshal(body, &rss)
		if err != nil {
			log.Fatalln(err)
		}
```

A Custom XML Unmarshaler could certainly solve this problem I feel.  That being said, I am personally not at the point where I feel like I could implement a custom xml marshaller.  That being said, I didn't want to reach for a third party.  As Rob Pike says, "a litte copying is better than a little dependency".  So I thought how could I solve this issue with the duplicate `link` namespaces.  

I decided to simply clone the XML payload as a string and use `regexp.ReplaceAllString`. Since the `atom:link` and `link` are in the `Channel` struct, I don't need to worry about the `Item struct` because it is out of scope.  Since I know the `Space` of the `atom:link` I elected to just keep that unchanged since atom is a standard.  

So once I made a copy of the original payload as a string, I just made a simple regex rule to parse all `<link>...</link>`.

It than replaces all instances with `<siteLink>...</siteLink>`.  I then use regex capture groups to pass back in the original RSS statement information to the new RSS property.  

I think simply pass in the copied string, which has replaced all instances of the regex max to the unmarshaller.  

This allowed me to change the `namespace` of the `link` to `siteLink` which made it so there was no longer duplicate `namespaces` in the `Channel` struct.  I was then able to get all the information from the RSS payload.  


## Finished Code Example To Handle Duplicate XML Namespace With Golang

```
package main

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io"
	"log"
	"net/http"
	"regexp"
)

type RSS struct {
	Channel Channel `xml:"channel"`
}

type Atom struct {
	XMLName xml.Name `xml:"http://www.w3.org/2005/Atom link"`
	Href    string   `xml:"href,attr"`
	Rel     string   `xml:"rel,attr"`
	Type    string   `xml:"type,attr"`
}

type Channel struct {
	Title         string   `xml:"title"`
	Link          []string `xml:"siteLink"`
	Description   string   `xml:"description"`
	Generator     string   `xml:"generator"`
	Language      string   `xml:"language"`
	Copyright     string   `xml:"copyright"`
	LastBuildDate string   `xml:"lastBuildDate"`
	Atom          Atom     `xml:"http://www.w3.org/2005/Atom link"`
	Items         []Item   `xml:"item"`
}

type Item struct {
	Title      string `xml:"title"`
	Link       string `xml:"siteLink"`
	PubDate    string `xml:"pubDate"`
	Guid       string `xml:"guid"`
	Descripton string `xml:"description"`
}

func main() {

	var rss = RSS{}

	client := &http.Client{}

	req, err := http.NewRequest(http.MethodGet, "https://www.andrew-mccall.com/blog/index.xml", nil)

	if err != nil {
		log.Fatalln(err)
	}

	resp, err := client.Do(req)

	if err != nil {
		log.Fatalln(err)
	}

	if resp.Body != nil {
		defer resp.Body.Close()

		body, err := io.ReadAll(resp.Body)

		if err != nil {
			log.Fatalln(err)
		}

		stringToTransform := string(body)

		re := regexp.MustCompile(`(<link>)(https?:\/\/)(w?w?w?\.?)([a-zA-Z0-9-\.\/]*.)(</link>)`)

		transformed := re.ReplaceAllString(stringToTransform, `<siteLink>$2$3$4</siteLink>`)

		err = xml.Unmarshal([]byte(transformed), &rss)

		// err = xml.Unmarshal(body, &rss)
		if err != nil {
			log.Fatalln(err)
		}

		http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(rss)
		})

		err = http.ListenAndServe("127.0.0.1:8080", nil)

		log.Fatalln(err)
	}

}

```

## Conclusion

Again, I might explore writing a custom xml.Unmarshaller later down the road. But at that point, why not use a library?  It is always best to try and stick with the standard library.  Like Rob Pike says, it is always best to do a bit of copying instead of bring in another dependency.  

I hope this helps you solve this minor `encoding/xml` unmarshalling issue and gets you moving forward without adding another dependency to your project.  

