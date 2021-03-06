# PostgreSQL

To have launchd start postgresql now and restart at login:

	brew services start postgresql

Or, if you don't want/need a background service you can just run:

	pg_ctl -D /usr/local/var/postgres start

port 5432 is default

## PSQL Admin

	psql postgres
	psql -U myUser

	\q to quit/exit

	\du

## URL in config

	postgresql://localhost/my_database

## Heroku

	DATABASE_URL=postgres://USERNAME:PASSWORD@HOSTNAME:5432/DATABASENAME

Heroku Admin:

	heroku pg:psql postgresql-graceful-74509

Better to use Postico (MacOS) or similar instead.

## Create database

Tip: table names as _singular_ (Company, Person) – https://stackoverflow.com/a/5841297/449227  
e.g. `WHERE person.company_id = company.id`

	CREATE DATABASE my_database;
	GRANT ALL PRIVILEGES ON DATABASE my_database TO YOUR-USER-NAME;
	\connect my_database
	\list my_database

	\list: lists all the databases
	\connect: connect to database
	\dt: list tables in database
	\du: list users

## Rename database

	ALTER DATABASE "db" RENAME TO "newdb";

## Data types

- `serial`: same as `int` (use for relations) except that PostgreSQL will automatically generate and populate values.
- Text:
	- `char(n)`: padded
	- `varchar(n)`
	- `text`
- Numbers:
	- `smallint`: 2-byte signed integer that has a range from -32,768 to 32,767.
	- `int`: a 4-byte integer that has a range from -2,147,483,648 to -2,147,483,647.
	- `real` or float8: double-precision (8-byte) floating-point number.
	- `float(n)`: floating-point number whose precision, at least, n, up to a maximum of 8 bytes.
	- `numeric` or `numeric(p,s)`: real number with p digits with s number after the decimal point. The `numeric(p,s)` is the exact number.
- `boolean`: true/false, t/f
- Time & Date:
	- `timestamptz`: (`DEFAULT now()`) timezone-aware timestamp data type. It is the abbreviation for timestamp with time zone. PostgreSQL’s extension
	- `timestamp`: stores both date and time values.
	- `date`: stores the date values only.
	- `time`: stores the time of day values.
	- `interval`: stores periods of time.
- Binary & JSON:
	- `bytea`: blob binary
	- `json`, jsonb


## Export data

	COPY domain_update TO '/Users/tomsoderlund/Documents/Projects/Weld.io/Development/weld-extensions/site-activity-index/data/domain_update.csv' DELIMITER ',' CSV HEADER;


### From JavaScript to SQL

https://www.npmjs.com/package/pg

		const { Pool } = require('pg')
		const pool = new Pool({ connectionString: config.databaseUrl })

		// const results = await runDatabaseFunction(async (pool) => pool.query(sqlString))
		module.exports.runDatabaseFunction = async function (functionToRun) {
		  // Connect db
		  const client = await pool.connect()
		  // Run function
		  const results = await functionToRun(client)
		  // Release db
		  await client.end()
		  await client.release()
		  return results
		}

Pool:

	const pool = new Pool({
	  connectionString: config.databaseUrl,
	  max: 5,
	  idleTimeoutMillis: 5000,
	  connectionTimeoutMillis: 3000
	})

https://stackoverflow.com/questions/21759852/easier-way-to-update-data-with-node-postgres

Select:

	const getCompany = async function (pool, req, res, next) {
		const sqlString = `SELECT * FROM company WHERE id = $1;`
		const { rows } = await pool.query(sqlString, [req.params.id])
		res.json(rows[0])
	}

Insert:

	// sqlCreate('person', { person values... })
	const sqlCreate = (tableName, object) => {
		const fieldNames = Object.keys(object).join(', ')
		const fieldCounters = Object.keys(object).map((fieldName, index) => `$${index + 1}`).join(', ')
		const text = `INSERT INTO ${tableName}(${fieldNames}) VALUES(${fieldCounters})`
		const values = Object.values(object)
		return { text, values }
	}

