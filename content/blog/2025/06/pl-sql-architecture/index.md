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


## Control Structures

Examples:

```
     
    /************************ Example 1 *************************/
    SET SERVEROUTPUT ON;
    DECLARE
      v_number NUMBER := 30;
    BEGIN
      IF v_number < 10 THEN
        dbms_output.put_line('I am smaller than 10');
      ELSIF v_number < 20 THEN
        dbms_output.put_line('I am smaller than 20');
      ELSIF v_number < 30 THEN
        dbms_output.put_line('I am smaller than 30');
      ELSE
        dbms_output.put_line('I am equal or greater than 30');
      END IF;
    END;
     
    /************************ Example 2 *************************/
    DECLARE
      v_number NUMBER       := 5;
      v_name   VARCHAR2(30) := 'Adam';
    BEGIN
      IF v_number < 10 OR v_name = 'Carol' THEN
        dbms_output.put_line('HI');
        dbms_output.put_line('I am smaller than 10');
      ELSIF v_number < 20 THEN
        dbms_output.put_line('I am smaller than 20');
      ELSIF v_number < 30 THEN
        dbms_output.put_line('I am smaller than 30');
      ELSE
        IF v_number IS NULL THEN
          dbms_output.put_line('The number is null..');
        ELSE
          dbms_output.put_line('I am equal or greater than 30');
        END IF;
      END IF;
    END;
   ```

### CASE Expressions

In a searched case statement, each `WHEN` clause contains a condition that
is evaluated independently.  The firstion condtion that evaluates to true
will have its corresponding code block executed.  The `ELSE` clause
provides the default action when none of the conditions are met.

```
    /****************** Simple Case Expression ******************/
    DECLARE
      v_job_code        VARCHAR2(10) := 'SA_MAN';
      v_salary_increase NUMBER;
    BEGIN
      v_salary_increase :=  CASE v_job_code 
                             WHEN 'SA_MAN' THEN 0.2
                             WHEN 'SA_REP' THEN 0.3
                            ELSE 0
                            END;
      dbms_output.put_line('Your salary increase is : '|| v_salary_increase);
    END;
    /************************************************************/
     
    /****************** Searched Case Expression ****************/
    DECLARE
      v_job_code        VARCHAR2(10) := 'IT_PROG';
      v_department      VARCHAR2(10) := 'IT';
      v_salary_increase NUMBER;
    BEGIN
      v_salary_increase:=CASE
                          WHEN v_job_code   = 'SA_MAN' THEN 0.2
                          WHEN v_department = 'IT' AND v_job_code = 'IT_PROG' THEN 0.3
                         ELSE 0
                         END;
      dbms_output.put_line('Your salary increase is : '|| v_salary_increase);
    END;
    /************************************************************/
     
    /********************* CASE Statements **********************/
    DECLARE
      v_job_code        VARCHAR2(10) := 'IT_PROG';
      v_department      VARCHAR2(10) := 'IT';
      v_salary_increase NUMBER;
    BEGIN
      CASE
        WHEN v_job_code = 'SA_MAN' THEN
          v_salary_increase := 0.2;
          dbms_output.put_line('The salary increase for a Sales Manager is: '|| v_salary_increase);
        WHEN v_department = 'IT' AND v_job_code = 'IT_PROG' THEN
          v_salary_increase := 0.2;
          dbms_output.put_line('The salary increase for a Sales Manager is: '|| v_salary_increase);
        ELSE
          v_salary_increase := 0;
          dbms_output.put_line('The salary increase for this job code is: '|| v_salary_increase);
      END CASE;
    END;
```

### Basic Loops

```
/*********************** Basic Loops ************************/
DECLARE
  v_counter NUMBER(2) := 1;
BEGIN
  LOOP
    dbms_output.put_line('My counter is : '|| v_counter);
    v_counter := v_counter + 1;
    --IF v_counter = 10 THEN
    --  dbms_output.put_line('Now I reached : '|| v_counter);
    --  EXIT;
    --END IF;
    EXIT WHEN v_counter > 10;
  END LOOP;
END;
```

### While Loops

```
/********************** WHILE LOOP **************************/
DECLARE
  v_counter NUMBER(2) := 1;
BEGIN
  WHILE v_counter <= 10 LOOP
    dbms_output.put_line('My counter is : '|| v_counter);
    v_counter := v_counter + 1;
   -- EXIT WHEN v_counter > 3;
  END LOOP;
END;
/*****
```


### For Loops

```
FOR counter IN [REVERSE]
    lower_bound..upper_bound LOOP
    my_code;
END LOOP;
```

```
/************************ FOR LOOP **************************/
BEGIN
  FOR i IN REVERSE 1..3 LOOP
    dbms_output.put_line('My counter is : ' || i);
  END LOOP;
END;
/************************************************************/
```

### Nested Loops

We can use labels with nested loops to break out of outer inside of inner.
A label has a syntax like this: `<<label_name>>`.  We can write this before
the `LOOP` keyword in basic loops while writing it before `WHILE` and `FOR`
keyword in these loops.  At the end of the loop, you can append the label
to the `end loop outer_loop` for added clarity.  A normal `exit` keyword
will not finish the outer loop, only the currently scoped loop.  Labeles
can help us exit the outer loop: `exit outer_loop when [some condition]`. 

```
DECLARE
 v_inner NUMBER := 1;
BEGIN
 FOR v_outer IN 1..5 LOOP
  dbms_output.put_line('My outer value is : ' || v_outer );
    v_inner := 1;
    LOOP
      v_inner := v_inner+1;
      dbms_output.put_line('  My inner value is : ' || v_inner );
      EXIT WHEN v_inner * v_outer >= 15;
    END LOOP;
 END LOOP;
END;
/************************************************************/
 
/**************** Nested Loops with Labels ******************/
DECLARE
 v_inner NUMBER := 1;
BEGIN
<<outer_loop>>
 FOR v_outer IN 1..5 LOOP
  dbms_output.put_line('My outer value is : ' || v_outer );
    v_inner := 1;
    <<inner_loop>>
    LOOP
      v_inner := v_inner+1;
      dbms_output.put_line('  My inner value is : ' || v_inner );
      EXIT outer_loop WHEN v_inner * v_outer >= 16;
      EXIT WHEN v_inner * v_outer >= 15;
    END LOOP inner_loop;
 END LOOP outer_loop;
END;

set serverout on;
declare
v_inner number := 1;

begin
-- we can use label for loops
-- we write our label before the LOOP keyword in basic loops;
-- for while and for loops, we write before while and for keywords
-- exit keyword: it will not finish the outer loop, only the current scoped loop
-- but we can use labels to exit the outer loop
-- if we label outer loop, we can use exit command with the label and finish both inner and outer loop
    <<outer_loop>>
    for v_outer in 1..5 loop
        dbms_output.put_line('My outer value is : ' || v_outer);
        v_inner := 1;
        <<inner_loop>>
        loop
            v_inner := v_inner + 1;
             dbms_output.put_line('My inner value is : ' || v_inner);
              exit outer_loop when v_inner * v_outer >= 16; -- using a label to exit outer loop inside of inner loop
              exit when v_inner * v_outer >= 15; -- we can have a condition to exit inner to outer
             end loop inner_loop; -- declare the end of inner loop by placing at the end of `end loop` keyword
    end loop outer_loop; -- declare the end of the inner loop by placing at the end of the `end loop` keyword
end;

```


### Continue Statement

How it is used: `CONTINUE [label_name] [WHEN CONDITION]`



```
set serveroutput on;
--
--declare
--v_inner number := 1;
--
--begin
--    <<outer_loop>>
--        for v_outer in 1..10 loop
--            dbms_output.put_line('My outer value is: ' || v_outer);
--            v_inner := 1;
--            <<inner_loop>>
--            while v_inner * v_outer < 15 loop
--                v_inner := v_inner + 1;
--                continue when mod(v_inner*v_outer,3) = 0; -- mod explanation: return ((v_inner * v_outer) - 3 * floor((v_inner*v_outer) / 3)) == 0 i.e., ((3 *3) - 3 * ((3*3) /3))
--                dbms_output.put_line('My inner value is: ' || v_inner);
--            end loop inner_loop;
--        end loop outer_loop;
--end;

declare
v_inner number := 1;

begin
    <<outer_loop>>
        for v_outer in 1..10 loop
            dbms_output.put_line('My outer value is: ' || v_outer);
            v_inner := 1;
            <<inner_loop>>
            loop
                v_inner := v_inner + 1;
                continue outer_loop when v_inner = 10;
                dbms_output.put_line('My inner value is: ' || v_inner);
            end loop inner_loop;
        end loop outer_loop;
end;

```


### GOTO Statements

`GOTO` is a keyword that transfers the control to  a labeled place. We
place the cursor of the program directly to the place of the label that we
pointed to.  With GOTO, you can go almost anywhere in your codebase.  We
cannon write a condition for the gotostatement.  GOTO statements are good
for jumping to other places in your code. 

Usage: `GOTO label_name`;

__Note__: we cannot write when and condition with goto statements.  

We cannot go into an if statement, case statement, or a loop with a goto
statement.  We cannot go into an inner block from an outer block, but you
can jump from an inner block to an outer block.  

If you are in a subprogram like a function or procedure, you cannot go out
of it by using a goto statement.  

If we are in an exception handler block, we cannot go out of it (there is a
trick).  

If your exception handler is in an inner block, then you can jump into a
place in the outer block, but you cannot go into the current or inner
block.  

Examples:

```
set serveroutput on;

--declare
--v_searched_number number := 32453;
--v_is_prime boolean := true;
--
--begin
--    for x in 2..v_searched_number-1 loop
--        if v_searched_number mod x = 0 then
--            dbms_output.put_line(v_searched_number || ' is not a prime number...');
--            v_is_prime := false;
--            goto end_point;
--        end if;
--    end loop;
--    
--    if v_is_prime then
--        dbms_output.put_line(v_searched_number || ' is a prime number...');
--    end if;
--    
--    
--    <<end_point>>
--    -- there must be something after label for goto
--    dbms_output.put_line('Check complete...');
--
--end;


declare
v_searched_number number := 32453;
v_is_prime boolean := true;
v_x number := 2;

begin
    <<start_point>>
    
        if v_searched_number mod v_x = 0 then
            dbms_output.put_line(v_searched_number || ' is not a prime number...');
            v_is_prime := false;
            goto end_point;
        end if;
        v_x := v_x+1;
        if v_x = v_searched_number then
            goto prime_point;
        end if;
        
        goto start_point;
    <<prime_point>>
    if v_is_prime then
        dbms_output.put_line(v_searched_number || ' is a prime number...');
    end if;
    
    
    <<end_point>>
    -- there must be something after label for goto
    dbms_output.put_line('Check complete...');

end;
```


## SQL in PL/SQL

- You cannot use DDL commands directly. i.e., creating a table, altering
  it, etc.
