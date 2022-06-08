# Supabase

https://app.supabase.io/

	yarn add @supabase/supabase-js

## Init

	import { createClient } from '@supabase/supabase-js'
	
	const supabaseUrl = process.env.SUPABASE_URL
	const supabaseKey = process.env.SUPABASE_API_KEY

	export const supabase = createClient(supabaseUrl, supabaseKey)


## Postgres database

### Get data

Note: `JOIN`s are done automatically, no need to specify `category_id` below:

	const { data, error } = await supabase
    .from('event')
    .select(`
      title,
      starts_at,
      category_event (
        category (
          slug
        )
      )
    `)

#### Filtering

	.eq('column', 'Equal to')
	.neq('column', 'Not equal to')
	.is('column', null)
	.gt('column', 'Greater than')
	.lt('column', 'Less than')
	.gte('column', 'Greater than or equal to')
	.lte('column', 'Less than or equal to')
	.like('column', '%CaseSensitive%')
	.ilike('column', '%CaseInsensitive%')
	.in('column', ['Array', 'Values'])
	.cs('array_column', ['array', 'contains'])
	.cd('array_column', ['contained', 'by'])

#### Sorting

	.order('starts_at', { ascending: true })

#### Limit

	.limit(50)

Note: `data` will contain an empty array if nothing found.

### Insert new row

	const { data, error } = await supabase
	  .from('person')
	  .insert(
      [
	      { some_column: 'someValue', other_column: 'otherValue' },
	    ],
      // { upsert: true }
    )

Note: `data` will contain an array of the inserted rows.

### Update rows

	const { data, error } = await supabase
	  .from('person')
	  .update({ other_column: 'otherValue' })
    .match({ id: 4 })

### “Upsert“ (update or insert) rows

	const { data, error } = await supabase
	  .from('users')
	  .upsert({ username: 'supabot' }, { onConflict: 'username' })

### Delete rows

	const { data, error } = await supabase
	  .from('person')
	  .delete()
	  .eq('some_column', 'someValue')

### Run RPC/custom Postgres function/custom SQL query

- https://supabase.com/docs/guides/database/functions
- https://medium.com/@razvanst/how-to-run-custom-sql-queries-using-functions-in-supabase-f81bfab780a7

Creating functions: see [SQL](SQL.md).

Executing the function from JavaScript:

	const { data, error } = await supabase.rpc('my_function', { name: 'Sam Lowry' })

### Location/Geo

https://geoexamples.com/svelte/2021/07/18/svelte-supabase-maps.html/

1. Activate the PostGIS extension at the database → extensions menu
2. Run SQL:

		SELECT AddGeometryColumn ('', 'tablename', 'fieldname', 4326, 'POINT', 2);

#### Set data using SQL

	UPDATE place SET position=ST_SetSRID(ST_MakePoint(59.32045, 18.06914), 4326);

#### Spatial queries

	SELECT name, ST_X(ST_Transform(position, 4326)) as lat, ST_Y(ST_Transform(position, 4326)) as lng FROM place;

https://postgis.net/docs/manual-dev/using_postgis_query.html

#### WKX library

	// Serializing a Point geometry to EWKT
	const ewktString = new wkx.Point(lat, lng, undefined, undefined, 4326).toEwkt()
	// Parsing an EWKT string (Supabase does this automatically in `select`)
	const geometry = wkx.Geometry.parse('SRID=4326;POINT(1 2)')

#### Latitude/longitude

- Lat: 59.318 → 59.319 = ~250 m
- Lon: 18.06 → 18.07 = ~700 m, 18.065 → 066 = ~55 m


## Auth

https://github.com/codingki/react-native-expo-template/tree/master/template-typescript-bottom-tabs-supabase-auth-flow


## Export data from Supabase

	pg_dump postgresql://postgres:PASSWORD@db.SUPABASEPROJECT.supabase.co:5432/postgres > MYPROJECT.sql

## Supabase and TypeScript

package.json scripts:

	"download-api-types": "eval $(grep '^NEXT_PUBLIC_SUPABASE_URL' .env.local) && eval $(grep '^NEXT_PUBLIC_SUPABASE_API_KEY' .env.local) && npx openapi-typescript ${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/?apikey=${NEXT_PUBLIC_SUPABASE_API_KEY} --output types/supabase.ts"

in `global.d.ts`:

	type SupabaseDefinitions = import('./supabase').definitions
	type Company = SupabaseDefinitions['company']

## Supabase and React Native (Expo)

https://supabase.com/docs/guides/with-expo

https://medium.com/@kelvinpompey.me/things-to-look-out-for-using-supabase-with-react-native-9638b23e98c2
