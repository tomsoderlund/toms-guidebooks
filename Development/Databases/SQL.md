# PostgreSQL

To have launchd start postgresql now and restart at login:

	brew services start postgresql

Or, if you don't want/need a background service you can just run:

	pg_ctl -D /usr/local/var/postgres start

port 5432 is default

## PSQL Admin

	psql postgres
	psql -d <database_name> -U myUser -W
	
	psql -h <hostname> -p <port_no> -U <db_username> -d <database_name> -W
	psql -h ec2-54-225-89-156.compute-1.amazonaws.com -p 5432 -U pmhuletkaeiyep -d d59asl859nm30e -W
	
	\q to quit/exit
	
	\du

## URL in config

	postgresql://localhost/my_database
	postgresql://localhost/my_database?sslmode=require

## Heroku

	DATABASE_URL=postgres://USERNAME:PASSWORD@HOSTNAME:5432/DATABASENAME

Heroku Admin:

	heroku pg:psql postgresql-graceful-74509

Better to use Postico (MacOS) or similar instead.

## Create database

### Design tips

Tip: table names as _singular_ (Company, Person) – https://stackoverflow.com/a/5841297/449227  
e.g. `WHERE person.company_id = company.id`

### How to create database

First `psql postgres`, then:

	CREATE DATABASE my_database;

Optional:

	GRANT ALL PRIVILEGES ON DATABASE my_database TO yourusername;
	\connect my_database
	\list my_database
	
	\connect: connect to database

List databases

	\list

Delete database

	DROP DATABASE my_database;

### Rename database

	ALTER DATABASE "db" RENAME TO "newdb";

## List tables:

	\dt

List all:

	\dt *.*

## See users

List users:

	\du

Current user:

	SELECT current_user;

Create user

	CREATE USER username [WITH PASSWORD 'password'];

## Data types

- `serial`: same as `int` (use for relations) except that PostgreSQL will automatically generate and populate values.
- Text:
	- `char(n)`: padded
	- `varchar(n)`
	- `text`
- Numbers:
	- `smallint`: 2-byte signed integer that has a range from -32,768 to 32,767.
	- `int`, `integer`: a 4-byte integer that has a range from -2,147,483,648 to -2,147,483,647.
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
- Arrays: `text[]`, `integer[]`: e.g. `SET string_array='{Word 1, Word 2}'`
- Enums: `CREATE TYPE project_status AS ENUM ('not-started');`

## Export data

	COPY domain_update TO './data/domain_update.csv' DELIMITER ',' CSV HEADER;


### From JavaScript to SQL

https://www.npmjs.com/package/pg

**NOTE:** if you have connection timeout issues, try upgrading `pg`:

	yarn remove pg; yarn add pg

Simple client:

	const { Client } = require('pg')

	const postgresOptions = {
		connectionString: config.databaseUrl,
		// max: 10, // default 10
		// connectionTimeoutMillis: 1000, // default 0 = no timeout
		// idleTimeoutMillis: 1000, // default 10000 ms
		// ssl: { rejectUnauthorized: false },
	}

	// const results = await runDatabaseFunction(async (client) => client.query(sqlString))
	const runDatabaseFunction = async function (functionToRun) {
		// Connect db
		const client = new Client(postgresOptions)
		await client.connect()
		// Run function
	    const { rows } = await client.query(sqlString)
		// OR: const results = await functionToRun(client)
		// Release db
		await client.end()
		return results
	}

With connection pooling:

	const { Pool } = require('pg')

	const pool = new Pool(postgresOptions)

	// const results = await runDatabaseFunction(async (client) => client.query(sqlString))
	module.exports.runDatabaseFunction = async function (functionToRun) {
		// Connect db
		const client = await pool.connect()
		// Run function
	    const { rows } = await client.query(sqlString)
		// OR: const results = await functionToRun(client)
		// Release db
		await client.end() // used?
		await client.release()
		return results
	}

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

Tip: you can use `LOWER()` for lowercase formatting.

### Date search

	SELECT * FROM person WHERE contact_status_date < '2019-02-09';
	SELECT * FROM updates WHERE date_update BETWEEN '2019-01-05' AND '2019-01-10';
	                      WHERE date_update::date BETWEEN DATE '2025-04-21' AND DATE '2025-04-27';
	SELECT * FROM books WHERE returned_date > (CURRENT_DATE - INTERVAL '7 days');
	SELECT * FROM users WHERE created_at < (CURRENT_DATE - INTERVAL '7 days');

