---
title: 'Golang Check for Mysql Duplicate Key Error'
date: 2025-03-29
author: Andrew M McCall
description: A code snippet for checking mysql errors by code so you can better handle errors such as duplicate entry for key errors
summary:  In short, we cast the error to a Mysql Error and check the code
publishDate: '2025-03-29T19:49:07-04:00'
updateDate:  '2025-03-29T19:49:07-04:00'
images: ['/images/twitter-card.png']
draft: false
categories:
  - Web Development
tags:
  - Golang 
  - Mysql
  - Error Handling
---

## Golang: Duplicate Key Error problem

We don't want to let potential bad actors know that keys such as "email"
already exist in the database.  

We often set the email key as a unique value in mysql.  If you try and
insert a user with the same email address you might get a message that
looks like this:

`time=2025-03-29T07:46:26.100-04:00 level=ERROR msg="Error 1062 (23000): Duplicate entry 'bob@example.com' for key 'email'"`

The problem with this is that now a bad actor knows we have a user in our
database with the email value of `bob@example.com`. 

Often times in API development, we return appropriate errors based on the
error message. In this case, this would be detrimental to our security
efforts because it is exposing some key data about a user in our database.  

So what can we do?  

## How to obfuscate duplicate key entry in Golang using mysql database

The error thrown is of type error which doesn't know about the `MySQLErr`
struct which represents a single MySQL Error. What we can do is cast the
error back to the `MySQLErr` type to get the error number from it:  


```
_, err := db.Exec("INSERT INTO users (id email) VALUES (?,?)",1
,"bob@example.com")

if err != nil {
    if mysqlErr, ok := err.(*mysql.MySQLError); ok && mysqlErr.Number ==
        1062 {
            return errors.New("invalid operation")
        } else {
            // handle some other error
        }
}
```

`Number` is not a valid property key for err. What we need to do is cast
the `err` to a `*mysql.MySQLError`. We can check the success of the type
casting using `ok`. If it is okay, we can then check the `error number` from
`mysqlErr` to see if the error thrown is the one we want to handle. In
this case, we want to handle the duplicate key error code that is `1062`
and return a more obfuscated and generic error handling message.  

In the example above, we are just letting the user know that the error was
an invalid operation.  
This [stackoverflow
article](https://stackoverflow.com/questions/38493985/how-to-parse-mysql-errors
"How to parse MySQL errors") was referenced in the creation of this
article. 








