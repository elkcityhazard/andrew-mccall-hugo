---
title: 'Pl Sql Architecture Introduction'
date: 2025-07-03
author: Andrew M McCall
description:  An introduction to PL/SQL including a brief explanation of what it is, why we would want to use it, and the basics you need to know. 
summary:  PL/SQL is an extension of SQL Engine created by Oracle to add logical programming to SQL for Oracle databases which offers a blend of programming as well as optimizations for SQL engine.  
publishDate: '2025-07-03T20:07:01-04:00'
updateDate:  '2025-07-03T20:07:01-04:00'
images: ['/images/twitter-card.png']
draft: false
categories:
  - Databases
tags:
  - Oracle
  - SQL
  - PL/SQL

---

## PL/SQL Architecture

Knowing <abbr title="Procedural Language For SQL (Structured Query Language)">PL/SQL</abbr> architecture can help improve performance. 

### Physical Architecture

SQL engine that operates a SQL query and returns data to the client.  In
the engine, there is a SQL statement executor which operates the queries. 

When we write SQL it does not run directly, there are some operation before
the query is interpreted.  These are DBA subjects.  When we run our query,
it steps into three main process:

- Parsing
- Fetching
- Executing

These are performed by SQL engine. Oracle optimized queries. For example.
if we did some standard inner joins, left joins, Oracle turns them into Oracle joins. 
This is dictated by the `optimization level` that we select.  This is
related to `SQL tuning subjects` or `DBA subjects` and can be more deeply
understood if we explore these subjects.

All SQL operations are done in SQL engine.  SQL statement executor does
these operation: insert, update, delete, etc. PL/SQL is a bit more complex.
PL/SQL generally cooperates with SQL engine.  For example, if there are 
any <abbr title="Data Manipulation Language">DML</abbr> operations inside your PL/SQL code, it is sent to the SQL Engine.  
If you query from a table, your result will be returned to PL/SQL engine
then PL/SQL can do any programmatic operations.

### Logical Architecture

PL/SQL cooperates with SQL Engine and even though PL/SQL is different, it
integrates well with SQL engine. PL/SQL is like the next step.  

PL/SQL engine allows us to create, manage, and execute SQL and PL/SQL codes
and interact with the database.  

SQL code will call the SQL engine and perform the operation with the SQL
engine.  The result, however, will be returned to the PL/SQL engine for
deeper logical operations.  This is considered context switching in the
scope of PL/SQL, but if our code needs many context switches, we may incur
performance issues.  

PL/SQL enables sub-programs.  It enables us to save and reuse our code and
allow us to create better business logic. In some ways, these are like a
library.  

PL/SQL allows us to create `dynamic queries`.  You can create WHERE clause
or create new queries completely based on logic.  

PL/SQL is a case insensitive programming language.  Oracle has naming
conventions but you can follow your own.  

There is an SQL optimizer in PL/SQL.  Oracle offers us an option to
optimize and it can help optimize our code with performance in mind.  

Enabled object oriented programming with abstract data types .  

Web Development. PL/SQL Gateway and Web tool kit to create web based
applications.   

## Pluggable Database Architecture

Pluggable Database Architecture is also known as Multitenant Architecture.  

Oracle database version 12c introduced pluggable database feature. There is
one `container database` and inside the `container database` there are
`pluggable` databases.  Each pluggable database has full attributes of
regular database.  The container database is not like pluggable database:
it does not have objects.  It stores metadata such as configuration files,
etc. 

### Why Pluggable Databases?

Each database used to be installed on a separate server. Some small
databases don't need dedicated servers.  Each servers needs a lot of work
for the DBAs.  Oracle updated the architecture which are basically containerized. 

## What Is A Schema

Schemas are the collection of objects for each user in Oracle Database. All
the objects of a single user are collected under a logical set which is
`schema`. Every user has objects under their schemas and a user does not
have anything more than their schema represents.  A user can have only one
schema.  Schema can be represented as "user".  

A `schema` can have objects such as:

- Tables
- Views
- Triggers
- Constraints

Tables are going to be the most important. We can use an `entity
relationship` diagram to show the relationships between tables.
<abbr title="Relational Database Management Systems">RDMBS<abbr> are formed
of table.  Tables are stored as tabular forms like excel spreadsheets.
Tables are formed of columns with unique names.  There will usually be a
base table that the other tables are related to in some way.  Primary keys
are unique to the record, and often auto increment.  We use these columns
to establish relationships with other tables.  

### Example Table Schema

| **Table Name**      | **Column Name**       | **Data Type**         | **Description**                           |
|---------------------|-----------------------|-----------------------|-------------------------------------------|
| EMPLOYEES           | EMPLOYEE_ID           | NUMBER PRIMARY KEY    | Unique identifier for each employee       |
|                     | FIRST_NAME            | VARCHAR2(50)          | Employee's first name                     |
|                     | LAST_NAME             | VARCHAR2(50)          | Employee's last name                      |
|                     | JOB_TITLE_ID          | NUMBER                | Foreign key referencing JOB_TITLES       |
|                     | DEPARTMENT_ID         | NUMBER                | Foreign key referencing DEPARTMENTS       |
|                     | HIRE_DATE             | DATE                  | Date when the employee was hired          |
|                     | SALARY                | NUMBER(10, 2)         | Employee's salary                          |
|                     | EMAIL                 | VARCHAR2(100)         | Employee's email address                  |
|                     | PHONE_NUMBER          | VARCHAR2(15)          | Employee's phone number                   |
| JOB_TITLES          | JOB_TITLE_ID          | NUMBER PRIMARY KEY    | Unique identifier for each job title      |
|                     | JOB_TITLE             | VARCHAR2(100)         | Title of the job                          |
|                     | MIN_SALARY            | NUMBER(10, 2)         | Minimum salary for the job                |
|                     | MAX_SALARY            | NUMBER(10, 2)         | Maximum salary for the job                |
| DEPARTMENTS         | DEPARTMENT_ID         | NUMBER PRIMARY KEY    | Unique identifier for each department     |
|                     | DEPARTMENT_NAME       | VARCHAR2(100)         | Name of the department                    |
|                     | MANAGER_ID            | NUMBER                | Foreign key referencing EMPLOYEES         |
|                     | LOCATION              | VARCHAR2(100)         | Location of the department                |