Last month:

	WHERE o.delivery_date >= date_trunc('month', CURRENT_DATE - INTERVAL '1 month') AND o.delivery_date < date_trunc('month', CURRENT_DATE)

### Rounding numbers

	SELECT ROUND(your_column::numeric, 2) AS rounded_value FROM your_table;

### Multiple values / array

	SELECT * FROM company WHERE name IN ('a', 'steeple', 'the');

	SELECT * FROM document WHERE accessing_user_ids @> ARRAY['4601ab73-d742-429e-b8e3-ba349725e5f5']::uuid[]

### Pagination

	SELECT * FROM company LIMIT 10 OFFSET 30;

### Sorting

	ORDER BY field_name ASC/DESC NULLS FIRST/LAST

### Replace NULL with something else

	SELECT COALESCE(phone_number, 'No Phone') AS phone_number FROM employees;

### Joins in SELECT

| **JOIN Type**      | **Includes Matching Rows (from both tables)** | **Includes Unmatched Rows (Left Table)** | **Includes Unmatched Rows (Right Table)** |
|--------------------|-----------------------------------------------|------------------------------------------|-------------------------------------------|
| **INNER JOIN** (or just **JOIN**)     | ✅ Yes                                        | ❌ No                                     | ❌ No                                      |
| **LEFT JOIN**      | ✅ Yes                                        | ✅ Yes                                    | ❌ No                                      |
| **RIGHT JOIN**     | ✅ Yes                                        | ❌ No                                     | ✅ Yes                                     |
| **FULL OUTER JOIN**| ✅ Yes                                        | ✅ Yes                                    | ✅ Yes                                     |

Examples:

	SELECT * FROM weather
	LEFT JOIN city ON (weather.city = city.name);
	
	SELECT company.id, company.name, person.name
	FROM company
	LEFT JOIN company_person ON (company_person.company_id = company.id)
	LEFT JOIN person ON (person.id = company_person.person_id)
	ORDER BY company.name;

Note: `LEFT` refers to the left table in `ON` statement:

	SELECT * FROM weather LEFT OUTER JOIN city ON (weather.city = city.name);
	SELECT domain.id, name, avg(sai) AS avg_sai FROM domain LEFT OUTER JOIN domain_update ON (domain.id = domain_update.domain_id) GROUP BY domain.id;

Lateral join:

	SELECT company.id, company.name, person.id, person.name
	FROM company
	LEFT JOIN LATERAL (
	SELECT id, name
	FROM person
	WHERE company_id=company.id
	LIMIT 1
	) person ON TRUE;

### COUNT(), AVG() and SUM()

	-- Lowest/Highest
	CONCAT(LEAST(from_city, to_city), ' ↔ ', GREATEST(from_city, to_city)) AS journey,

### CASE (conditional, like IF)

	CASE
		WHEN condition1 THEN result1
		WHEN conditionN THEN resultN
		ELSE result
	END;

as part of `SELECT`:

	(CASE WHEN user.id IS NOT NULL THEN user_profile.name ELSE null END) AS user_name

	(CASE WHEN username IS NOT NULL THEN username ELSE CAST(article.user_id AS varchar) END) AS user
	INITCAP(CASE WHEN product.name ILIKE brand.name || '%' THEN product.name ELSE CONCAT(brand.name, ' ', product.name) END) AS product_name

Update with `RANDOM()`:

	UPDATE "order" SET owner_id = (CASE WHEN RANDOM() < 0.5 THEN 21 ELSE 12 END);

### Nested SELECT with ()

	SELECT * FROM (
	SELECT DISTINCT ON (person.id)
		person.*,
		title
	FROM person
	) subquery
	WHERE title='CEO';

### UNION to combine/concatenate multiple queries

Note: column types must match in the same order.

	SELECT * FROM (
	(
		SELECT font.id, name, slug, category_id
		FROM similar_font
		LEFT JOIN font ON (similar_font.font2_id = font.id)
		WHERE font1_id = 1643
	)
	UNION
	(
		SELECT font.id, name, slug, category_id
		FROM similar_font
		LEFT JOIN font ON (similar_font.font1_id = font.id)
		WHERE font2_id = 1643
	)		
	) AS combined_query
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

### String replacement

	SELECT REPLACE(column_name, 'search_string', 'replace_string') FROM table_name;

### String concatenation (STRING_AGG not CONCAT)

	STRING_AGG(DISTINCT(category.name), ',') AS category_names