- DCL operations are transacton control statements like granting,
    revoking, etc. 
- A block does not mean a transaction
- There can be many DML commands and many commits, rollbacks, and multiple
  transactions in one PL/SQL command.
- `INTO` clause: we store the returned data into our variables or records.
  We have our select keyword, then our columns, or expressions.  
- `SELECT columns|expressions INTO variables|records FROM table|tables
  [WHERE condition];`
- We need to have same number of variables as in our select statement.  
- Code must return one row


```
/************************ Example 1 *************************/
DECLARE
  v_name   VARCHAR2(50);
  v_salary employees.salary%type;
BEGIN
  SELECT first_name ||' '|| last_name, salary 
  INTO   v_name, v_salary  
  FROM   employees 
  WHERE  employee_id = 130;
  dbms_output.put_line('The salary of '|| v_name || ' is : '|| v_salary);
END;
 
/************************ Example 2 *************************/
DECLARE
  v_name   VARCHAR2(50);
  sysdates employees.hire_date%type;
BEGIN
  SELECT first_name ||' '|| last_name, sysdates 
  INTO   v_name, sysdates 
  FROM   employees 
  WHERE employee_id = 130;
  dbms_output.put_line('The salary of '|| v_name || ' is : '|| sysdates);
END;
 
/************************ Example 3 *************************/
DECLARE
  v_name      VARCHAR2(50);
  v_sysdate   employees.hire_date%type;
  employee_id employees.employee_id%type := 130;
BEGIN 
  SELECT first_name ||' '|| last_name, sysdate 
  INTO   v_name, v_sysdate 
  FROM   employees 
  WHERE  employee_id = employee_id;
  dbms_output.put_line('The salary of '|| v_name || ' is : '|| v_sysdate );
END;
 
/************************ Example 4 *************************/
DECLARE
  v_name        VARCHAR2(50);
  v_salary      employees.salary%type;
  v_employee_id employees.employee_id%type := 130;
BEGIN 
  SELECT first_name ||' '|| last_name, salary 
  INTO   v_name, v_salary 
  FROM   employees 
  WHERE  employee_id = v_employee_id;
  dbms_output.put_line('The salary of '|| v_name || ' is : '|| v_salary );
END;
```
### DML Operations in PL/SQL

```
CREATE TABLE employees_copy 
AS SELECT * FROM employees;
 
DECLARE
  v_employee_id     PLS_INTEGER := 0;
  v_salary_increase NUMBER      := 400;
BEGIN
  FOR i IN 217..226 LOOP
    -- INSERT INTO employees_copy 
    -- (employee_id, first_name, last_name, email, hire_date, job_id, salary)
    -- VALUES
    -- (i, 'employee#'||i,'temp_emp','abc@xmail.com',sysdate,'IT_PROG',1000);
    -- UPDATE employees_copy 
    -- SET    salary = salary + v_salary_increase
    -- WHERE  employee_id = i;
    DELETE FROM employees_copy
    WHERE employee_id = i;
  END LOOP;
END;
```


### Sequences

Sequences are related to auto increment values for new data. With PL/SQL,
we generally do this with triggers. A sequence is independent from a table.
We can use it with more than one table.  

`nextval` amd `currval` psuedocolumns in our pl/sql code.  We can assign a
sequence value into a database column or a pl/sql variable.  But the value
or column that is assigned a sequence value must be a number type.  

#### Two ways to use sequences

- We can use sequence in a select query
- We write our sequence name between select and into keywords and specify
  whether we use next value or current value `sequence_name.currval` or `sequence_name.nextval`.
- example: `SELECT sequence_name.nextval|currval INTO variable|column
    FROM table_name|dual [WHERE condition];`

```
-- using sequences with insert statement
set serveroutput on;

create sequence employee_id_seq
start with 207
increment by 1;

declare
v_employee_id pls_integer := 0;

begin

    for i in 1..10 loop
        insert into employees_copy
            (employee_id,first_name,last_name,email,hire_date,job_id,salary)
        values
            (employee_id_seq.nextval,'employee#'||employee_id_seq.nextval,'temp_temp','abc@xmail.com',sysdate,'IT_PROG','100');
    end loop;

end;

select * from employees_copy WHERE employee_id > 206;

-- example using variables

declare
    v_seq_num number;

begin
    for i in 1..10 loop
        select employee_id_seq.nextval into v_seq_num from dual;
        dbms_output.put_line(v_seq_num);
    end loop;


end;

```

#### Using Sequence Individually

Using sequences directly:

```
--create sequence employee_id_seq
--start with 207
--increment by 1;

declare
    v_seq_num number;

begin
    v_seq_num := employee_id_seq.nextval;
    dbms_output.put_line(employee_id_seq.currval) -- if we want to see
    current val of sequence
    dbms_output.put_line(v_seq_num);

end;
```

Even More Examples:

```
/******************** Creating a Sequence *******************/
CREATE SEQUENCE employee_id_seq 
START WITH 207
INCREMENT BY 1;
 
/************************ Example 1 *************************/
BEGIN
  FOR i IN 1..10 LOOP
    INSERT INTO employees_copy 
      (employee_id,first_name,last_name,email,hire_date,job_id,salary)
    VALUES 
      (employee_id_seq.nextval,'employee#'||employee_id_seq.nextval,'temp_emp','abc@xmail.com',sysdate,'IT_PROG',1000);
  END LOOP;
END; 
 
/************************ Example 2 *************************/
DECLARE
  v_seq_num NUMBER;
BEGIN
  SELECT employee_id_seq.nextval 
  INTO   v_seq_num 
  FROM   dual;
  dbms_output.put_line(v_seq_num);
END;
 
/************************ Example 3 *************************/
DECLARE
  v_seq_num NUMBER;
BEGIN
  SELECT employee_id_seq.nextval 
  INTO   v_seq_num 
  FROM   employees_copy 
  WHERE  rownum = 1;
  dbms_output.put_line(v_seq_num);
END;
 
/************************ Example 4 *************************/
DECLARE
  v_seq_num NUMBER;
BEGIN
  v_seq_num := employee_id_seq.nextval; 
  dbms_output.put_line(v_seq_num);
END;
 
/************************ Example 5 *************************/
BEGIN
  dbms_output.put_line(employee_id_seq.nextval);
END;
 
/************************ Example 6 *************************/
BEGIN
  dbms_output.put_line(employee_id_seq.currval);
END;
```


## PL/SQL Data Types: Simple versus Composite

PGA stands for the Program Global Area.

Variables are kept in pga until their scope is finished.  

Composite data types are designed to hold multiple values in one variable. `Records` and `Collections`.

Records are single row, but multiple variable entities.  

Collections are a bit more detailed.  They are multi-rowed.  Collections
have three types that store data.  

Nested tables are 1 indexed, not zero indexed.
Store variables with indexes starting from 1 and increase sequentially.
These are key-value pairs.  Nested tables are unbound, you can have many
rows.  

The second collection type, varray, is bound.  It is also one-indexed, but
we have to specify the exact number of rows the varray will contain and it
cannot be changed later.

Associated arrays (index by arrays) can have any numbers assigned as index
values.  It does not need to start at 1 and it does not need to be
sequential.  Any pls_integer types are valid including 0 and negative
numbers.  Strings can also be used as ids with this collection type. 

`Records` and `collections` can help us build in-memory tables.  

__Note__: we can use the records and collection in our select statements,
DML statements, and anywhere in our PL/SQL code.  

### Why And Where To Use Collections And Records

Composite data types are used when we need to operate on related data.  

Records when we want to store some related values as one row.  
Collections are are great to store multiple rows of related data.


#### PL/SQL Records

Records are similar to structures in C or C++.  They are similar to object
oriented programming but not the same.  They can have different types of variables. Records are good for representing a row in a table.  We can store an entire row in a record, or create our own structure.  Previously, we saw storing columns in individual variables, but we can also do this with one Record type.  Furthermore, we can also add a record to a record which has some potential benefits.  Records are more meaniningful when we use them along with collections.  

Record can have one or multiple values.  When we create a record, all
properties in it are null by default.  It is possible to initialize the
values when we instantiate the record or define the properties as not null.  

There are two ways to create a record.  The simplest way is to point a
database table structure.  This can be done using the `%type` keyword to dynamically pass the type to the record property.  

- create a record: `record_name TABLE_NAME%rowtype;`
- simple and efficient, no need to specify each type
- one benefit is if type changes in db, our codes doesn't change
- Second way is we specify our variables one by one in to our record.
- Good for when we only need a subset of columns.  
- `type type_name is record (variable_name
  variable_type,variable_name2,variable_type2,[.....]);` (there is an
  exception of reference cursors)
- Must be at least one variable
- Use all valid PL/SQL types, %TYPE, %ROWTYPE, NOT NULL, and DEFAULT%


A Complex Example using records:

```
set serveroutput on;
declare

    type t_edu is record (
    primary_school varchar2(100),
    high_school varchar2(100),
    university varchar2(100),
    uni_graduate_date date
    );
    type t_emp is record (
        first_name employees.first_name%type,
        last_name employees.first_name%type,
        salary employees.salary%type not null default 1000,
        hire_date employees.hire_date%type,
        dept_id employees.department_id%type,
        department departments%rowtype, -- adding an additional row type
        education t_edu
    );  
    
    r_emp t_emp;
      
begin

    select first_name,last_name,salary,hire_date,department_id
        into r_emp.first_name,r_emp.last_name,r_emp.salary,r_emp.hire_date,r_emp.dept_id
        from employees
        where employee_id = '146';
        
    select * into r_emp.department from departments where department_id = r_emp.dept_id;
    
        r_emp.education.high_school := 'Traverse City';
        r_emp.education.uni_graduate_date := '01-JAN-23';
        r_emp.education.university := 'Western Michigan University';
        
        dbms_output.put_line(r_emp.first_name || ' ' || r_emp.last_name || ' earns ' || r_emp.salary || ' and was hired on ' || r_emp.hire_date);
        dbms_output.put_line('They graduated from ' || r_emp.education.university || ' on: ' || r_emp.education.uni_graduate_date);
        dbms_output.put_line('Their department name is: ' || r_emp.department.department_name);

end;
```

Another Example:

```
/************************ Example 1 *************************/
DECLARE
  r_emp employees%rowtype;
BEGIN
  SELECT * INTO r_emp 
  FROM   employees 
  WHERE  employee_id = '101';
  --r_emp.salary := 2000;
  dbms_output.put_line(r_emp.first_name || ' '                ||
                       r_emp.last_name  || ' earns '          ||
                       r_emp.salary     || ' and hired at : ' || 
                       r_emp.hire_date);
END;
 
/************************ Example 2 *************************/
DECLARE
  --r_emp employees%rowtype;
  type t_emp IS RECORD (first_name VARCHAR2(50),
                        last_name  employees.last_name%TYPE,
                        salary     employees.salary%TYPE,
                        hire_date  DATE);
  r_emp t_emp;
BEGIN
  SELECT first_name,last_name,salary,hire_date 
  INTO   r_emp 
  FROM   employees 
  WHERE  employee_id = '101';
 
 /* r_emp.first_name := 'Alex';
    r_emp.salary     := 2000;
    r_emp.hire_date  := '01-JAN-20'; */
 
  dbms_output.put_line(r_emp.first_name || ' '                || 
                       r_emp.last_name  || ' earns '          || 
                       r_emp.salary     || ' and hired at : ' || 
                       r_emp.hire_date);
END;
 
/************************ Example 3 *************************/
DECLARE
  TYPE t_edu is RECORD(primary_school    VARCHAR2(100),
                       high_school       VARCHAR2(100),
                       university        VARCHAR2(100),
                       uni_graduate_date DATE
                       );
  
  TYPE t_emp IS RECORD(first_name       VARCHAR2(50),
                       last_name        employees.last_name%type,
                       salary           employees.salary%type  NOT NULL DEFAULT 1000,
                       hire_date        DATE,
                       dept_id          employees.department_id%type,
                       department       departments%rowtype,
                       education        t_edu
                       );
  r_emp t_emp;
BEGIN
  SELECT first_name, last_name, salary, hire_date, department_id 
    INTO r_emp.first_name, r_emp.last_name, r_emp.salary, r_emp.hire_date, r_emp.dept_id 
    FROM employees where employee_id = '146';
  
  SELECT * 
  INTO   r_emp.department 
  FROM   departments 
  WHERE  department_id = r_emp.dept_id;
  
  r_emp.education.high_school       := 'Beverly Hills';
  r_emp.education.university        := 'Oxford';
  r_emp.education.uni_graduate_date := '01-JAN-13'; 
  
  dbms_output.put_line(r_emp.first_name || ' '                || 
                       r_emp.last_name  || ' earns '          || 
                       r_emp.salary     || ' and hired at : ' ||
                       r_emp.hire_date);
  dbms_output.put_line('She graduated from '       || 
                       r_emp.education.university  || 
                       ' at '                      ||  
                       r_emp.education.uni_graduate_date);
  dbms_output.put_line('Her Department Name is : '|| r_emp.department.department_name);
END;
```

### Data Manipulation Language Operations With Records

Insert and update are straight forward dml operations that can be done
using records.  DELETE operations can be done, but we must use the where
clause to specify that a column is equal to a record value name.  

Some known ways:
- `insert into departments values (280,'Temp Dept',null, 1500);`
- `insert into departments (department_id, department_name)
values(290,'Temp Department 2');`

Example with records:

```
/************************************************************/
CREATE TABLE retired_employees 
AS SELECT * FROM employees WHERE 1=2;
 
SELECT * FROM retired_employees;
/
 
DECLARE
    r_emp employees%rowtype;
BEGIN
    SELECT * 
    INTO   r_emp 
    FROM   employees 
    WHERE  employee_id = 104;
    
    r_emp.salary         := 0;
    r_emp.commission_pct := 0;
    
    INSERT INTO retired_employees VALUES r_emp;
END;
 
/************************************************************/
DECLARE
    r_emp employees%rowtype;
BEGIN
    SELECT * 
    INTO   r_emp 
    FROM   employees 
    WHERE  employee_id = 104;
 
    r_emp.salary         := 10;
    r_emp.commission_pct := 0;
 
    --insert into retired_employees values r_emp;
    UPDATE retired_employees 
    SET    row = r_emp 
    WHERE  employee_id = 104;
end;
/
DELETE FROM retired_employees;
```



## What Are Collections?

A list of records or data with the same data types.  

3 Types:
- Nested Tables - nested keys start with one index.  Unbound. 
- VARRAYS - bound arrays, one index. This can take empty space. 
- Associative Arrays

They can have any type of PL/SQL variables including composite data
types.

The collections are key value pairs.  The key is is a number or a string
value that represents. For example, an employee ID can be a key, and the
rest of the employee can be the value.  

`VARRAYS` are good for for processes that have a fixed bound.  

Records can be used in collections.  

--- TABLE operator


### VARRAY - Variable-Sized Arrays

- maximum upper limit of varrays are up to 2 gigabytes and the elements of
  the varrays are stored in an order on the disk. 
- we can create varray type in sql
- must not overflow buffer
- bounded with an index that starts at one
- one dimensional arrays
- varrays are null by default

__Note__: looping through a set of data, one has to extend the varray to
add to it's length.   In the example below, we call `employees.extend` to
grow the varray.

`VARRAY` Example:

```
set serveroutput on;

create or replace type e_list is varray(20) of varchar2(100);
/
drop type e_list;
declare
    type e_list is varray(15) of varchar2(50);
    employees e_list  := e_list();
    idx number := 1;
    

begin
    for i in 100..110 loop
        employees.extend;
        select first_name into employees(idx) from employees where employee_id = i;
        idx := idx + 1;
    end loop;
    
    for x in 1..employees.count() loop
        dbms_output.put_line(employees(x));
    end loop;
    

end;
```

More Examples:

```
/**************** A Simple Working Example ******************/
DECLARE
  TYPE e_list IS VARRAY(5) OF VARCHAR2(50);
  employees e_list;
BEGIN
  employees := e_list('Alex','Bruce','John','Bob','Richard');
  FOR i IN 1..5 LOOP
    dbms_output.put_line(employees(i));
  END LOOP;
END;
 
/************** Limit Exceeding Error Example ***************/
DECLARE
  TYPE e_list IS VARRAY(4) OF VARCHAR2(50);
  employees e_list;
BEGIN
  employees := e_list('Alex','Bruce','John','Bob','Richard');
  FOR i IN 1..5 LOOP
    dbms_output.put_line(employees(i));
  END LOOP;
END;
 
/*********** Subscript Beyond Count Error Example ***********/
DECLARE
  TYPE e_list IS VARRAY(5) OF VARCHAR2(50);
  employees e_list;
BEGIN
  employees := e_list('Alex','Bruce','John','Bob');
  FOR i IN 1..5 LOOP
    dbms_output.put_line(employees(i));
  end loop;
END;
 
/**************** A Working count() Example *****************/
DECLARE
  TYPE e_list IS VARRAY(5) OF VARCHAR2(50);
  employees e_list;
BEGIN
  employees := e_list('Alex','Bruce','John','Bob');
  for i IN 1..employees.count() LOOP
    dbms_output.put_line(employees(i));
  END LOOP;
END;
 
/************ A Working first() last() Example **************/
DECLARE
  TYPE e_list IS VARRAY(5) OF VARCHAR2(50);
  employees e_list;
BEGIN
  employees := e_list('Alex','Bruce','John','Bob');
  FOR i IN employees.first()..employees.last() LOOP
    dbms_output.put_line(employees(i));
  END LOOP;
END;
 
/*************** A Working exists() Example *****************/
DECLARE
  TYPE e_list IS VARRAY(5) OF VARCHAR2(50);
  employees e_list;
BEGIN
  employees := e_list('Alex','Bruce','John','Bob');
  FOR i IN 1..5 LOOP
    IF employees.exists(i) THEN
      dbms_output.put_line(employees(i));
    END IF;
  END LOOP;
END;
 
/**************** A Working limit() Example *****************/
DECLARE
  TYPE e_list IS VARRAY(5) OF VARCHAR2(50);
  employees e_list;
BEGIN
  employees := e_list('Alex','Bruce','John','Bob');
  dbms_output.put_line(employees.limit());
END;
 
/****** A Create-Declare at the Same Time Error Example *****/
DECLARE
  TYPE e_list IS VARRAY(5) OF VARCHAR2(50);
  employees e_list('Alex','Bruce','John','Bob');
BEGIN
  --employees := e_list('Alex','Bruce','John','Bob');
  FOR i IN 1..5 LOOP
    IF employees.exists(i) THEN
       dbms_output.put_line(employees(i));
    END IF;
  END LOOP;
END;
 
/************** A Post Insert Varray Example ****************/
DECLARE
  TYPE e_list IS VARRAY(15) OF VARCHAR2(50);
  employees e_list := e_list();
  idx NUMBER := 1;
BEGIN
  FOR i IN 100..110 LOOP
    employees.extend;
    SELECT first_name 
    INTO   employees(idx) 
    FROM   employees 
    WHERE  employee_id = i;
    idx := idx + 1;
  END LOOP;
  FOR x IN 1..employees.count() LOOP
    dbms_output.put_line(employees(x));
  END LOOP;
END;
 
/******* An Example for the Schema-Level Varray Types *******/
CREATE TYPE e_list IS VARRAY(15) OF VARCHAR2(50);
/
CREATE OR REPLACE TYPE e_list AS VARRAY(20) OF VARCHAR2(100);
/
DECLARE
  employees e_list := e_list();
  idx       NUMBER := 1;
BEGIN
 
  FOR i IN 100..110 LOOP
    employees.extend;
    SELECT first_name 
    INTO employees(idx) 
    FROM employees 
    WHERE employee_id = i;
    idx := idx + 1;
  END LOOP;
  
  FOR x IN 1..employees.count() LOOP
    dbms_output.put_line(employees(x));
  END LOOP;
 
END;
/
DROP TYPE E_LIST;
```

### Nested Tables
- Key-Value pairs
- Keys can only be numbers, binary integers, pls_integer.
- binary integers and pls_integer can be faster since they require less
  allocated memory
- Keys should be positive number
- Up to 2 gigabytes of values
- unlike varrays, values can be removed from the array after initialization
  via access by index 
- nested arrays are not stored consecutively in the database
- Selecting values from a nested table returns keys in order
- Nested tables are unbounded, meaning they have a dynamic length
- When a new value is added to the nested table array, it's maximum size
  grows
- create a new nested table: `type type_ name as table of value_data_type
  [not null];`

  Again, adding key/values to the table requires `table.extend()`.
  Deleting keys is straightforward:  `table_name.delete(index)`.  To put
  some guard rails around not using non-existent data, we can use the
  convention of `table_name.exists(idx)` to make sure the key value exists
  before using it.

  Examples:

```

      SET SERVEROUTPUT ON;
      DECLARE
        TYPE e_list IS
            TABLE OF employees.first_name%TYPE; -- nested table needs a declared type        
            emps   e_list := e_list();
        idx    PLS_INTEGER := 1;
        BEGIN
        --    emps := e_list('Dave','Allie','Elizabeth');
        --    emps.extend();
        --    emps(4) := 'Bill';
        --    for i in 1..emps.count() loop
        --        dbms_output.put_line(emps(i));
        --    end loop;
        FOR x IN 100..110 LOOP
            emps.extend();
            SELECT
                first_name
            INTO
                emps
            (idx)
            FROM
                employees
            WHERE
                employee_id = x;

            idx := idx + 1;
        END LOOP;

        emps.DELETE(3); -- deleting from nested tables
        FOR i IN emps.first()..emps.count() LOOP 
        IF emps.EXISTS(i) THEN -- same convention as before - check if exists so not to throw error on missing key 
            dbms_output.put_line(emps(i));
        END IF;
        END LOOP;

        END;
```

