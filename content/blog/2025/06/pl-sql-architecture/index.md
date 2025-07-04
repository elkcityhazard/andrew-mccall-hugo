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
PL/SQL engine cannot do any DML or Data Manipulation Language or Data
Description Language operations.
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


## Database Installation
1. Virtual Box
2. Directly On Your Computer
3. Oracle Live SQL

### Virtual Machine Option

An emulated computer system using software.  Virtualization software is a
tool that runs virtual systems.  "Like a computer inside a computer."  Up
and running databse and SQL developer with little effort. Dependencies
include: virtual machine software, and virtual machine image. Easy to
install and uninstall.  Simple to work with different operating systems,
can include software in a sandboxed environment, easy to reset the
database.  Also, easy to move virtual systems between computers.  

When not to pick this option? Lower spec'd operating system with limited
storage.  

### Installing the databse on your local computer

Can have issues with configurations.  Some computers or environments may
not be suitable.  MacOS proves to be a challenge.  Uses less free disk
space, Linux or Windows, SQL Developer configurations.  This option is more
error prone.  It also requires extra configuration.  

### Oracle Live SQL
No downloads needed, but requires the internet.  SQL Developer not
available so not able to benefit from professional development tools.  

- No disk space
- All operating systems
- No downloads
- Requires internet
- Low computer spects
- Not good if you need a full-fledged databse
- Need to have full control over the database
- Only read privileges
- Requires internet access
- SQL Performance Tuning tools not available


__Note__: the sys user needs to use the SYSDBA or SYSOPER role while
connecting to the database. 



## Anonymous Blocks

IN PL/SQL programming we write all of our code in blocks.  Blocks are
exectuable rules inside `BEGIN` and `END`.  `DECLARE` and `EXCEPTION`
keywords are used for declaring `variables`, `exceptions`, and `cursors`.

### DECLARE Keyword 

- In the `DECLARE` section, we define what we are going to use in our `BEGIN`
and `END` sections.  

### BEGIN Keyword
- Opening of a code statement.  `BEGIN` keyword is mandatory.  

### EXCEPTION keyword
- An optional section that catches errors and exceptions so you can handle
  them.  If an error or exception occurs and it is not handled, any DML
  operations will be rolled back.

### END Keyword

Declares the end of the code block.  Requires a semi-colon after the
keyword. The keywords must be written sequentially.  DECLARE => BEGIN =>
EXCEPTION => END.  This can cause a compilation error.  SQL Developer lints
this for us. 

#### An Example Minimal Block

```
DECLARE
BEGIN
horizontal rule;
END:
```

### Types Of Blocks

- __Anonymous Blocks__: For example. writing PL/SQL code into Oracle SQL
  Developer Worksheet is considered an anonymous block. 
- __Procedures__: Used for business logic.  Save written code and run it
  frequently.  Must have a name for the procedure. Saved blocks that have
  PL/SQL to perform some job, task, or action on your database.  
- __Functions__: Functions return a value where as Procedures do not.  Good
  for composability.  


### PL/SQL Outputs
- PL/SQL is not an output language
- No built-in output functionality
- `SET SERVEROUTPUT ON` - 
- `DBMS_OUTPUT` - Oracle pre-built package that perform output.  
- `put_line` procedure

```
SET SERVEROUTPUT ON;

BEGIN
dbms_output.put_line('hello world');
END;
```

### NESTED Blocks
 ```
 SET SERVEROUTPUT ON;

BEGIN
dbms_output.put_line('hello world');
    BEGIN
        DBMS_OUTPUT.PUT_LINE('nested block');
    
    END;
END;
 ```  


 ## PL/SQL - How To Use Variables In Oracle Database

 - must start with a letter
 - cannont contain special characters
 - maximum 30 characters
 - cannon use Oracle's reserved keywords

### PL/SQL Variable Naming Conventions
- Some companies have their own conventions
- VARIABLE: v_variable_name
- CURSOR: c_cursor_name
- EXCEPTION: e_exception_name
- PROCEDURE: p_procedure_name
- FUNCTIONS: f_function_name
- BIND VARIABLE: b_bind_name

### Declare Variables & Use Variables IN PL/SQL

`Name [CONSTANT] datatype [NOT NULL] [:= DEFAULT value|expression];`

__Note__: single `=` sign is used for equality evaluation in PL/SQL.

__Note__: Number precision and scale must be equal to or higher than your
number.

### Examples of declaring and initalizing values