Simpler concatenation

	SELECT CONCAT('SQL', ' is', ' fun!') as longer_string;

### Array concatenation (ARRAY_AGG)

	ARRAY_AGG(category.name) AS category_names
	ARRAY_AGG(DISTINCT(category.name)) AS unique_category_names

### Recursive query

	WITH RECURSIVE category_tree AS (
	-- Anchor member: starting point
	SELECT id, name, parent_category_id
	FROM category
	WHERE id = 22 -- <- Change starting category ID here
	UNION ALL
	-- Recursive member: find parent categories recursively
	SELECT c.id, c.name, c.parent_category_id
	FROM category c
	JOIN category_tree ct ON c.id = ct.parent_category_id
	)
	-- Select all parent categories, including the starting point
	SELECT * FROM category_tree;

### Analytics/Statistics query

	SELECT
	TO_CHAR(created_date, 'IW') AS period_name,
	COUNT(*) AS total_orders
	FROM
	"order"
	WHERE
	(selected_owner_id IS NULL OR selected_owner_id = "order".owner_id)
	AND created_date >= start_date
	AND created_date <= end_date
	GROUP BY
	period_name
	ORDER BY
	period_name;

## Create - Insert

	INSERT INTO domain (name, site_count)
	VALUES ('indiska.se', 5) RETURNING id;

Multiple values:

	INSERT INTO domain (name, count)
	VALUES ('domain1.se', 2), ('domain2.se', 3);

## Upsert

	INSERT INTO "${tableName}" (${keyFieldNames}, ${otherFieldNames.join(', ')})
	VALUES (${allFieldValues.join(', ')})
	ON CONFLICT (${keyFieldNames})
	DO UPDATE SET ${otherFieldNames.map(fieldName => `${fieldName} = EXCLUDED.${fieldName}`).join(', ')};

## Update

	UPDATE domain
	SET
	content_last_update = '2019-01-01 12:00',
	content_previous_update = null
	WHERE id = 1;

## Delete

	DELETE FROM domain WHERE name = 'formomiljo.se';

## List tables

	SELECT 
	CONCAT(tables.table_schema, '.', tables.table_name) as schema_and_table
	FROM information_schema.tables tables 
	WHERE
	tables.table_type = 'BASE TABLE' -- Exclude views
	AND tables.table_schema IN ('public', 'basejump', 'auth')
	-- AND tables.table_name ILIKE 'account%' -- NOTE: change here to see other tables
	ORDER BY tables.table_schema ASC, tables.table_name ASC;

With columns:

	SELECT 
	CONCAT(columns.table_schema, '.', columns.table_name) as schema_and_table,
	columns.column_name,
	columns.data_type as column_data_type
	-- columns.character_maximum_length, 
	-- columns.is_nullable, 
	-- columns.column_default 
	FROM information_schema.columns columns
	JOIN information_schema.tables tables 
	ON columns.table_name = tables.table_name 
	AND columns.table_schema = tables.table_schema
	WHERE tables.table_type = 'BASE TABLE' -- Exclude views
	AND columns.table_schema IN ('public', 'basejump', 'auth')
	-- AND columns.table_name ILIKE 'account%' -- NOTE: change here to see other tables
	ORDER BY columns.table_schema DESC, columns.table_name ASC;

## Create a new table

	CREATE TABLE person (
		id serial,
		name varchar(128),
		date_created timestamptz DEFAULT now(),
		PRIMARY KEY (id),
		UNIQUE (name)
	);

### Create a many-to-many relationship table

	CREATE TABLE company_person (
		company_id integer REFERENCES "company"(id) ON DELETE CASCADE,
		person_id integer REFERENCES "person"(id) ON DELETE CASCADE
	);

	CREATE UNIQUE INDEX company_person_unique_idx ON company_person(company_id, person_id);

### Custom types: TYPE/ENUM, DOMAIN/CHECK

TYPE/ENUM:

	CREATE TYPE project_status AS ENUM (
		'not-started',
		'in-progress',
		'in-review',
		'completed'
	);
	CREATE TABLE project (
		status project_status NOT NULL
	);
	ALTER TABLE project
		ADD COLUMN status project_status NOT NULL DEFAULT 'not-started';

DOMAIN/CHECK:

	CREATE DOMAIN valid_period_months AS integer CHECK (VALUE IN (1, 3, 6, 12));
	CREATE TABLE my_table (
	period valid_period_months
	);

