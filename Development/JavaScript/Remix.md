# Remix

https://remix.run/

## Best practices

### Create Remix folder structure

	# Client
	mkdir -p app/components/scenes
	mkdir -p app/components/page
	mkdir -p app/components/navigation
	mkdir -p app/components/common
	mkdir -p app/components/input
	mkdir -p app/routes/api
	mkdir -p app/hooks
	mkdir -p app/theme
	# Server:
	mkdir -p app/utils
	mkdir -p app/services
	mkdir -p app/loaders
	mkdir -p app/actions
	mkdir -p app/config
	# Public
	mkdir -p public

### How to build a typical CRUD view

- Make a Supabase/Postgres SQL view with all columns you need, e.g. `view_emission_factors`
- Create a file for your page/route (e.g. `app/routes/my-page.tsx`) with this structure:
	1. Load data: `loader` (Remix)
	2. Render: `export default function MyPageName` (React component). You can use `DataTable` to render the list view.
	3. Interactions: `action` (Remix): just returns `genericCrudActions(…)` if just standard CRUD behavior is required.

### Example of a Remix.js page

Structure: `loader`, component, `action`

	import React from 'react';
	import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
	import { useLoaderData, useActionData } from '@remix-run/react';

	export async function loader({ request, params }: LoaderFunctionArgs) {
		return json({ ok: true });
	}

	const ExamplePage: React.FC = () => {
		const loaderData = useLoaderData<typeof loader>();
		const actionData = useActionData<typeof action>();
		return (
			<div>
				Hello World
			</div>
		);
	};
	export default ExamplePage;

	export const action = async ({ request }: ActionFunctionArgs) => {
		if (request.method === 'PUT') {
			const formData = await request.formData();
			const formDataFields = Object.fromEntries(formData);
			// E.g. formDataFields.myProp
			console.log('formDataFields:', formDataFields);
			return json({ success: true });
		}
	};

### Hooks

#### useQueryState

	import { useState, useEffect } from 'react';
	import { useLocation, useNavigate } from '@remix-run/react';

	/**
		import useQueryState from '~/hooks/useQueryState';
		const [chapter, setChapter] = useQueryState('chapter', '1');
	*/
	function useQueryState(key: string, defaultValue: string): [string, (value: string) => void] {
		const location = useLocation();
		const navigate = useNavigate();
		const searchParams = new URLSearchParams(location.search);

		// Get the initial state from the query string or use the default value
		const initialState = searchParams.get(key) ?? defaultValue;

		// State to keep track of the query parameter
		const [state, setState] = useState(initialState);

		// Update the query string and state when the state changes
		const setQueryState = (value: string) => {
			setState(value);
			// Update the query parameter in the URL
			searchParams.set(key, value);
			navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
		};

		// Effect to sync the state with the URL when the component mounts
		useEffect(() => {
			const queryValue = searchParams.get(key);
			if (queryValue === null) {
				// If query param is missing, set it to the default value
				searchParams.set(key, defaultValue);
				navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
			} else {
				// If query param exists, update the state with the value from the URL
				setState(queryValue);
			}
		}, [location.search]);

		return [state, setQueryState];
	}

	export default useQueryState;


## Syntax

### Get URL parameters

Path parameters: `/page/param`:

	params.paramName

Query parameters: `?param=value`:

	const url = new URL(request.url);
	const paramValue = url.searchParams.get('paramName');