More Examples:


```
    DECLARE
      TYPE e_list IS TABLE OF VARCHAR2(50);
      emps e_list;
    BEGIN
      emps := e_list('Alex','Bruce','John');
      FOR i IN 1..emps.count() LOOP
        dbms_output.put_line(emps(i));
      END LOOP;
    END;
     
    DECLARE
      TYPE e_list IS TABLE OF VARCHAR2(50);
      emps e_list;
    BEGIN
      emps := e_list('Alex','Bruce','John');
      emps.extend;
      emps(4) := 'Bob';
      FOR i IN 1..emps.count() LOOP
        dbms_output.put_line(emps(i));
      END LOOP;
    END;
     
    DECLARE
      TYPE e_list IS TABLE OF employees.first_name%type;
      emps e_list := e_list();
      idx  PLS_INTEGER:= 1;
    BEGIN
      FOR x IN 100 .. 110 LOOP
        emps.extend;
        SELECT first_name INTO emps(idx) 
        FROM   employees 
        WHERE  employee_id = x;
        idx := idx + 1;
      END LOOP;
      FOR i IN 1..emps.count() LOOP
        dbms_output.put_line(emps(i));
      END LOOP;
    END;
     
    DECLARE
      TYPE e_list IS TABLE OF employees.first_name%type;
      emps e_list := e_list();
      idx  PLS_INTEGER := 1;
    BEGIN
      FOR x IN 100 .. 110 LOOP
        emps.extend;
        SELECT first_name INTO emps(idx) 
        FROM   employees 
        WHERE  employee_id = x;
        idx := idx + 1;
      END LOOP;
      emps.delete(3);
      FOR i IN 1..emps.count() LOOP
        IF emps.exists(i) THEN 
           dbms_output.put_line(emps(i));
        END IF;
      END LOOP;
    END;

```
  
### Associative Arrays (index by tables)

- Two columns - key and value
- they key can be a pls_integer, binary_integer, or string, but the key
  must be unique.  
- Even when using numbers as keys, they must be unique since they are not
  sequential.
-  Negative numbers are allowed as key types
- Associative arrays can have both scalar and record types.
- Associative arrays can house records
- Unlike the other collection types, we do not initialize them like varray
  or nested tables.
- Associative arrays are unbound in length
- Values do not have 2GB size limitation for values
- Note, data can be bound by memory/storage limitation
- Associative arrays are indexed into memory
- varchar key type, is indexed as a B-TREE index
- sometimes suggested to use varchar2 type as key, because pls_integer has
  a different type of indexing.  pls_integer type index can be faster in a
  direct walk, but slower at traversing.  
- using associative arrays can help us work with data faster since it is
  stored in memory versus accessing from table.
- __Note__: cannot create this type in the schema level, only in-memory
-- also known as `inline-tables`

#### Usage of Associative Array Type

`type type_name as table of value_data_type [NOT NULL] INDEX BY
{PLS_INTEGER | BINARY INTEGER | VARCHAR2(size)};`

- `array_name.delete(start,end)`
- `array_name.delete(index)`
- prior() function can be used to reverse. 


### Summary

1. create a type that is a table of with an index
2. declare a variable to contain array
3. create an index with type (like pls_integer)
4. create a foor loop
    1. select into the array
    2. establish the index using array.first(), array.last(), etc.
    3. while index  is not null loop
    4. perform business operations
    5. increment index


### Examples Of Associative Arrays

```
    set serveroutput on;

    declare

        type e_list is table of employees.first_name%type index by pls_integer;
        emps e_list;

    begin
        for x in 100..110 loop
            select first_name into emps(x) from employees where employee_id = x;
        end loop;
        
        for i in emps.first()..emps.last() loop
            if (emps.exists(i)) then
                dbms_output.put_line(emps(i));
            end if;
        end loop;
    end;


    set serveroutput on;

    declare

        type e_list is table of employees.first_name%type index by pls_integer;
        emps e_list;
        idx pls_integer;

    begin
        for x in 100..110 loop
            select first_name into emps(x) from employees where employee_id = x;
        end loop;
        idx := emps.first();
        while idx is not null loop
                dbms_output.put_line(emps(idx));
                idx := emps.next(idx);
        end loop;
    end;

    set serveroutput on;

    declare

        type e_list is table of employees.first_name%type index by varchar2(50);
        emps e_list;
        idx employees.email%type;
        
        v_email employees.email%type;
        v_first_name employees.first_name%type;

    begin
        for x in 100..110 loop
            select first_name,email into v_first_name,v_email from employees where employee_id = x;
            emps(v_email) := v_first_name;
        end loop;
        idx := emps.first();
        while idx is not null loop
                dbms_output.put_line('The email of ' || emps(idx) || ' is: ' || emps(idx));
                idx := emps.next(idx);
        end loop;
    end;
```

Further Examples:

```
/********************* The First Example ********************/
DECLARE
  TYPE e_list IS TABLE OF employees.first_name%TYPE INDEX BY PLS_INTEGER;
  emps e_list;
BEGIN
  FOR x IN 100 .. 110 LOOP
    SELECT first_name 
    INTO   emps(x) 
    FROM   employees 
    WHERE  employee_id = x ;
  END LOOP;
  FOR i IN emps.first()..emps.last() LOOP
    dbms_output.put_line(emps(i));
  END LOOP; 
END;
 
/********* Error Example for the SELECT INTO Clause *********/
DECLARE
  TYPE e_list IS TABLE OF employees.first_name%TYPE INDEX BY PLS_INTEGER;
  emps e_list;
BEGIN
  FOR x IN 100 .. 110 LOOP
    SELECT first_name 
    INTO   emps(x) 
    FROM   employees 
    WHERE  employee_id   = x 
    AND    department_id = 60;
  END LOOP;
  FOR i IN emps.first()..emps.last() LOOP
    dbms_output.put_line(i);
  END LOOP; 
END;
 
/******* Error Example about Reaching an Empty Index ********/
DECLARE
  TYPE e_list IS TABLE OF employees.first_name%TYPE INDEX BY PLS_INTEGER;
  emps e_list;
BEGIN
  emps(100) := 'Bob';
  emps(120) := 'Sue';
  FOR i IN emps.first()..emps.last() LOOP
    dbms_output.put_line(emps(i));
  END LOOP; 
END;
 
/*************************************************************
An Example of Iterating in Associative Arrays with WHILE LOOPs
*************************************************************/
DECLARE
  TYPE e_list IS TABLE OF employees.first_name%TYPE INDEX BY PLS_INTEGER;
  emps e_list;
  idx  PLS_INTEGER;
BEGIN
  emps(100) := 'Bob';
  emps(120) := 'Sue';
  idx       := emps.first;
 
  WHILE idx IS NOT NULL LOOP 
    dbms_output.put_line(emps(idx));
    idx := emps.next(idx);
  END LOOP; 
END;
 
/*************************************************************
An Example of Using String-based Indexes with Associative Arrays
*************************************************************/
DECLARE
  TYPE e_list IS TABLE OF employees.first_name%TYPE INDEX BY employees.email%type;
  emps         e_list;
  idx          employees.email%TYPE;
  v_email      employees.email%TYPE;
  v_first_name employees.first_name%TYPE;
BEGIN
  FOR x IN 100 .. 110 LOOP
    SELECT first_name, email 
    INTO   v_first_name, v_email 
    FROM   employees
    WHERE  employee_id = x;
    emps(v_email) := v_first_name;
  END LOOP;
 
  idx := emps.first;
  WHILE idx IS NOT NULL LOOP 
    dbms_output.put_line('The email of '|| emps(idx) ||' is : '|| idx);
    idx := emps.next(idx);
  END LOOP; 
END;
 
/*** An Example of Using Associative Arrays with Records ****/
DECLARE
  TYPE e_list IS TABLE OF employees%rowtype INDEX BY employees.email%TYPE;
  emps e_list;
  idx  employees.email%type;
BEGIN
  FOR x IN 100 .. 110 LOOP
    SELECT * 
    INTO   emps(x) 
    FROM   employees
    WHERE  employee_id = x;
  END LOOP;
 
  idx := emps.first;
  
  WHILE idx IS NOT NULL LOOP 
    dbms_output.put_line('The email of '      || 
                         emps(idx).first_name || ' '     ||
                         emps(idx).last_name  || ' is : '|| emps(idx).email);
    idx := emps.next(idx);
  END LOOP; 
END;
 
/* An Example of Using Associative Arrays with Record Types */
DECLARE
  TYPE e_type IS RECORD (first_name employees.first_name%TYPE,
                         last_name  employees.last_name%TYPE,
                         email      employees.email%TYPE);
  TYPE e_list IS TABLE OF e_type INDEX BY employees.email%TYPE;
  emps e_list;
  idx  employees.email%type;
BEGIN
  FOR x IN 100 .. 110 LOOP
    SELECT first_name,last_name,email 
    INTO   emps(x) 
    FROM   employees
    WHERE  employee_id = x;
  END LOOP;
 
  idx := emps.first;
 
  WHILE idx IS NOT NULL LOOP
    dbms_output.put_line('The email of '       || 
                          emps(idx).first_name || ' ' ||
                          emps(idx).last_name  || ' is : ' || 
                          emps(idx).email);
    idx := emps.next(idx);
  END LOOP; 
END;
 
/**** An Example of Printing From the Last to the First *****/
DECLARE
  TYPE e_type IS RECORD (first_name employees.first_name%TYPE,
                         last_name  employees.last_name%TYPE,
                         email      employees.email%TYPE);
  TYPE e_list IS TABLE OF e_type INDEX BY employees.email%TYPE;
  emps e_list;
  idx  employees.email%type;
BEGIN
  FOR x IN 100 .. 110 LOOP
    SELECT first_name,last_name, email 
    INTO   emps(x) 
    FROM   employees
    WHERE  employee_id = x;
  END LOOP;
  
  --emps.delete(100,104);
  idx := emps.last;
  
  WHILE idx IS NOT NULL LOOP 
    dbms_output.put_line('The email of '       || 
                          emps(idx).first_name || ' '     ||
                          emps(idx).last_name  ||' is : ' || 
                          emps(idx).email);
    idx := emps.prior(idx);
  END LOOP; 
END;
 
/***** An Example of Inserting with Associative Arrays ******/
CREATE TABLE employees_salary_history 
AS SELECT * FROM employees WHERE 1=2;
 
ALTER TABLE employees_salary_history ADD insert_date DATE;
 
SELECT * FROM employees_salary_history;
/
DECLARE
  TYPE e_list IS TABLE OF employees_salary_history%rowtype INDEX BY PLS_INTEGER;
  emps e_list;
  idx  PLS_INTEGER;
BEGIN
  FOR x IN 100 .. 110 LOOP
    SELECT e.*,'01-JUN-20' 
    INTO   emps(x) 
    FROM   employees e
    WHERE  employee_id = x;
  END LOOP;
  
  idx := emps.first;
  
  WHILE idx IS NOT NULL LOOP 
    emps(idx).salary := emps(idx).salary + emps(idx).salary*0.2;
    INSERT INTO employees_salary_history VALUES emps(idx);
    dbms_output.put_line('The employee '       || emps(idx).first_name ||
                         ' is inserted to the history table');
    idx := emps.next(idx);
  END LOOP; 
END;
/
DROP TABLE employees_salary_history;
```

