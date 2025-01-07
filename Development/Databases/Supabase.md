# Supabase

## Set up new project

- Create new project on https://app.supabase.com/
- Get SQL URL: db.PROJECT.supabase.co, postgres, [password]


## Set up local development

	cd ./supabase

	npx supabase start

Take note of `API URL` and `anon key`. You can also use this to get API keys and URLs:

	npx supabase status

### Development environment

Supabase web admin: http://127.0.0.1:54323/

Postgres connection string for TablePlus/Postico: `postgresql://postgres:postgres@localhost:54322/postgres`

### Get schema and data from cloud database

	npx supabase db pull  # Pull down local db schema from cloud db
	npx supabase db push  # Push up your local db schema to cloud db

Get data:

	npx supabase db dump --data-only -f db_data.sql
	psql --single-transaction --file db_data.sql --dbname 'postgresql://postgres:postgres@localhost:54322/postgres'

### Creating migration of database changes from local machine to server

Edit your local database, then run:

	npx supabase db diff -f [migration-name]
	# Then normally run: npx supabase db push

Running a migration locally:

	npx supabase migration up

Reset database and apply current migrations:

	npx supabase db reset

## Add to project

	yarn add @supabase/supabase-js

## In your code

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
	.neq('column', null)
	.is('column', null)
	.gt('column', 'Greater than')
	.lt('column', 'Less than')
	.gte('column', 'Greater than or equal to')
	.lte('column', 'Less than or equal to')
	.like('column', '%CaseSensitive%')
	.ilike('column', '%CaseInsensitive%')
	.in('column', ['Array', 'Values'])

More filters: https://supabase.com/docs/reference/javascript/using-filters

#### Sorting

	.order('created_at', { ascending: false })

#### Limit

	.limit(50)

Note: `data` will contain an empty array if nothing found.

### Insert new row

	const { data, error } = await supabase
	  .from('person')
	  .insert(
      [
	      { some_column: 'someValue', other_column: 'otherValue' },
	    ]
    )

Note: `data` will contain an array of the inserted rows.

### Update rows

	const { data, error } = await supabase
	  .from('person')
	  .update({ other_column: 'otherValue' })
    .match({ id: 4 })
		.select()

### “Upsert“ (update or insert) rows

	const { data, error } = await supabase
	  .from('users')
	  .upsert({ username: 'supabot' }, { onConflict: 'username' })
		.select()

### Delete rows

	const { data, error } = await supabase
	  .from('event')
	  .delete()
	  .eq('id', eventId)

### Listen to real-time changes in database

https://supabase.com/docs/guides/realtime/postgres-changes

	begin;
		-- remove the supabase_realtime publication
		drop publication if exists supabase_realtime;
		-- re-create the supabase_realtime publication with no tables
		create publication supabase_realtime;
	commit;
	-- add a table to the publication
	alter publication supabase_realtime add table messages;

For UPDATE/DELETE (not just INSERT):

	alter table messages replica identity full;

JS code:

	useEffect(() => {
		console.log('*** user_id=session?.user?.id:', `user_id=${session?.user?.id}`)
		if (session?.user?.id === null) return
		const myArticlesChangeSubscription = supabase
			.from(`articles:user_id=eq.${session?.user?.id}`)
			.on('UPDATE', (payload) => console.log('Supabase UPDATE', payload))
			.on('INSERT', (payload) => console.log('Supabase INSERT', payload))
			.on('DELETE', (payload) => console.log('Supabase DELETE', payload))
			.subscribe()
		const cancelSubscription = async () => await supabase.removeSubscription(myArticlesChangeSubscription)
		return cancelSubscription
	}, [session?.user?.id])

### Run RPC/custom Postgres function/custom SQL query

- https://supabase.com/docs/guides/database/functions
- https://medium.com/@razvanst/how-to-run-custom-sql-queries-using-functions-in-supabase-f81bfab780a7

Creating functions: see [SQL](SQL.md).

Executing the function from JavaScript:

	const { data, error } = await supabase.rpc('my_function', { name: 'Sam Lowry' })

### How to validate my users token on the backend with Supabase

https://github.com/supabase/supabase/issues/491#issuecomment-871863896

