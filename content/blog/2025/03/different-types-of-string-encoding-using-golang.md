---
title: 'Different Types of String Encoding Using Golang'
date: 2025-03-30
author: Andrew M McCall
description: snippets and notes on various string encodings in Golang
summary: Notes regarding string encoding in golang
publishDate: '2025-03-30T15:33:43-04:00'
updateDate:  '2025-03-30T15:33:43-04:00'
images: ['/images/twitter-card.png']
draft: false
categories:
  - Web Development
tags:
  - Golang
  - String Encoding
---

## Base32 Standard Encoding To String with No Padding


This will yield a 26 character length encoded string with no padding using
base32 encoding.  

```
b := make([]byte, 16)

	_, err := rand.Read(b)

	if err != nil {
		log.Fatalln(err)
	}

	str := base32.StdEncoding.WithPadding(base64.NoPadding).EncodeToString(b)

	fmt.Println(str[:])

    //sha256 hash
    hash := sha256.Sum256([]byte(str))

    // store in database as hash[:]

```



## Base64 Standard Encoding To String With No Padding

Yields a 22 character long string encoding with no padding:

```
b := make([]byte, 16)
	_, err := rand.Read(b)
	if err != nil {
		log.Fatalln(err)
	}
	str := base64.StdEncoding.WithPadding(base64.NoPadding).EncodeToString(b)
	
    // hash
    hash := sha256.Sum256([]byte(str))

    // store in database as hash[:]
```