### Storing Arrays

Using mysql or mariadb, if we have a list of employees with different types
of phone number (i.e., home, work) we would need to create separate tables
for the phone numbers, possibily even type of phone numberers, select and 
join them together. 

In an Oracle database using PL/SQL, it can be easier to use VARRAY or
nested table to do this.  

This can improve performance in some cases because it avoids a costly join.
Especially when the varray data is less than 4 Kilobytes (data is stored in
column).

When we assign a varray as a column to a table, it is considered like any
other data type.  To achieve this, our type must be created and stored at
the schema level.  
__Note__: Oracle does not allow us to save records in the database.  `create or replace type t_phone_number as record (p_type varchar2(10), p_number varchar2(50));` will not work.

We need to create an object type as schema level and we can use them like
records.

#### Example of  storing and retrieving a table:

```
set serveroutput on;

create or replace type t_phone_number as object (p_type varchar2(10), p_number varchar2(50));
/
create or replace type v_phone_numbers as varray(3) of t_phone_number;

create table emps_with_phones (
    employee_id number,
    first_name varchar2(50),
    last_name varchar2(50),
    phone_number v_phone_numbers
    );
    /
    select * from emps_with_phones;
    /
    insert into emps_with_phones values(
        10,'Ally','McCall',v_phone_numbers(t_phone_number('HOME','111.111.1111'),t_phone_number('WORK' ,'222.222.2222'),t_phone_number('MOBILE','333.333.3333'))
    );
     insert into emps_with_phones values(
        12,'Ally','McCall',v_phone_numbers(t_phone_number('HOME','111.111.1111'),t_phone_number('WORK' ,'222.222.2222'))
    );
    /
    select e.first_name,e.last_name,p.p_type,p.p_number from emps_with_phones e, table(e.phone_number) p; -- notice creating aliases
    /
    
declare

begin


end;
```


### Storing Nested Tables In The Database

In the example above, we use phone numbers.  What if we need to add some
extra phone number for each employee?  For example. a fax number.  We can
run into some problems with varrays because they are a bound, fixed-length.
Nested tables can help us with this.  

Examples:

```
/***************** Storing Varray Example *******************/
CREATE OR REPLACE TYPE t_phone_number AS OBJECT(p_type   VARCHAR2(10), 
                                                p_number VARCHAR2(50)
                                               );
/
CREATE OR REPLACE TYPE v_phone_numbers AS VARRAY(3) OF t_phone_number;
/
CREATE TABLE emps_with_phones(employee_id  NUMBER,
                              first_name   VARCHAR2(50),
                              last_name    VARCHAR2(50),
                              phone_number v_phone_numbers);
/
SELECT * FROM emps_with_phones;
/
INSERT INTO emps_with_phones
VALUES(10,'Alex','Brown',v_phone_numbers(t_phone_number('HOME','111.111.1111'),
                                         t_phone_number('WORK','222.222.2222'),
                                         t_phone_number('MOBILE','333.333.3333'))
                                         );
INSERT INTO emps_with_phones
VALUES(11,'Bob','Green',v_phone_numbers(t_phone_number('HOME','000.000.000'),
                                         t_phone_number('WORK','444.444.4444'))
                                         );                                                                
/
 
/*************** Querying the Varray Example ****************/
SELECT e.first_name,
       last_name,
       p.p_type,
       p.p_number 
FROM emps_with_phones e, table(e.phone_number) p;
 
 
/****** The Code For the Storing Nested Table Example *******/
CREATE OR REPLACE TYPE n_phone_numbers AS TABLE OF t_phone_number;
/
CREATE TABLE emps_with_phones2(employee_id  NUMBER,
                               first_name   VARCHAR2(50),
                               last_name    VARCHAR2(50),
                               phone_number n_phone_numbers)
                               NESTED TABLE phone_number STORE AS phone_numbers_table;
/
SELECT * FROM emps_with_phones2;
/
INSERT INTO emps_with_phones2 
VALUES(10,'Alex','Brown',n_phone_numbers(t_phone_number('HOME','111.111.1111'),
                                         t_phone_number('WORK','222.222.2222'),
                                         t_phone_number('MOBILE','333.333.3333'))
                                         );
INSERT INTO emps_with_phones2
VALUES(11,'Bob','Green',n_phone_numbers(t_phone_number('HOME','000.000.000'),
                                        t_phone_number('WORK','444.444.4444'))
                                        );      
/
SELECT e.first_name, last_name, p.p_type, p.p_number 
FROM emps_with_phones2 e, table(e.phone_number) p;
 
/***************** New Insert and Update ********************/
INSERT INTO emps_with_phones2 
VALUES(11,'Bob','Green',n_phone_numbers(t_phone_number('HOME','000.000.000'),
                                        t_phone_number('WORK','444.444.4444'),
                                        t_phone_number('WORK2','444.444.4444'),
                                        t_phone_number('WORK3','444.444.4444'),
                                        t_phone_number('WORK4','444.444.4444'),
                                        t_phone_number('WORK5','444.444.4444'))
                                        );    
SELECT * FROM emps_with_phones2;
 
UPDATE emps_with_phones2 
SET phone_number = n_phone_numbers(t_phone_number('HOME','000.000.000'),
                                   t_phone_number('WORK','444.444.4444'),
                                   t_phone_number('WORK2','444.444.4444'),
                                   t_phone_number('WORK3','444.444.4444'),
                                   t_phone_number('WORK4','444.444.4444'),
                                   t_phone_number('WORK5','444.444.4444'))
WHERE employee_id = 11;
 
/**** Adding a New Value into a Nested Inside of a Table ****/
DECLARE
  p_num n_phone_numbers;
BEGIN
  SELECT phone_number 
  INTO   p_num 
  FROM   emps_with_phones2 
  WHERE  employee_id = 10;
  
  p_num.extend;
  p_num(5) := t_phone_number('FAX','999.99.9999');
  
  UPDATE emps_with_phones2 
  SET    phone_number = p_num
  WHERE  employee_id  = 10;
END;
```

### Working With Cursors In PL/SQL'

Cursors are the pointers that point to the data in memory (context, pga,etc). The server uses implicit cursors to pass us the rest of our data.

### Implicit Cursors vs Explicit cursors

Implicit cursors are created by the database server and managed
automatically.  Cursors can handle select queries.  Every time we select
from the database, an implicit cursor is created and the cursor is
destroyed when the block finishes,or we explicitly finish the cursor.
(Sounds a little like C to me).   

Cursors handle select queries, and fetching data at a memory location.

We can control the cursor in our program. This  is an explicit cursor.  For
example, if we need to operate on some data i.e., salaries for employees,
where me may be updating the salaries for each employee, we can create an
explicit cursor. We can fetch the values by that cursor one by one and
operate on all of the employees one by one.  This makes our work more
efficient because we can load the data into the memory. 

### Collections vs Cursors

Cursors can help manage memory.   There are cases in which there are too
many rows in a database table to load them all at once into a collection.
cit cursors can help solve this problem.  

### Cursor Directional Bounds

You cannot go backwards using cursors.  Forwards is the only direction.
This can be handled by creating a collection from the data at the current
cursor.  

In summary, cursors are the pointers that you can iterate on the data that
is selected.  

## Using Explicit Cursors

Cursors are pointers to the current row in teh active set of data.  With
explicit cursors we can iterate on the current  set of rows one by one.
Cursors are effective when dealing with multi-row results. 

### Anatomy Of A Cursor
- Declare: we ned to declare it with it's select query.  This allocates
  some memory for teh result set. 
- Open the cursor: execution plan is calculated and the data is stored in
  the memory
- Fetch a row - return the current row from the active set of rows.  When
  we fetch a row, the cursor automatically points to the next row in memory 
- Check - methods to see if we have exhausted all the rows
- Close: we can close the cursor ourselves so we can start a new cursor, or
  it is automatically killed by the database server when the block
  finishes.  Closing it ourselves is preferred to better manage memory
- __Note__: After closing a cursor, you can open it again. When you open it, the query that defines the cursor is re-executed.

### An Example Template Of A Cursor
```
declare
    cursor cursor_name is select_statement;
begin
    open cursor_name;
    fetch cursor_name into variables,records, etc.;
    close cursor_name;
```

Example Basic Cursor usage:

```
    declare
      cursor c_emps is select first_name,last_name from employees;
      v_first_name employees.first_name%type;
      v_last_name employees.last_name%type;
    begin
      open c_emps;
      fetch c_emps into v_first_name,v_last_name;
      fetch c_emps into v_first_name,v_last_name;
      fetch c_emps into v_first_name,v_last_name;
      dbms_output.put_line(v_first_name|| ' ' || v_last_name);
      fetch c_emps into v_first_name,v_last_name;
      dbms_output.put_line(v_first_name|| ' ' || v_last_name);
      close c_emps;
    end;
    --------------- cursor with join example
    declare
      cursor c_emps is select first_name,last_name, department_name from employees
                          join departments using (department_id)
                          where department_id between 30 and 60;
      v_first_name employees.first_name%type;
      v_last_name employees.last_name%type;
      v_department_name departments.department_name%type;
    begin
      open c_emps;
      fetch c_emps into v_first_name, v_last_name,v_department_name;
      dbms_output.put_line(v_first_name|| ' ' || v_last_name|| ' in the department of '|| v_department_name);
      close c_emps;
    end;
```
### Using Cursors with Records

Most of the time we use cursors with records.  There are 3 ways to do this. 

### Way #1: The Hard Way

For when data types are very simple, creating a record can be good enough
for who it is for. 

```
set serveroutput on;
declare
type r_emp is record (
    v_first_name employees.first_name%type,
    v_last_name employees.first_name%type
);
v_emp remp;

cursor c_emps is select first_name, last_name from employees;

v_first_name  employees.first_name%type;
v_last_name    employees.last_name%type;

begin

open c_emps;
fetch c_emps into v_emp;
dbms_output.put_line(v_emp.v_first_name || ' ' || v_emp.v_last_name || ' is in department: ' || '');

close c_emps;


end;
```

### Way #2: Using %rowtype