1. Frontend sends `session.access_token` (from `supabase.auth.session()`) to backend
2. On the backend you call `const { user } = await supabase.auth.api.getUser(accessToken)` and check that `user !== null`

Example:

	const userFromAccessToken = async (req: NextApiRequest): Promise<UserProfile | undefined> => {
		const accessToken = req.headers?.authorization?.replace('Bearer ', '')
		const { user } = await supabase.auth.api.getUser(accessToken ?? '')
		if (user === null) throw new CustomError('User not authorized', 401)
		if (user?.id !== undefined) return await userProfileObject(user?.id)
		return undefined
	}

### Location/Geo

https://geoexamples.com/svelte/2021/07/18/svelte-supabase-maps.html/

1. Activate the PostGIS extension at the database → extensions menu
2. Run SQL:

		SELECT AddGeometryColumn ('', 'tablename', 'fieldname_maybe_coordinates', 4326, 'POINT', 2);

#### Overview

- ST_MakePoint
- ST_SetSRID(point, 4326): set the coordinate reference system of your geometry
- ST_Transform
- ST_X, ST_Y
- ST_DistanceSphere
- ST_Contains: `WHERE ST_Contains(city.geom, superhero.geom)`

#### Set data using SQL

	INSERT INTO place (name, coordinates) VALUES ('Test', ST_SetSRID(ST_MakePoint(59.32045, 18.06914), 4326));

	UPDATE place SET coordinates=ST_SetSRID(ST_MakePoint(59.32045, 18.06914), 4326) WHERE id = 123;

#### Spatial queries

	SELECT name,
	ST_X(ST_Transform(coordinates, 4326)) as latitude,
	ST_Y(ST_Transform(coordinates, 4326)) as longitude
	FROM place;

	SELECT *
	FROM place
	WHERE ST_DistanceSphere(place.coordinates, ST_MakePoint(59.32045, 18.06914)) <= 1000;

	SELECT * FROM place
	WHERE GeometryType(ST_Centroid(coordinates)) = 'POINT'
	AND ST_DistanceSphere(ST_Point(ST_X(ST_Centroid(coordinates)), ST_Y(ST_Centroid(coordinates))), (ST_MakePoint(59.32045, 18.06914))) <= 1000;

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

### Access token

Client request:

	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		// Auth token
		...(session?.access_token !== undefined && {
			Authorization: `Bearer ${session?.access_token ?? ''}`
		})
	},

Server:

	const accessToken = (req.headers.authorization)?.split('Bearer ')[1]

	const userFromAccessToken = async (accessToken: string): Promise<UserProfile> => {
		const { user } = await supabase.auth.api.getUser(accessToken)
		return await userProfileObject(user?.id)
	}

## Export data from Supabase

	pg_dump postgresql://postgres:PASSWORD@db.SUPABASEPROJECT.supabase.co:5432/postgres > MYPROJECT.sql

## Supabase and TypeScript

package.json scripts:

	"download-api-types": "eval $(grep '^NEXT_PUBLIC_SUPABASE_URL' .env.local) && eval $(grep '^NEXT_PUBLIC_SUPABASE_API_KEY' .env.local) && npx openapi-typescript ${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/?apikey=${NEXT_PUBLIC_SUPABASE_API_KEY} --output types/supabase.ts"

in `global.d.ts`:

	import { Database, Tables } from "./supabase";

	type Something = Tables<"something">;
	type SomethingInsert = Database['public']['Tables']['something']['Insert'];
	type SomethingUpdate = Database['public']['Tables']['something']['Update'];
	type ViewSomething = Database['public']['Views']['view_something']['Row'];
	type FunctionGetSomethingArguments = Database['public']['Functions']['get_something']['Args'];
	type FunctionGetSomethingReturns = Database['public']['Functions']['get_something']['Returns'] | null;
	type SomethingEnum = Database['public']['Enums']['something'];

## Supabase and React Native (Expo)

https://supabase.com/docs/guides/with-expo

https://medium.com/@kelvinpompey.me/things-to-look-out-for-using-supabase-with-react-native-9638b23e98c2

## Performance queries

	SELECT ROUND(mean_exec_time + stddev_exec_time) AS time, query FROM pg_stat_statements ORDER BY time DESC;