```
SET SERVEROUTPUT ON;
DECLARE

V_TEXT VARCHAR2(50) NOT NULL DEFAULT 'WELCOME';
V_NUMBER NUMBER NOT NULL := 50;
V_PRECISION_NUM NUMBER(10,4) NOT NULL := 50.42;
V_PLS_INTEGER PLS_INTEGER NOT NULL DEFAULT 99; -- PLS_INTEGER is faster than number

-- these data types are for scientific calculations where accuracy is less important
V_BINARY_INTEGER BINARY_INTEGER NOT NULL DEFAULT 60;
V_BINARY_FLOAT BINARY_FLOAT NOT NULL DEFAULT 60.01f;


-- datetime
V_DATE DATE NOT NULL:= SYSDATE;
V_DATE_CUSTOM DATE NOT NULL := '25-JUL-04 06:00:00';
V_DATE_TIMESTAMP TIMESTAMP NOT NULL := SYSTIMESTAMP;
V_DATE_TIMESTAMP_TZ TIMESTAMP WITH TIME ZONE NOT NULL := SYSTIMESTAMP;
V_DATE_TIMESTAMP_TZ_PRECISION TIMESTAMP(3) WITH TIME ZONE NOT NULL := SYSTIMESTAMP;

-- INTERVAL
-- precision limit is 1 to 9.  The default values are 2 or day and 6 for milliseconds
V_DATE_INTERVAL INTERVAL DAY(4) TO SECOND(2) := '24 02:05:21.012';

-- year to month
V_DATE_INTERVAL_YEAR_TO_MONTH INTERVAL YEAR(3) TO MONTH := '12-3';

V_BOOL BOOLEAN := true;

BEGIN
      
    -- concatenation
    V_TEXT := V_TEXT || ' EVEN MORE';
    DBMS_OUTPUT.PUT_LINE(V_TEXT);
    
    DBMS_OUTPUT.PUT_LINE(V_NUMBER || ' Level');
    
    DBMS_OUTPUT.PUT_LINE(V_PRECISION_NUM);
    DBMS_OUTPUT.PUT_LINE(V_PLS_INTEGER);
    DBMS_OUTPUT.PUT_LINE(V_BINARY_INTEGER);
    DBMS_OUTPUT.PUT_LINE(V_BINARY_FLOAT);
    
    -- date time 
    DBMS_OUTPUT.PUT_LINE(V_DATE);
    DBMS_OUTPUT.PUT_LINE(V_DATE_CUSTOM);
    DBMS_OUTPUT.PUT_LINE(V_DATE_TIMESTAMP);
    DBMS_OUTPUT.PUT_LINE(V_DATE_TIMESTAMP_TZ);
    DBMS_OUTPUT.PUT_LINE(V_DATE_TIMESTAMP_TZ_PRECISION);
    DBMS_OUTPUT.PUT_LINE(V_DATE_INTERVAL);
    DBMS_OUTPUT.PUT_LINE(V_DATE_INTERVAL_YEAR_TO_MONTH);
    
    -- will fail because we can't print boolean type vals
    DBMS_OUTPUT.PUT_LINE(V_DATE_BOOLEAN);

    -- Even More Examples

    -----------------------===================-----------------------
-----------------------DECLARING VARIABLES-----------------------
-----------------------===================-----------------------
SET SERVEROUTPUT ON;
DECLARE 
    v varchar2(20) := 2 + 25 * 3;
BEGIN
    dbms_output.put_line(v);
END;
-----------------------===================-----------------------
DECLARE 
    v_text varchar2(50) NOT NULL DEFAULT 'Hello';
    v_number1 number := 50;
    v_number2 number(2) := 50.42;
    v_number3 number(10,2) := 50.42;
    v_number4 PLS_INTEGER := 50;
    v_number5 BINARY_FLOAT := 50.42;
    v_DATE1 DATE := '22-NOV-18 12:01:32';
    v_DATE2 timestamp := systimestamp;
    v_DATE3 timestamp(9) WITH TIME ZONE := systimestamp;
    v_DATE4 interval day(4) to second (3) := '124 02:05:21.012 ';
    v_DATE5 interval year to month := '12-3';
BEGIN
    V_TEXT := 'PL/SQL' || 'Course';
    DBMS_OUTPUT.PUT_LINE(V_TEXT);
    DBMS_OUTPUT.PUT_LINE(v_number1);
    DBMS_OUTPUT.PUT_LINE(v_number2);
    DBMS_OUTPUT.PUT_LINE(v_number3);
    DBMS_OUTPUT.PUT_LINE(v_number4);
    DBMS_OUTPUT.PUT_LINE(v_number5);
    DBMS_OUTPUT.PUT_LINE(v_DATE1);
    DBMS_OUTPUT.PUT_LINE(v_DATE2);
    DBMS_OUTPUT.PUT_LINE(v_DATE3);
    DBMS_OUTPUT.PUT_LINE(v_DATE4);
    DBMS_OUTPUT.PUT_LINE(v_DATE5);
    END;
----------------==================================---------------
----------------USING BOOLEAN DATA TYPE in PL/SQL----------------
----------------==================================---------------
DECLARE
    v_boolean boolean := true;
BEGIN
    dbms_output.put_line(sys.diutil.bool_to_int(v_boolean));
END;

```