This method works well if there is only one table that needs to be used.
It has some inefficiencies surrounding added memory overhead due to bringing
in additional rows that isn't necessary when working with a small
subset of attributes.  Also, this is not suitable for queries needed more
than one table.  
```
set serveroutput on;
declare

v_emp employees%rowtype;

cursor c_emps is select first_name, last_name from employees;

begin

open c_emps;
fetch c_emps into v_emp.first_name, v_emp.last_name;
dbms_output.put_line(v_emp.first_name || ' ' || v_emp.last_name || ' is in department: ' || '');

close c_emps;


end;
```

### Way #3: Create a record with the cursors rowtype

This is the most useful because our record will have the exact same columns
as our query.  

```
set serveroutput on;
declare

cursor c_emps is select first_name, last_name from employees;
v_emp c_emps%rowtype;

begin

open c_emps;
fetch c_emps into v_emp.first_name, v_emp.last_name;
dbms_output.put_line(v_emp.first_name || ' ' || v_emp.last_name || ' is in department: ' || '');

close c_emps;


end;
```

Further Examples:

```
    declare
      type r_emp is record (  v_first_name employees.first_name%type,
                               v_last_name employees.last_name%type);
      v_emp r_emp;
      cursor c_emps is select first_name,last_name from employees;
    begin
      open c_emps;
      fetch c_emps into v_emp;
      dbms_output.put_line(v_emp.v_first_name|| ' ' || v_emp.v_last_name);
      close c_emps;
    end;
    --------------- An example for using cursors table rowtype
    declare
      v_emp employees%rowtype;
      cursor c_emps is select first_name,last_name from employees;
    begin
      open c_emps;
      fetch c_emps into v_emp.first_name,v_emp.last_name;
      dbms_output.put_line(v_emp.first_name|| ' ' || v_emp.last_name);
      close c_emps;
    end;
    --------------- An example for using cursors with cursor%rowtype.
    declare
      cursor c_emps is select first_name,last_name from employees;
      v_emp c_emps%rowtype;
    begin
      open c_emps;
      fetch c_emps into v_emp.first_name,v_emp.last_name;
      dbms_output.put_line(v_emp.first_name|| ' ' || v_emp.last_name);
      close c_emps;
    end;
```


## Looping With Cursor
 
### 1. Basic Cursor Usage
- Declare a cursor for the desired SQL query.
- Create a variable to hold the fetched row data.
- Open the cursor.
- Start a loop to fetch data from the cursor.
- Fetch a row into the variable.
- Output the relevant fields from the fetched row.
- Repeat until all rows have been processed.
- Close the cursor.

### 2. Using `%NOTFOUND` to Control the Loop
- Declare a cursor for the desired SQL query.
- Create a variable to hold the fetched row data.
- Open the cursor.
- Start a loop to fetch data from the cursor.
- Fetch a row into the variable.
- Check for no more rows using `%NOTFOUND`.
- If rows are found, output the relevant fields from the fetched row.
- Repeat until no more rows are found.
- Close the cursor.

### 3. Using a `WHILE` Loop with Cursor
- Declare a cursor for the desired SQL query.
- Create a variable to hold the fetched row data.
- Open the cursor.
- Fetch the first row into the variable.
- Start a `WHILE` loop that continues while rows are found.
- Output the relevant fields from the fetched row.
- Fetch the next row into the variable.
- End the loop when no more rows are found.
- Close the cursor.

### 4. Using a `FOR` Loop with Cursor
- Declare a cursor for the desired SQL query.
- Create a variable to hold the fetched row data (if needed).
- Open the cursor.
- Use a `FOR` loop to iterate a specified number of times.
- Inside the loop, fetch a row into the variable.
- Output the relevant fields from the fetched row.
- End the loop after the specified number of iterations.
- Close the cursor.

### 5. Using the `FOR..IN` Loop with Cursor
- Declare a cursor for the desired SQL query.
- Use a `FOR..IN` loop to iterate over each row in the cursor.
- Within the loop, output the relevant fields from the current row.
- End the loop automatically after processing all rows.
- No need to explicitly manage cursor closing.

### 6. Using the `FOR..IN` Loop with a Select Statement
- Use a `FOR..IN` loop directly with a SELECT statement to get data.
- Inside the loop, output the relevant fields from the current row.
- End the loop automatically after processing all rows.
- No need to explicitly manage cursor closing.


```
    declare
      cursor c_emps is select * from employees where department_id = 30;
      v_emps c_emps%rowtype;
    begin
      open c_emps;
      loop
        fetch c_emps into v_emps;
        dbms_output.put_line(v_emps.employee_id|| ' ' ||v_emps.first_name|| ' ' ||v_emps.last_name);
      end loop;
      close c_emps;
    end; 
    ---------------%notfound example
    declare
      cursor c_emps is select * from employees where department_id = 30;
      v_emps c_emps%rowtype;
    begin
      open c_emps;
      loop
        fetch c_emps into v_emps;
        exit when c_emps%notfound;
        dbms_output.put_line(v_emps.employee_id|| ' ' ||v_emps.first_name|| ' ' ||v_emps.last_name);
      end loop;
      close c_emps;
    end;
    ---------------while loop example
    declare
      cursor c_emps is select * from employees where department_id = 30;
      v_emps c_emps%rowtype;
    begin
      open c_emps;
      fetch c_emps into v_emps;
      while c_emps%found loop
        dbms_output.put_line(v_emps.employee_id|| ' ' ||v_emps.first_name|| ' ' ||v_emps.last_name);
        fetch c_emps into v_emps;
        --exit when c_emps%notfound;
      end loop;
      close c_emps;
    end;
    ---------------for loop with cursor example
    declare
      cursor c_emps is select * from employees where department_id = 30;
      v_emps c_emps%rowtype;
    begin
      open c_emps;
      for i in 1..6 loop
        fetch c_emps into v_emps;
        dbms_output.put_line(v_emps.employee_id|| ' ' ||v_emps.first_name|| ' ' ||v_emps.last_name);
      end loop;
      close c_emps;
    end;
    ---------------FOR..IN clause example
    declare
      cursor c_emps is select * from employees where department_id = 30;
    begin
      for i in c_emps loop
        dbms_output.put_line(i.employee_id|| ' ' ||i.first_name|| ' ' ||i.last_name);
      end loop;
    end;
    ---------------FOR..IN with select example
    begin
      for i in (select * from employees where department_id = 30) loop
        dbms_output.put_line(i.employee_id|| ' ' ||i.first_name|| ' ' ||i.last_name);
      end loop;
    end;
```

## Cursor with parameters

```
declare
    cursor cursor_name(paramter_name,datatype,...) -- varchar2, not
    varchar2(50)
        is select_statement;
begin
    open cursor_name(parameter_values);
    fetch cursor_name into variables,records,etc.
    close cursor_name;

end;
```

Examples:

```
    declare
      cursor c_emps (p_dept_id number) is select first_name,last_name,department_name 
                        from employees join departments using (department_id)
                        where department_id = p_dept_id;
      v_emps c_emps%rowtype;
    begin
      open c_emps(20);
      fetch c_emps into v_emps;
        dbms_output.put_line('The employees in department of '|| v_emps.department_name|| ' are :');
        close c_emps;
      open c_emps(20);
        loop
          fetch c_emps into v_emps;
          exit when c_emps%notfound;
          dbms_output.put_line(v_emps.first_name|| ' ' ||v_emps.last_name);
        end loop;
      close c_emps;
    end;
    --------------- bind variables as parameters
    declare
      cursor c_emps (p_dept_id number) is select first_name,last_name,department_name 
                        from employees join departments using (department_id)
                        where department_id = p_dept_id;
      v_emps c_emps%rowtype;
    begin
      open c_emps(:b_emp);
      fetch c_emps into v_emps;
        dbms_output.put_line('The employees in department of '|| v_emps.department_name|| ' are :');
        close c_emps;
      open c_emps(:b_emp);
        loop
          fetch c_emps into v_emps;
          exit when c_emps%notfound;
          dbms_output.put_line(v_emps.first_name|| ' ' ||v_emps.last_name);
        end loop;
      close c_emps;
    end;
    ---------------cursors with two different parameters
    declare
      cursor c_emps (p_dept_id number) is select first_name,last_name,department_name 
                        from employees join departments using (department_id)
                        where department_id = p_dept_id;
      v_emps c_emps%rowtype;
    begin
      open c_emps(:b_dept_id);
      fetch c_emps into v_emps;
        dbms_output.put_line('The employees in department of '|| v_emps.department_name|| ' are :');
        close c_emps;
      open c_emps(:b_dept_id);
        loop
          fetch c_emps into v_emps;
          exit when c_emps%notfound;
          dbms_output.put_line(v_emps.first_name|| ' ' ||v_emps.last_name);
        end loop;
      close c_emps;
      
      open c_emps(:b_dept_id2);
      fetch c_emps into v_emps;
        dbms_output.put_line('The employees in department of '|| v_emps.department_name|| ' are :');
        close c_emps;
      open c_emps(:b_dept_id2);
        loop
          fetch c_emps into v_emps;
          exit when c_emps%notfound;
          dbms_output.put_line(v_emps.first_name|| ' ' ||v_emps.last_name);
        end loop;
      close c_emps;
    end;
    --------------- cursor with parameters - for in loops
    declare
      cursor c_emps (p_dept_id number) is select first_name,last_name,department_name 
                        from employees join departments using (department_id)
                        where department_id = p_dept_id;
      v_emps c_emps%rowtype;
    begin
      open c_emps(:b_dept_id);
      fetch c_emps into v_emps;
        dbms_output.put_line('The employees in department of '|| v_emps.department_name|| ' are :');
        close c_emps;
      open c_emps(:b_dept_id);
        loop
          fetch c_emps into v_emps;
          exit when c_emps%notfound;
          dbms_output.put_line(v_emps.first_name|| ' ' ||v_emps.last_name);
        end loop;
      close c_emps;
      
      open c_emps(:b_dept_id2);
      fetch c_emps into v_emps;
        dbms_output.put_line('The employees in department of '|| v_emps.department_name|| ' are :');
        close c_emps;
        
        for i in c_emps(:b_dept_id2) loop
          dbms_output.put_line(i.first_name|| ' ' ||i.last_name);
        end loop;
    end;
    ---------------cursors with multiple parameters
    declare
      cursor c_emps (p_dept_id number , p_job_id varchar2) is select first_name,last_name,job_id,department_name 
                        from employees join departments using (department_id)
                        where department_id = p_dept_id
                        and job_id = p_job_id;
      v_emps c_emps%rowtype;
    begin
        for i in c_emps(50,'ST_MAN') loop
          dbms_output.put_line(i.first_name|| ' ' ||i.last_name|| ' - ' || i.job_id);
        end loop;
        dbms_output.put_line(' - ');
        for i in c_emps(80,'SA_MAN') loop
          dbms_output.put_line(i.first_name|| ' ' ||i.last_name|| ' - ' || i.job_id);
        end loop;
    end;
    --------------- An error example of using parameter name with the column name
    declare
      cursor c_emps (p_dept_id number , job_id varchar2) is select first_name,last_name,job_id,department_name 
                        from employees join departments using (department_id)
                        where department_id = p_dept_id
                        and job_id = job_id;
      v_emps c_emps%rowtype;
    begin
        for i in c_emps(50,'ST_MAN') loop
          dbms_output.put_line(i.first_name|| ' ' ||i.last_name|| ' - ' || i.job_id);
        end loop;
        dbms_output.put_line(' - ');
        for i in c_emps(80,'SA_MAN') loop
          dbms_output.put_line(i.first_name|| ' ' ||i.last_name|| ' - ' || i.job_id);
        end loop;
    end;
```

