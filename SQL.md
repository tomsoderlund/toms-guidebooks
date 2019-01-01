# PostgreSQL

To have launchd start postgresql now and restart at login:

	brew services start postgresql

Or, if you don't want/need a background service you can just run:

	pg_ctl -D /usr/local/var/postgres start

port 5432 is default

## PSQL Admin

	psql postgres

	\q to quit/exit

	\du

## URL in config

	postgresql://localhost/my_database

## Heroku

	DATABASE_URL=postgres://xudd...

Heroku Admin:

	heroku pg:psql postgresql-graceful-74509 --app my-app

## Create database

Tip: table names as _singular_ (Company, Person) – https://stackoverflow.com/a/5841297/449227  
e.g. `WHERE person.company_id = company.id`

	CREATE DATABASE my_database;
	GRANT ALL PRIVILEGES ON DATABASE my_database TO YOUR-USER-NAME;
	\connect my_database
	\list my_database

	\list: lists all the databases in Postgres
	\connect: connect to a specific database
	\dt: list the tables in the currently connected database
	\du: list users

## Data types

- `serial`: same as `int` (use for relations) except that PostgreSQL will automatically generate and populate values.
- Text:
	- `char(n)`: padded
	- `varchar(n)`
	- `text`
- Numbers:
	- `smallint`: 2-byte signed integer that has a range from -32,768 to 32,767.
	- `int`: a 4-byte integer that has a range from -2,147,483,648 to -2,147,483,647.
	- `float(n)`: floating-point number whose precision, at least, n, up to a maximum of 8 bytes.
	- `real` or float8: double-precision (8-byte) floating-point number.
	- `numeric` or `numeric(p,s)`: real number with p digits with s number after the decimal point. The `numeric(p,s)` is the exact number.
- Time & Date:
	- `timestamptz`: (`DEFAULT now()`) timezone-aware timestamp data type. It is the abbreviation for timestamp with time zone. PostgreSQL’s extension
	- `timestamp`: stores both date and time values.
	- `date`: stores the date values only.
	- `time`: stores the time of day values.
	- `interval`: stores periods of time.
- Binary & JSON:
	- `bytea`: blob binary
	- `json`, jsonb


## Queries

	client.query(sqlString, valuesArray)
		.then()

https://stackoverflow.com/questions/21759852/easier-way-to-update-data-with-node-postgres

### From JavaScript to SQL

Insert:

	const sqlInsert = (tableName, object) => {
		const fieldNames = Object.keys(object).join(', ')
		const fieldCounters = Object.keys(object).map((fieldName, index) => `$${index + 1}`).join(', ')
		const sql = `INSERT INTO ${tableName}(${fieldNames}) VALUES(${fieldCounters})`
		const values = Object.values(object)
		return { sql, values }
	}

Update:

	const sqlUpdate = (tableName, query, newValues) => {
		const fieldDefinitions = Object.keys(newValues).map((fieldName, index) => `${fieldName} = ($${index + 2})`).join(', ')
		const queryFieldName = Object.keys(query)[0]
		const sql = `UPDATE ${tableName} SET ${fieldDefinitions} WHERE ${queryFieldName}=($1)`
		const values = [Object.values(query)[0], ...Object.values(newValues)]
		return { sql, values }
	}

### SQL syntax

	SELECT * FROM table WHERE columnName ILIKE 'R%';

	INSERT INTO domains (name) VALUES ('indiska.se');
	INSERT INTO domains (name) VALUES ('domain1.se'), ('domain2.se');

	UPDATE domains SET content_last_update = null, content_previous_update = null WHERE id=1;

	DELETE * from domains;
	DELETE from domains where name = 'formomiljo.se';

### Joins

	SELECT city, temp_lo, temp_hi, prcp, date, location
		FROM weather, cities
		WHERE city = name;

	SELECT * FROM weather INNER JOIN cities ON (weather.city = cities.name);

Note: `LEFT` refers to the left table in `ON` statement:

	SELECT * FROM weather LEFT OUTER JOIN cities ON (weather.city = cities.name);
	SELECT domains.id, name, avg(sai) AS avg_sai FROM domains LEFT OUTER JOIN domain_updates ON (domains.id = domain_updates.domain_id) GROUP BY domains.id;

## Create table

	CREATE TABLE person (
		id serial,
		name varchar(128),
		date_created timestamptz DEFAULT now(),
		PRIMARY KEY (id),
		UNIQUE (name)
	);

### Create a many-to-many relationship table

	CREATE TABLE company_person (
	  company_id int NOT NULL,
	  person_id int NOT NULL
	);
	CREATE UNIQUE INDEX company_person_idx ON company_person(company_id,person_id);

## Modify table: add columns, remove columns

	ALTER TABLE my_table
	ADD COLUMN email VARCHAR;

	ALTER TABLE domains
	ADD COLUMN page character varying(253);

	ALTER TABLE domains
	DROP COLUMN "change_fraction";

	ALTER TABLE domain_updates
	ADD COLUMN "sai_text" real,
	ADD COLUMN "sai_visual" real;

	ALTER TABLE "domains"
	ADD COLUMN "visual_content_last_update" text,
	ADD COLUMN "visual_content_previous_update" text;


# SQLite

	.exit

## Commands

	DROP TABLE tracks;

	CREATE TABLE tracks(id integer primary key autoincrement, artist varchar(100), title varchar(100), spotify_id varchar(40));
	CREATE TABLE tracks(id bigint, artist varchar(100), title varchar(100), spotify_id varchar(40), isrc varchar(15), popularity integer, year smallint);

	CREATE TABLE tbl1(one varchar(10), two smallint);

	CREATE TABLE genres(
		id integer primary key autoincrement,
		name varchar(40) unique not null
	);

	INSERT INTO tbl1 VALUES('hello!', 10);
	INSERT INTO tbl1 VALUES('goodbye', 20);

	INSERT INTO Persons (P_Id, LastName, FirstName) VALUES (5, 'Tjessem', 'Jakob')

	SELECT * FROM tbl1;

	UPDATE table_name SET column1=value, column2=value2, WHERE some_column=some_value;

	ALTER TABLE employee ADD new_col CHAR(25) DEFAULT '10' NOT NULL;

## Index

	CREATE UNIQUE INDEX index_name ON table_name (column_name);

## Importing

	.schema tracks

	.show
	.separator , // or \t
	.import top_30.csv tracks

## Data/Field Types

http://www.sqlite.org/datatype3.html

Each value stored in an SQLite database (or manipulated by the database engine) has one of the following storage classes:

* `NULL`: The value is a NULL value.
* `INTEGER`: The value is a signed integer, stored in 1, 2, 3, 4, 6, or 8 bytes depending on the magnitude of the value.
* `REAL`: The value is a floating point value, stored as an 8-byte IEEE floating point number.
* `TEXT`: The value is a text string, stored using the database encoding (UTF-8, UTF-16BE or UTF-16LE).
* `BLOB`: The value is a blob of data, stored exactly as it was input.

## Transactions

	BEGIN TRANSACTION;
	CREATE TEMPORARY TABLE t1_backup(a,b);
	INSERT INTO t1_backup SELECT a,b FROM t1;
	DROP TABLE t1;
	CREATE TABLE t1(a,b);
	INSERT INTO t1 SELECT a,b FROM t1_backup;
	DROP TABLE t1_backup;
	COMMIT;

## Import/Export

`.dump ?TABLE? ...`: Dump the database in an SQL text format

`.import FILE TABLE`: Import data from FILE into TABLE