### %TYPE Attribute

This operator returns the datatype of the referenced column.  This can be
assigned to a declared varaible. PL/SQL manipulates data,This can be useful
for maintaining type parity in our code logic.  When making calculations, we want to use datatypes that have equal datatype and precision to avoid a database error when we are inserting.  Hardcoding datatype of a variable can make code less composable an maintainable.  This is why `%TYPE` can be useful.  IN some ways, this is similar to a pointer.  

```
SET SERVEROUTPUT ON;
DESC employees;

DECLARE
    V_TYPE employees.job_id%TYPE;
    V_TYPE_2 V_TYPE%TYPE;
    V_TYPE_3 employees.job_id%TYPE;
BEGIN
V_TYPE := 'IT_PROG';
V_TYPE_2 := 'SA_MAN';
V_TYPE_3 := NULL;
    DBMS_OUTPUT.PUT_LINE(V_TYPE);
    DBMS_OUTPUT.PUT_LINE(V_TYPE_2);
    DBMS_OUTPUT.PUT_LINE(V_TYPE_3 || 'job_id');
    
END;

```

### DELIMITERS and Commenting PL/SQL Code

Delimiters are symbols with meaning:
- `+` Addition
- `-` Subtraction or Negation
- `*` Multiplication
- `/` Division
- `=` Equality
- `@` Remote Access
- `;` Statement

#### Compound Symbols
- `<>` Inequality
- `!=` Inequality 
- `||` Concatenation
- `:=` Assignment
- `--` Single Line Comment
- `/**/` Multi-Line Comment

```
DECLARE
V_TEXT VARCHAR2(10):= 'PL/SQL';
BEGIN
--This is a single line comment
/* This is a 
    multi line
    comment */
--DBMS_OUTPUT.PUT_LINE(V_TEXT || ' is a good language');
null;
END;
```


### Variable Scope

In general, variable can have access to their current scope and parent
scope.  But outer scopes cannot have access to inner scope.  When two
different blocks have the same variable, we can use labels to get access to
the  same-named variable in the outer scope via the label.  

```
begin <<outer>>
DECLARE
  --v_outer VARCHAR2(50) := 'Outer Variable!';
  v_text  VARCHAR2(20) := 'Out-text';
BEGIN 
  DECLARE
    v_text  VARCHAR2(20) := 'In-text';
    v_inner VARCHAR2(30) := 'Inner Variable';
  BEGIN
    --dbms_output.put_line('inside -> ' || v_outer);
    --dbms_output.put_line('inside -> ' || v_inner);
      dbms_output.put_line('inner -> ' || v_text);
      dbms_output.put_line('outer -> ' || outer.v_text); -- use label to
      get out scoped variable
  END;
  --dbms_output.put_line('inside -> ' || v_inner);
  --dbms_output.put_line(v_outer);
  dbms_output.put_line(v_text);
END;
END outer;
```

`Bind variables` help with performance.  We create these in the host
environment.  Bind variables are similar to global variables.  Can be
declared, but not initialized at the same time.  These are declared outside
of blocks.  These are scoped to the current workspace, however.  A maximum
value for varchar2 can be assigned, but a maxium value or precision for
numbers cannot be assigned. 

Example of `Bind Variables`:

```
    --------------------------BIND VARIABLES--------------------------
    set serveroutput on;
    set autoprint on;
    /
    variable var_text varchar2(30);
    /
    variable var_number NUMBER;
    /
    variable var_date DATE;
    /
    declare
    v_text varchar2(30);
    begin
    :var_text := 'Hello SQL';
    :var_number := 20;
    v_text := :var_text;
    --dbms_output.put_line(v_text);
    --dbms_output.put_line(:var_text);
    end;
    /
    print var_text;
    /
    variable var_sql number;
    /
    begin 
      :var_sql := 100;
    end;
    /
    select * from employees where employee_id = :var_sql;
    /*------------------------BIND VARIABLES--------------------------
    NOTE: When you run a bind variable creation and SELECT statement 
    together, SQL Developer may return an error but when you execute 
    them separately, there will be no problem.
    ----------------------------------------------------------------*/
```