### Create table with flexible dates

	CREATE TABLE flexi_date (
	id SERIAL PRIMARY KEY,
	year SMALLINT NOT NULL CHECK (year >= 1970 AND year <= 2300),
	month SMALLINT CHECK (month >= 1 AND month <= 12),
	day SMALLINT CHECK (day >= 1 AND day <= 31),
	quarter SMALLINT CHECK (quarter >= 1 AND quarter <= 4)
	);

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

	CREATE UNIQUE INDEX event_unique_uuid ON event (uuid);

	CREATE UNIQUE INDEX company_person_unique_idx ON company_person(company_id, person_id);

## Views and Materialized Views

	CREATE [MATERIALIZED] VIEW my_view AS (
	your query here
	)

	CREATE OR REPLACE VIEW my_view AS (
	your query here
	)

Refresh materialized view (view with stored results):

	REFRESH MATERIALIZED VIEW my_view

Delete view:

	DROP [MATERIALIZED] VIEW IF EXISTS my_view;

## Transactions

	BEGIN TRANSACTION;
	CREATE TEMPORARY TABLE t1_backup(a,b);
	INSERT INTO t1_backup SELECT a,b FROM t1;
	DROP TABLE t1;
	CREATE TABLE t1(a,b);
	INSERT INTO t1 SELECT a,b FROM t1_backup;
	DROP TABLE t1_backup;
	COMMIT;

## Functions (RPC)

- https://supabase.com/docs/guides/database/functions

In SQL:

	CREATE OR REPLACE FUNCTION my_function(name text)
	RETURNS TEXT
	LANGUAGE plpgsql -- or 'sql'
	AS $$
	SELECT 'Hello World!', name;
	$$;

Executing the function from SQL:

	SELECT * FROM my_function('Sam Lowry');

View a function:

	SELECT pg_get_functiondef('my_function'::regproc);

In `psql`: \df+ my_function

List all functions:

	SELECT
		routine_schema AS schema,
		routines.routine_name AS name,
		ARRAY_AGG(parameters.parameter_name ORDER BY parameters.ordinal_position) AS parameter_names,
		ARRAY_AGG(parameters.data_type ORDER BY parameters.ordinal_position) AS parameter_types,
		routines.data_type AS return_type
	FROM information_schema.routines
	LEFT JOIN information_schema.parameters ON routines.specific_name = parameters.specific_name
	WHERE routine_type = 'FUNCTION'
		AND parameters.parameter_mode = 'IN'
		AND routine_schema = 'public'
		-- AND routines.routine_name ILIKE '%order%'
	GROUP BY routine_schema, routines.routine_name, routines.data_type
	ORDER BY routines.routine_name;

Delete a function:

	DROP FUNCTION my_function;

Example: return SETOF

	CREATE OR REPLACE FUNCTION get_planets()
	RETURNS SETOF planets
	LANGUAGE plpgsql
	AS $$
	SELECT * FROM planets;
	$$;

Example with custom `RETURNS TABLE` definition:

	CREATE OR REPLACE FUNCTION public.get_order(_orderid integer)
	RETURNS TABLE (
	orderid integer,
	transportername text,
	orderednumberofitems decimal
	)
	LANGUAGE plpgsql
	AS $$
	BEGIN
	RETURN query
	SELECT
		orderid,
		transportername,
		orderednumberofitems
	FROM orders
	WHERE orderid = _orderid;
	END;
	$$;


Example: `add_geometry`:

	CREATE OR REPLACE FUNCTION add_geometry (location_name varchar, lon float, lat float)
	RETURNS SETOF geometries
	LANGUAGE plpgsql
	AS $
	DECLARE
		return_record geometries%rowtype;
	BEGIN
		INSERT INTO geometries(location_name, geom)
		VALUES (location_name, ST_SETSRID(ST_MAKEPOINT(lon, lat), 4326))
		RETURNING *
		INTO return_record;

		RETURN NEXT return_record;
	END
	$;

Example: `app.id_generator`:

	CREATE OR REPLACE FUNCTION app.id_generator(OUT result bigint)
	RETURNS bigint
	LANGUAGE plpgsql
	AS $$
	DECLARE
		our_epoch bigint := 1111111111111;
		seq_id bigint;
		now_millis bigint;
		-- the id of this DB shard, must be set for each
		-- schema shard you have - you could pass this as a parameter too
		shard_id int := 1;
	BEGIN
		SELECT nextval('app.global_id_sequence') % 1024 INTO seq_id;
		SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
		result := (now_millis - our_epoch) << 23;
		result := result | (shard_id << 10);
		result := result | (seq_id);
	END;
	$$;