Update:

	// sqlUpdate('person', { id: person.id }, { person values... })
	const sqlUpdate = (tableName, query, newValues) => {
		const fieldDefinitions = Object.keys(newValues).map((fieldName, index) => `${fieldName} = ($${index + 2})`).join(', ')
		const queryFieldName = Object.keys(query)[0]
		const text = `UPDATE ${tableName} SET ${fieldDefinitions} WHERE ${queryFieldName}=($1)`
		const values = [Object.values(query)[0], ...Object.values(newValues)]
		return { text, values }
	}


# SQL syntax

## Finding data with SELECT

	SELECT * FROM table WHERE id = 123;

### Complex example

	const sqlString = `SELECT
	font.id, font.name,
	category.name AS category_name,
	source.name AS source_name,
	creator.name AS creator_name
	FROM font
	LEFT JOIN category_font ON (category_font.font_id = font.id)
	LEFT JOIN category ON (category.id = category_font.category_id)
	LEFT JOIN source ON (source.id = font.source_id)
	LEFT JOIN creator ON (creator.id = font.creator_id)
	WHERE true
	${name ? `AND font.name ILIKE '${name}%'` : ''}
	${category ? `AND category.name = '${category}'` : ''}
	${weight ? `AND font.variants ILIKE '%${weight}%'` : ''}
	${source ? `AND source.name = '${source}'` : ''}
	LIMIT 100
	;`

### Wildcard search

	SELECT * FROM table WHERE columnName ILIKE 'A%';
	SELECT * FROM company WHERE name ILIKE '%weld%';
	SELECT * FROM company WHERE website NOT ILIKE 'http%'

	SELECT * FROM person WHERE contact_status_date < '2019-02-09';
	SELECT * FROM updates WHERE date_update BETWEEN '2019-01-05' AND '2019-01-10';

### Multiple values / array

	SELECT * FROM company WHERE name IN ('a', 'steeple', 'the');

### Pagination

	SELECT * FROM company LIMIT 10 OFFSET 30;

### Sorting

	ORDER BY field_name ASC/DESC NULLS FIRST/LAST

### Joins in Select

* `INNER JOIN` (default/just `JOIN`): only show records common to both tables.
* `OUTER JOIN`: all the content of the both tables are merged together either they are matched or not.
* `LEFT JOIN` = `LEFT OUTER JOIN`: select records from the first (left-most) table with matching right table records.
* `RIGHT JOIN` = `RIGHT OUTER JOIN`: select records from the second (right-most) table with matching left table records.

Examples:

	SELECT * FROM weather
	LEFT JOIN city ON (weather.city = city.name);

	SELECT company.id, company.name
	FROM company
	LEFT JOIN company_person ON (company_person.company_id = company.id)
	LEFT JOIN person ON (person.id = company_person.person_id)
	ORDER BY name;

Note: `LEFT` refers to the left table in `ON` statement:

	SELECT * FROM weather LEFT OUTER JOIN city ON (weather.city = city.name);
	SELECT domain.id, name, avg(sai) AS avg_sai FROM domain LEFT OUTER JOIN domain_update ON (domain.id = domain_update.domain_id) GROUP BY domain.id;

### Nested SELECT with ()

	SELECT * FROM (
		SELECT DISTINCT ON (person.id)
		person.*, title,
		FROM person
	) subquery
	WHERE title='CEO';

### UNION to combine/concatenate multiple queries

	SELECT * FROM (
		SELECT
		font.id, name, slug, category_id
		FROM
		similar_font
		LEFT JOIN font ON (similar_font.font2_id = font.id)
		WHERE font1_id = 1643
		
		UNION
		
		SELECT
		font.id, name, slug, category_id
		FROM
		similar_font
		LEFT JOIN font ON (similar_font.font1_id = font.id)
		WHERE font2_id = 1643

	) AS combined
	ORDER BY name;