### Built-In Attributes For Cursors

- %found - returns true if the fetch returns a row
- %notfound - returns true if the most recent fetch returns no row
- %isopen - check to see if the cursor is open and returns true or false
- $rowcount - returns the number of rows fetched up until now - not the
  entire count the query returns

  Some examples:

```
  set serveroutput on;

declare

    cursor c_emps is select * from employees where department_id = 20;
    v_emps c_emps%rowtype;

begin
    if not c_emps%isopen then
        open c_emps;
        dbms_output.put_line('hello');
    end if;
     dbms_output.put_line(c_emps%rowcount);
     fetch c_emps into v_emps;
     dbms_output.put_line(c_emps%rowcount);
     dbms_output.put_line(c_emps%rowcount);
     fetch c_emps into v_emps;
     dbms_output.put_line(c_emps%rowcount);
     close c_emps;
     
     open c_emps;
        loop
            fetch c_emps into v_emps;
            exit when c_emps%notfound or c_emps%rowcount > 5;
             dbms_output.put_line(c_emps%rowcount || ' ' || v_emps.first_name || ' ' || v_emps.last_name);
        end loop;
        close c_emps;
end;
```

  Another example of cursor attributes:

```
      declare
      cursor c_emps is select * from employees where department_id = 50;
      v_emps c_emps%rowtype;
    begin
      if not c_emps%isopen then
        open c_emps;
        dbms_output.put_line('hello');
      end if;
      dbms_output.put_line(c_emps%rowcount);
      fetch c_emps into v_emps;
      dbms_output.put_line(c_emps%rowcount);
      dbms_output.put_line(c_emps%rowcount);
      fetch c_emps into v_emps;
      dbms_output.put_line(c_emps%rowcount);
      close c_emps;
      
      open c_emps;
        loop
          fetch c_emps into v_emps;
          exit when c_emps%notfound or c_emps%rowcount>5;
          dbms_output.put_line(c_emps%rowcount|| ' ' ||v_emps.first_name|| ' ' ||v_emps.last_name);
        end loop;
      close c_emps;
    end;
```

### For UPDATE CLAUSE

SQL uses mutual exclusion to lock rows when making an update operation.
Sometimes, we might want to lock a group of rows until we are finished
doing our work. 

The `FOR UPDATE CLAUSE` is very efficient for updates. The `FOR UPDATE
CLAUSE` locks all of the rows of the `select` query in one step and they
will be locked as soon as we open the cursor.  

They will be unlocked when we commit or rollback.  This locks the rows,
without doing any DML operations.

`FOR UPDATE ClAUSE` is written as the last statement of our select queries.  

If the rows are already locked, normally the cursor waits for these rows to
be unlocked indefinitely.  

This can be managed with `nowait` option.  This will check for any locked
rows, and exit with an error so you can try again later. 

We cannot unlock rows that other users or programs have locked.  This can
cause changes for other users to be removed, deleted, or never committed.  

__Note__: If we join multiple tables in  a cursor and use `FOR UPDATE
CLAUSE`, we lock all the selected rows of all tables.  

This can be managed with `for update of` clause specifying the column
names. 

__Example Of FOR UPDATE clause__:

```
cursor cursor_name(parameter_name datatype,...)
    is select_statement
    for update [of column(s)] [nowait | wait n];
```

```
    grant create session to my_user;
    grant select any table to my_user;
    grant update on hr.employees_copy to my_user;
    grant update on hr.departments to my_user;
    UPDATE EMPLOYEES_COPY SET PHONE_NUMBER = '1' WHERE EMPLOYEE_ID = 100;
    declare
      cursor c_emps is select employee_id,first_name,last_name,department_name
          from employees_copy join departments using (department_id)
          where employee_id in (100,101,102)
          for update;
    begin
      /* for r_emps in c_emps loop
        update employees_copy set phone_number = 3
          where employee_id = r_emps.employee_id; 
      end loop; */
      open c_emps;
    end;
    --------------- example of wait with second
    declare
      cursor c_emps is select employee_id,first_name,last_name,department_name
          from employees_copy join departments using (department_id)
          where employee_id in (100,101,102)
          for update of employees_copy.phone_number, 
          departments.location_id wait 5;
    begin
      /* for r_emps in c_emps loop
        update employees_copy set phone_number = 3
          where employee_id = r_emps.employee_id; 
      end loop; */
      open c_emps;
    end;
    ---------------example of nowait
    declare
      cursor c_emps is select employee_id,first_name,last_name,department_name
          from employees_copy join departments using (department_id)
          where employee_id in (100,101,102)
          for update of employees_copy.phone_number, 
          departments.location_id nowait;
    begin
      /* for r_emps in c_emps loop
        update employees_copy set phone_number = 3
          where employee_id = r_emps.employee_id; 
      end loop; */
      open c_emps;
    end;
```

## WHERE CURRENT OF Clause

use with for update clause. 

__Note__: in each update, we go to the SQL engine, search the related
employee_id with the primary key index, and then do the update.  Primary
keys are fast, but if we use the primary key index, it first gets the
related row from the index, then gets the row id from the column, then does
the update.  

__Note__: we cannot use `where current of` clause with joins,group
functions, etc.  

Examples:

```
    declare
      cursor c_emps is select * from employees 
                        where department_id = 30 for update;
    begin
      for r_emps in c_emps loop
        update employees set salary = salary + 60
              where current of c_emps;
      end loop;  
    end;
    ---------------Wrong example of using where current of clause
    declare
      cursor c_emps is select e.* from employees e, departments d
                        where 
                        e.department_id = d.department_id
                        and e.department_id = 30 for update;
    begin
      for r_emps in c_emps loop
        update employees set salary = salary + 60
              where current of c_emps;
      end loop;  
    end;
    ---------------An example of using rowid like where current of clause
    declare
      cursor c_emps is select e.rowid,e.salary from employees e, departments d
                        where 
                        e.department_id = d.department_id
                        and e.department_id = 30 for update;
    begin
      for r_emps in c_emps loop
        update employees set salary = salary + 60
              where rowid = r_emps.rowid;
      end loop;  
    end;
```

## Reference Cursors (REF Cursors)

Reference cursors are pointers.  Pointers are just variables that hold the
memory addresses of the actual variables. `0x35858494`.

We can send cursors to another platform via reference cursors.  Reference
cursor is not tied to any specific cursor or select query.  We cannot share
a ref cursor, or cursor variable through another server or remote
subprogram.  

- We cannot assign null values to cursor variables
- We cannot use ref cursors in our create table or create view statements
- We cannot store ref cursors in a collection
- We cannot compare cursor variables

`REF` keyword to create new ref cursor. 

### Strong Cursors Vs. Weak Cursors

Restrictive vs non-restrictive cursors.  If we specify a return type, it
becomes a strong ref cursor.  If we don't specify return value for ref
cursor, it becomes a weak cursor.  


`type cursor_type_name is ref cursor [return return_type];`
`v_cursor_var cursor_typee
`open cursor_variable for;`


__Note__: if we are using a table type as a return type of our cursor, we use %rowtype. If we are returning a record type that has a table’s type, we use %type. If we are using a manually created record type, we simply write only the name of the record type. Not %type or %rowtype attributes.




__Note__: `sys_refcursor` is a built in weak reference cursor type that we
can use in any result set between other blocks, subprograms, etc.  

Examples:

```
    declare
     type t_emps is ref cursor return employees%rowtype;
     rc_emps t_emps;
     r_emps employees%rowtype;
    begin
      open rc_emps for select * from employees;
        loop
          fetch rc_emps into r_emps;
          exit when rc_emps%notfound;
          dbms_output.put_line(r_emps.first_name|| ' ' || r_emps.last_name);
        end loop;
      close rc_emps;
    end;
    --------------- in two different queries
    declare
     type t_emps is ref cursor return employees%rowtype;
     rc_emps t_emps;
     r_emps employees%rowtype;
    begin
      open rc_emps for select * from retired_employees;
        loop
          fetch rc_emps into r_emps;
          exit when rc_emps%notfound;
          dbms_output.put_line(r_emps.first_name|| ' ' || r_emps.last_name);
        end loop;
      close rc_emps;
      
      dbms_output.put_line('--------------');
      
      open rc_emps for select * from employees where job_id = 'IT_PROG';
        loop
          fetch rc_emps into r_emps;
          exit when rc_emps%notfound;
          dbms_output.put_line(r_emps.first_name|| ' ' || r_emps.last_name);
        end loop;
      close rc_emps;
    end;
    ---------------Example of using with %type when declaring records first
    declare
      r_emps employees%rowtype;
     type t_emps is ref cursor return r_emps%type;
     rc_emps t_emps;
     --type t_emps2 is ref cursor return rc_emps%rowtype;
    begin
      open rc_emps for select * from retired_employees;
        loop
          fetch rc_emps into r_emps;
          exit when rc_emps%notfound;
          dbms_output.put_line(r_emps.first_name|| ' ' || r_emps.last_name);
        end loop;
      close rc_emps;
      
      dbms_output.put_line('--------------');
      
      open rc_emps for select * from employees where job_id = 'IT_PROG';
        loop
          fetch rc_emps into r_emps;
          exit when rc_emps%notfound;
          dbms_output.put_line(r_emps.first_name|| ' ' || r_emps.last_name);
        end loop;
      close rc_emps;
    end;
    ---------------manually declared record type with cursors example
    declare
      type ty_emps is record (e_id number, 
                             first_name employees.first_name%type, 
                             last_name employees.last_name%type,
                             department_name departments.department_name%type);
     r_emps ty_emps;
     type t_emps is ref cursor return ty_emps;
     rc_emps t_emps;
    begin
      open rc_emps for select employee_id,first_name,last_name,department_name 
                          from employees join departments using (department_id);
        loop
          fetch rc_emps into r_emps;
          exit when rc_emps%notfound;
          dbms_output.put_line(r_emps.first_name|| ' ' || r_emps.last_name|| 
                ' is at the department of : '|| r_emps.department_name );
        end loop;
      close rc_emps;
    end;
    ---------------first example of weak ref cursors
    declare
      type ty_emps is record (e_id number, 
                             first_name employees.first_name%type, 
                             last_name employees.last_name%type,
                             department_name departments.department_name%type);
     r_emps ty_emps;
     type t_emps is ref cursor;
     rc_emps t_emps;
     q varchar2(200);
    begin
      q := 'select employee_id,first_name,last_name,department_name 
                          from employees join departments using (department_id)';
      open rc_emps for q;
        loop
          fetch rc_emps into r_emps;
          exit when rc_emps%notfound;
          dbms_output.put_line(r_emps.first_name|| ' ' || r_emps.last_name|| 
                ' is at the department of : '|| r_emps.department_name );
        end loop;
      close rc_emps;
    end;
    --------------- bind variables with cursors example
    declare
      type ty_emps is record (e_id number, 
                             first_name employees.first_name%type, 
                             last_name employees.last_name%type,
                             department_name departments.department_name%type);
     r_emps ty_emps;
     type t_emps is ref cursor;
     rc_emps t_emps;
     r_depts departments%rowtype;
     --r t_emps%rowtype;
     q varchar2(200);
    begin
      q := 'select employee_id,first_name,last_name,department_name 
                          from employees join departments using (department_id)
                          where department_id = :t';
      open rc_emps for q using '50';
        loop
          fetch rc_emps into r_emps;
          exit when rc_emps%notfound;
          dbms_output.put_line(r_emps.first_name|| ' ' || r_emps.last_name|| 
                ' is at the department of : '|| r_emps.department_name );
        end loop;
      close rc_emps;
      
      open rc_emps for select * from departments;
        loop
          fetch rc_emps into r_depts;
          exit when rc_emps%notfound;
          dbms_output.put_line(r_depts.department_id|| ' ' || r_depts.department_name);
        end loop;
      close rc_emps;
    end;
    ---------------sys_refcursor example
    declare
      type ty_emps is record (e_id number, 
                             first_name employees.first_name%type, 
                             last_name employees.last_name%type,
                             department_name departments.department_name%type);
     r_emps ty_emps;
    -- type t_emps is ref cursor;
     rc_emps sys_refcursor;
     r_depts departments%rowtype;
     --r t_emps%rowtype;
     q varchar2(200);
    begin
      q := 'select employee_id,first_name,last_name,department_name 
                          from employees join departments using (department_id)
                          where department_id = :t';
      open rc_emps for q using '50';
        loop
          fetch rc_emps into r_emps;
          exit when rc_emps%notfound;
          dbms_output.put_line(r_emps.first_name|| ' ' || r_emps.last_name|| 
                ' is at the department of : '|| r_emps.department_name );
        end loop;
      close rc_emps;
      
      open rc_emps for select * from departments;
        loop
          fetch rc_emps into r_depts;
          exit when rc_emps%notfound;
          dbms_output.put_line(r_depts.department_id|| ' ' || r_depts.department_name);
        end loop;
      close rc_emps;
    end;