### Create temporary table

	CREATE TEMPORARY TABLE temp_order AS
		SELECT * FROM public."order"
		WHERE delivery_date = '2025-01-01';

### Errors and logging

	RAISE NOTICE 'Inserting for zipcode_id % and district_node_id %', NEW.from_zipcode_id, NEW.to_district_node_id;

In seed file:

	DO $$ BEGIN RAISE NOTICE '** Notice 01'; END $$;

Levels (in order of severity):
- RAISE DEBUG – very detailed, usually suppressed unless debugging
- RAISE NOTICE – info messages
- RAISE WARNING – something might be wrong
- RAISE EXCEPTION – throws an actual error

Only RAISE EXCEPTION interrupts the function, the others just print messages to the client or logs.

### Triggers

	-- Create new
	CREATE OR REPLACE FUNCTION add_account_category_user()
	RETURNS TRIGGER AS $$
	BEGIN
	-- Insert the corresponding row into account_category_user
	INSERT INTO public.account_category_user (account_id, category_id, user_id, account_role)
	SELECT
		NEW.account_id,
		NEW.category_id,
		a.primary_owner_user_id,
		'owner'::public.account_role
		FROM
			basejump.accounts a
	WHERE
		a.id = NEW.account_id
	ON CONFLICT (account_id, category_id, user_id) DO NOTHING;
	RETURN NEW;
	END;
	$$ LANGUAGE plpgsql;

	CREATE TRIGGER trigger_add_account_category_user
	AFTER INSERT ON public.account_category
	FOR EACH ROW
		EXECUTE FUNCTION add_account_category_user();

	-- Cleanup trigger: delete account_category_user rows when account_category is deleted

	CREATE OR REPLACE FUNCTION delete_account_category_user_trigger()
	RETURNS TRIGGER AS $$
	BEGIN
	-- Delete the corresponding rows from account_category_user
	DELETE FROM public.account_category_user
	WHERE account_id = OLD.account_id
		AND category_id = OLD.category_id;
	RETURN OLD;
	END;
	$$ LANGUAGE plpgsql;

	CREATE TRIGGER trigger_delete_account_category_user
	AFTER DELETE ON public.account_category
	FOR EACH ROW
		EXECUTE FUNCTION delete_account_category_user_trigger();

### `DO $$` blocks (one-off functions)

	DO $$
	DECLARE
		r RECORD;
		v_customer_id UUID;
	BEGIN
		-- add code here
	END $$;

## Schemas (namespaces)

	SELECT table_name
	FROM information_schema.tables
	WHERE table_schema = 'public';

Move to another schema:

	ALTER TABLE public.my_table
	SET SCHEMA company.departments;


## Roles (users and groups), permissions, RLS

### Users

	SELECT current_user;

### Permissions (privileges)

See permissions:

	SELECT table_name, grantee, privilege_type
	FROM information_schema.role_table_grants
	WHERE table_name = 'my_table';

Grant permissions:

	GRANT DELETE ON TABLE my_table TO anon;

### Row-level security (RLS)

	SELECT relname, relrowsecurity
	FROM pg_class
	WHERE relname = 'my_table';


## Export/dump data

	pg_dump mydatabase > mydatabase_dump.sql

	PGPASSWORD="your_password" pg_dump -U username -h localhost -p 5432 -t public.tablename mydatabase > tablename_dump.sql
	pg_dump --no-owner --no-acl --data-only --inserts -d mydatabase -t public.tablename > tablename_dump.sql

One table INSERT:

	pg_dump -h localhost -p 54332 -U postgres -d postgres -t tablename -F p --column-inserts -f tablename_dump.sql

Restore:

	psql -U [username] -h [hostname] -p [port] -d [destination_database] < [dumpfile.sql]


# MySQL

	mysql -p -e "CREATE DATABASE yourdatabase;"
	mysql -u username -p -e "CREATE DATABASE yourdatabase;"

## Import data

	mysql -u username -p yourdatabase < mydatabase_dump.sql

## MySQL SQL syntax

### Create index

	ALTER TABLE company_person
	ADD CONSTRAINT unique_company_person UNIQUE (company_id, person_id);

### Views

	SHOW CREATE VIEW view_name;

	CREATE OR REPLACE VIEW view_name AS
	SELECT...

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