### COUNT

	COUNT(DISTINCT(field))

Example:

	SELECT
	company.*,
	COUNT(DISTINCT(company_person.person_id)) AS person_count
	FROM company
	LEFT JOIN company_person ON (company_person.company_id = company.id)
	GROUP BY company.id;

## Create - Insert

	INSERT INTO domain (name, site_count) VALUES ('indiska.se', 5) RETURNING id;

Multiple values:

	INSERT INTO domain (name) VALUES ('domain1.se'), ('domain2.se');

## Update

	UPDATE domain SET content_last_update = '2019-01-01 12:00', content_previous_update = null WHERE id=1;

## Delete

	DELETE * from domain;
	DELETE from domain where name = 'formomiljo.se';

## Create a new table

	CREATE TABLE person (
		id serial,
		name varchar(128),
		date_created timestamptz DEFAULT now(),
		PRIMARY KEY (id),
		UNIQUE (name)
	);

### Create a many-to-many relationship table

	CREATE TABLE company (
	  id SERIAL PRIMARY KEY,
	  name character varying(64) UNIQUE
	);

	CREATE TABLE company_person (
	  id SERIAL PRIMARY KEY,
	  company_id integer REFERENCES "company"(id) ON DELETE CASCADE,
	  person_id integer REFERENCES "person"(id) ON DELETE CASCADE
	);

	CREATE UNIQUE INDEX company_person_unique_idx ON company_person(company_id, person_id);

## Modify table: add columns, remove columns

	ALTER TABLE person
	ADD COLUMN company_id integer NOT NULL REFERENCES company(id) ON DELETE CASCADE;

Remove:

	ALTER TABLE domain
	DROP COLUMN "change_fraction";

## Delete table

	DROP TABLE person;

### Cascade delete

If delete Company, then delete Person too:

	CREATE TABLE company(
		id SERIAL PRIMARY KEY,
		name VARCHAR(255) NOT NULL
	);

	CREATE TABLE person(
		id SERIAL PRIMARY KEY,
		name VARCHAR(255) NOT NULL
		company_id INT NOT NULL,
		CONSTRAINT fk_person_company_id FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE CASCADE
	);

Modify existing table:

	ALTER TABLE "domain_update" ADD FOREIGN KEY ("domain_update_domain_id_fkey") REFERENCES "domain"("id") ON DELETE CASCADE;
	ALTER TABLE person ADD CONSTRAINT fk_person_company_id FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE CASCADE;


## Indexes

	CREATE UNIQUE INDEX company_person_unique_idx ON company_person(company_id, person_id);


## Transactions

	BEGIN TRANSACTION;
		CREATE TEMPORARY TABLE t1_backup(a,b);
		INSERT INTO t1_backup SELECT a,b FROM t1;
		DROP TABLE t1;
		CREATE TABLE t1(a,b);
		INSERT INTO t1 SELECT a,b FROM t1_backup;
		DROP TABLE t1_backup;
	COMMIT;


# MySQL


# SQLite

	.exit

## Data/Field Types

http://www.sqlite.org/datatype3.html

Each value stored in an SQLite database (or manipulated by the database engine) has one of the following storage classes:

* `NULL`: The value is a NULL value.
* `INTEGER`: The value is a signed integer, stored in 1, 2, 3, 4, 6, or 8 bytes depending on the magnitude of the value.
* `REAL`: The value is a floating point value, stored as an 8-byte IEEE floating point number.
* `TEXT`: The value is a text string, stored using the database encoding (UTF-8, UTF-16BE or UTF-16LE).
* `BLOB`: The value is a blob of data, stored exactly as it was input.

## Import/Export

	.schema tracks

	.show
	.separator , // or \t
	.import top_30.csv tracks

`.dump ?TABLE? ...`: Dump the database in an SQL text format

`.import FILE TABLE`: Import data from FILE into TABLE
