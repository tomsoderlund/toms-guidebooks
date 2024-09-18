# Remix

https://remix.run/

## Best practices

### Create Remix folder structure

	# Shared server + client
	mkdir -p app/components/scenes
	mkdir -p app/components/page
	mkdir -p app/components/navigation
	mkdir -p app/components/common
	mkdir -p app/components/input
	mkdir -p app/routes/api
	mkdir -p app/hooks
	mkdir -p app/utils
	mkdir -p app/theme
	# Server only
	mkdir -p app/.server/loaders
	mkdir -p app/.server/actions
	mkdir -p app/.server/services
	mkdir -p app/.server/utils
	mkdir -p app/.server/config
	# Client only
	#mkdir -p app/.client
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

URL and navigation:

- `useParams`: Access route parameters from the URL.
- `useSearchParams`: Read and manipulate query parameters in the URL.
- `useRouteLoaderData`: Get data specific to a particular route from the loader function.
- `useLocation`: Get the current location object with pathname, search, and hash.
- `useHref`: Create a URL string for a given location.
- `useNavigate`: Programmatically navigate to different routes.
- `useNavigation`: Get the current navigation state (e.g., idle, submitting, or loading).
- `useNavigationType`: Determine how the user navigated to the current page (push, pop, or replace).
- `useResolvedPath`: Resolve a relative path against the current location.

Outlet and navigation hierarchy:

- `useOutlet`: Render child routes inside parent routes.
- `useOutletContext`: Access context passed from a parent route’s outlet.
- `useMatches`: Access data from all matched routes in the current render.

Data loading:

- `useLoaderData`: Access the data returned by the loader function for the current route.
- `useRevalidator` 🆕: Revalidate data and manage loading states manually.
- `useRouteError` 🆕: Access errors related to the current route.

Forms and data fetching:

- `useActionData`: Access the result of an action after form submission.
- `useFormAction`: Get the action URL for a form submission.
- `useSubmit`: Programmatically submit a form without user interaction.
- `useFetcher`: Fetch data without causing a page reload, similar to useLoaderData but triggered manually.
- `useFetchers`: Get an array of all active fetchers in the application.

Async:

- `useAsyncValue` 🆕: Access the resolved value from an asynchronous operation.
- `useAsyncError` 🆕: Retrieve error information from an asynchronous operation.

Blockers and navigate away:

- `useBeforeUnload`: Hook to perform actions before the user leaves the page.
- `unstable_useViewTransitionState`: Access the state of view transitions for animations and effects during navigation.
- `useBlocker`: Prevent navigation when certain conditions are met.
- `unstable_usePrompt`: Display a confirmation dialog when navigating away from a page.


## Syntax

### Get URL parameters

#### Path parameters: `/page/param`:

	params.paramName

Client-side:

	const { paramName } = useParams();

#### Query parameters: `?param=value`:

	const url = new URL(request.url);
	const paramValue = url.searchParams.get('paramName');
