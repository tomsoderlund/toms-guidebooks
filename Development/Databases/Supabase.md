# Supabase

https://app.supabase.io/


## Init

	import { createClient } from '@supabase/supabase-js'
	
	const supabaseUrl = 'https://MYDATABASE.supabase.co'
	const supabaseKey = process.env.SUPABASE_KEY
	export const supabase = createClient(supabaseUrl, supabaseKey)


## Get data

	const { data, error } = await supabase
	  .from('geosearch_place')
	  .select(`
	    place_id,
	    place (id, name),
	    geosearch (reference)
	  `)

## Insert new row

	const { data, error } = await supabase
	  .from('place')
	  .insert(
      [
	      { some_column: 'someValue', other_column: 'otherValue' },
	    ],
      // { upsert: true }
    )

## Update rows

	const { data, error } = await supabase
	  .from('place')
	  .update({ other_column: 'otherValue' })
	  .eq('some_column', 'someValue')

## Delete rows

	const { data, error } = await supabase
	  .from('place')
	  .delete()
	  .eq('some_column', 'someValue')

## Location/Geo

https://geoexamples.com/svelte/2021/07/18/svelte-supabase-maps.html/

1. Activate the PostGIS extension at the database → extensions menu
2. Run SQL:

		SELECT AddGeometryColumn ('', 'tablename', 'fieldname', 4326, 'POINT', 2);


Set data:

    UPDATE place SET position=ST_SetSRID(ST_MakePoint(59.32045, 18.06914), 4326);


### Latitude/longitude

Lat: 59.318 → 59.319 = ~250 m
Lon: 18.06 → 18.07 = ~700 m, 18.065 → 066 = ~55 m
