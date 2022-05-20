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

	const { data, error } = await supabase
	  .from('company_person')
	  .select(`
	    id,
	    person (id, name, email),
	    company (name, address,
	    	companytype (id, name)
	   	)
	  `)

#### Filtering

	.eq('column', 'Equal to')
	.gt('column', 'Greater than')
	.lt('column', 'Less than')
	.gte('column', 'Greater than or equal to')
	.lte('column', 'Less than or equal to')
	.like('column', '%CaseSensitive%')
	.ilike('column', '%CaseInsensitive%')
	.is('column', null)
	.in('column', ['Array', 'Values'])
	.neq('column', 'Not equal to')
	.cs('array_column', ['array', 'contains'])
	.cd('array_column', ['contained', 'by'])

#### Sorting

	.order('starts_at', { ascending: true })

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

### Run RPC

	const { data, error } = await supabase.rpc('echo_city', { name: 'The Shire' })

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

## Supabase and React Native (Expo)

https://supabase.com/docs/guides/with-expo

https://medium.com/@kelvinpompey.me/things-to-look-out-for-using-supabase-with-react-native-9638b23e98c2