```

### Exceptions

Exceptions are designed for handling runtime errors.  Pl/SQL encounters an
error and raises an exception.  Anonymous block will output the error.  

#### Exceptions have two main components:
- Error Code: ORA-XXXXX
- Error Message: the human readable error message

#### Sections of code blocks:
- Declaration
- Begin/End Sections
- Exception Section

Exceptions can be raised two ways.  Either the Oracle database server
implicitly raises it, or we can explicitly raise an exception.  

#### Handle Exceptions with three options:
- Trap it with an exception handler
- Directly propogate it to the calling subprogram or environment
- Trap it, do some actions, propogate it to the caller

#### Types of Exceptions in Pl/SQL

- Predefined Oracle Server Errors
- Non-predefined Oracle Server Errors
- User-Defined Errors

```
declare

begin

exception
    when exception_name then

    when others then

end;
```

#### Access Code & Error
- sqlcode
- sqlerrm

#### Some Exception Examples

```
    ----------------- Handling the exception
    declare
      v_name varchar2(6);
    begin
      select first_name into v_name from employees where employee_id = 50;
      dbms_output.put_line('Hello');
    exception
      when no_data_found then
        dbms_output.put_line('There is no employee with the selected id');
    end;
    ----------------- Handling multiple exceptions
    declare
      v_name varchar2(6);
      v_department_name varchar2(100);
    begin
      select first_name into v_name from employees where employee_id = 100;
      select department_id into v_department_name from employees where first_name = v_name;
      dbms_output.put_line('Hello '|| v_name || '. Your department id is : '|| v_department_name );
    exception
      when no_data_found then
        dbms_output.put_line('There is no employee with the selected id');
      when too_many_rows then
        dbms_output.put_line('There are more than one employees with the name '|| v_name);
        dbms_output.put_line('Try with a different employee');
    end;
    ----------------- when others then example
    declare
      v_name varchar2(6);
      v_department_name varchar2(100);
    begin
      select first_name into v_name from employees where employee_id = 103;
      select department_id into v_department_name from employees where first_name = v_name;
      dbms_output.put_line('Hello '|| v_name || '. Your department id is : '|| v_department_name );
    exception
      when no_data_found then
        dbms_output.put_line('There is no employee with the selected id');
      when too_many_rows then
        dbms_output.put_line('There are more than one employees with the name '|| v_name);
        dbms_output.put_line('Try with a different employee');
      when others then
        dbms_output.put_line('An unexpected error happened. Connect with the programmer..');
    end;
    ----------------- sqlerrm & sqlcode example
    declare
      v_name varchar2(6);
      v_department_name varchar2(100);
    begin
      select first_name into v_name from employees where employee_id = 103;
      select department_id into v_department_name from employees where first_name = v_name;
      dbms_output.put_line('Hello '|| v_name || '. Your department id is : '|| v_department_name );
    exception
      when no_data_found then
        dbms_output.put_line('There is no employee with the selected id');
      when too_many_rows then
        dbms_output.put_line('There are more than one employees with the name '|| v_name);
        dbms_output.put_line('Try with a different employee');
      when others then
        dbms_output.put_line('An unexpected error happened. Connect with the programmer..');
        dbms_output.put_line(sqlcode || ' ---> '|| sqlerrm);
    end;
    ----------------- Inner block exception example
    declare
      v_name varchar2(6);
      v_department_name varchar2(100);
    begin
      select first_name into v_name from employees where employee_id = 100;
      begin
        select department_id into v_department_name from employees where first_name = v_name;
        exception
          when too_many_rows then
          v_department_name := 'Error in department_name';
      end;
      dbms_output.put_line('Hello '|| v_name || '. Your department id is : '|| v_department_name );
    exception
      when no_data_found then
        dbms_output.put_line('There is no employee with the selected id');
      when too_many_rows then
        dbms_output.put_line('There are more than one employees with the name '|| v_name);
        dbms_output.put_line('Try with a different employee');
      when others then
        dbms_output.put_line('An unexpected error happened. Connect with the programmer..');
        dbms_output.put_line(sqlcode || ' ---> '|| sqlerrm);
    end;
    /
    select * from employees where first_name = 'Steven';
```


### Non-Predefined Exception Handling

- Unnamed Exceptions  in Oracle 
- Must declare exception with error code and handle them with the names
  that we specify
- Every exception has an error code
- `PRAGMA EXCEPTION_INIT(exception_name, error_code);`
- PRAGMA is a compiler directive/hint

####  An Example Of Using `exception_init` To Handle Non-Predefined Errors

```
    begin
      UPDATE employees_copy set email = null where employee_id = 100;
    end;
    -----------------HANDLING a nonpredefined exception
    declare
      cannot_update_to_null exception;
      pragma exception_init(cannot_update_to_null,-01407);
    begin
      UPDATE employees_copy set email = null where employee_id = 100;
    exception
      when cannot_update_to_null then
        dbms_output.put_line('You cannot update with a null value!');
    end;
```

### Handle User Defined Exceptions & Raise User Defined Exceptions

At times we may need to  handle some exceptions related to our own business
domain / logic.  These exceptions are not an error for the database, but
our own implementation.  This is a good case for a user deffined exception.  

- Specify Exception
- Raise explicitly when needed
- Define: `exception_name EXCEPTION;`

#### Example Of Raised Exceptions

```
/*************** Creating a User defined Exception *****************/
declare
too_high_salary exception;
v_salary_check pls_integer;
begin
  select salary into v_salary_check from employees where employee_id = 100;
  if v_salary_check > 20000 then
    raise too_high_salary;
  end if;
  --we do our business if the salary is under 2000
  dbms_output.put_line('The salary is in an acceptable range');
exception
  when too_high_salary then
  dbms_output.put_line('This salary is too high. You need to decrease it.');
end;
/**************** Raising a Predefined Exception *******************/
declare
  too_high_salary exception;
  v_salary_check pls_integer;
begin
  select salary into v_salary_check from employees where employee_id = 100;
  if v_salary_check > 20000 then
    raise invalid_number;
  end if;
  --we do our business if the salary is under 2000
  dbms_output.put_line('The salary is in an acceptable range');
exception
  when invalid_number then
    dbms_output.put_line('This salary is too high. You need to decrease it.');
end;
/****************** Raising Inside of the Exception ****************/
declare
  too_high_salary exception;
  v_salary_check pls_integer;
begin
  select salary into v_salary_check from employees where employee_id = 100;
  if v_salary_check > 20000 then
    raise invalid_number;
  end if;
  --we do our business if the salary is under 2000
  dbms_output.put_line('The salary is in an acceptable range');
exception
  when invalid_number then
    dbms_output.put_line('This salary is too high. You need to decrease it.');
 raise;
end;
```


### Raise Application Error Procedure

- Sometimes we want to raise an exception outside a block
- `raise_application_error()`
- raises the error to the caller subprogram or application.  Informs the
  caller about our business exceptions. 
- `raise_application_error(error_number,error_message[, TRUE|FALSE]);`
- Third parameter is for error stack. 
- Stops execution of application
- Error number must be between -20000 and - 20999
- Message will be up to 2048 bytes long

#### Examples Of `raise_application_error()`

```
    declare
    too_high_salary exception;
    v_salary_check pls_integer;
    begin
      select salary into v_salary_check from employees where employee_id = 100;
      if v_salary_check > 20000 then
        --raise too_high_salary;
     raise_application_error(-20243,'The salary of the selected employee is too high!');
      end if;
      --we do our business if the salary is under 2000
      dbms_output.put_line('The salary is in an acceptable range');
    exception
      when too_high_salary then
      dbms_output.put_line('This salary is too high. You need to decrease it.');
    end;
    ----------------- raise inside of the exception section
    declare
    too_high_salary exception;
    v_salary_check pls_integer;
    begin
      select salary into v_salary_check from employees where employee_id = 100;
      if v_salary_check > 20000 then
        raise too_high_salary;
      end if;
      --we do our business if the salary is under 2000
      dbms_output.put_line('The salary is in an acceptable range');
    exception
      when too_high_salary then
      dbms_output.put_line('This salary is too high. You need to decrease it.');
      raise_application_error(-01403,'The salary of the selected employee is too high!',true);
    end;
```


