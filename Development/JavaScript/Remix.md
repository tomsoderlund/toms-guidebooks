# Remix

https://remix.run/

Remix is now: **React Router v7 (Framework Mode)** (https://reactrouter.com/start/modes)

## Start

	npx create-react-router@latest [APPNAME]

Then:

Set up ESLint (using `eslint.config.js`) and Prettier

Vercel: `npm i @vercel/react-router`

`react-router.config.ts`

	import { vercelPreset } from '@vercel/react-router/vite';
	presets: [vercelPreset()],

Shadcn/UI:

	npx shadcn@latest init

Supabase: see `@supabase/ssr` below


Old Remix:

	npx create-remix@latest

Default structure:

	my-remix-app/
		.eslintrc.cjs
		.gitignore
		README.md
		package.json
		postcss.config.js
		tailwind.config.ts
		tsconfig.json
		vite.config.ts
		app/
			entry.client.tsx
			entry.server.tsx
			root.tsx
			routes/_index.tsx
			tailwind.css
		public/
			favicon.ico
			logo-dark.png
			logo-light.png

## Routes

### Filename-based routing using `flatRoutes`

https://reactrouter.com/how-to/file-route-conventions

`npm install @react-router/fs-routes`

Edit `routes.ts`:

	import { type RouteConfig } from "@react-router/dev/routes";
	import { flatRoutes } from "@react-router/fs-routes";
	
	export default flatRoutes() satisfies RouteConfig;

### Route naming

| Symbol  | Purpose                     | Example                   |
| ------- | --------------------------- | ------------------------- |
| `.`     | Folder paths                | `concerts.new-york.tsx`   |
| `_`     | Hidden routes               | `_index.tsx`              |
| `$`     | Dynamic segment             | `$articleSlug.tsx`        |
| `(...)` | Optional routes             | `($lang).$productId.tsx`  |
| `[...]` | Catch-all routes            | `[...all].tsx`            |

## Best practices

- Use filename-based routing using `flatRoutes`.
- Structure a route file like: 1) `loader`, 2) component, 3) `action`.
- Place data handling in `loader`/`action` (server-side).
- Use `Form` (not `form`) and `useFetcher`. If URL changes after action then use `Form`, if not use `useFetcher`.
- Benefit from nested routing, e.g. have navigation/header/footer in higher-level routes.
- Use `ErrorBoundary` on a top-level to display server errors to the user in a friendly way.
- Avoid `useState`. UI state should rather be in URL and use `useParams`/`useSearchParams`. Data state should be in database.
- Use `useNavigation` to show if UI is ready or not.
- Use `Suspense`/`Await` components on complex pages for progressive loading.
- Create a `ButtonLink` component that has the same props as a normal button, plus a `to` prop.
- Install `@vercel/react-router` and use `vercelPreset()` if the app is hosted on Vercel.

import { vercelPreset } from '@vercel/react-router/vite';

### Supabase and Remix (`@supabase/ssr`)

	npm install @supabase/ssr

`loader` function in routes:

	import { createSupabaseServerClient } from "~/services/supabase.server";
	const { supabaseClient } = await createSupabaseServerClient(request);

`services/supabase.server.ts`:

	import { createServerClient, parse, serialize } from '@supabase/ssr';
	import { Database } from './types/supabase';
	
	export const createSupabaseServerClient = (request: Request, useServiceRoleKey?: boolean) => {
	  const cookies = parse(request.headers.get('Cookie') ?? '');
	  const headers = new Headers();
	
	  const supabaseClient = createServerClient<Database>(
	    process.env.SUPABASE_URL!,
	    useServiceRoleKey ? process.env.SUPABASE_SERVICE_ROLE_KEY! : process.env.SUPABASE_ANON_KEY!,
	    {
	      cookies: {
	        get(key) {
	          return cookies[key];
	        },
	        set(key, value, options) {
	          headers.append('Set-Cookie', serialize(key, value, options));
	        },
	        remove(key, options) {
	          headers.append('Set-Cookie', serialize(key, '', options));
	        },
	      },
	    },
	  );
	
	  return { supabaseClient, headers };
	};


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
	import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
	import { useLoaderData, useActionData, useNavigation, Form } from '@remix-run/react';

	export async function loader({ request, params }: LoaderFunctionArgs) {
		return { ok: true };
	}

	const ExamplePage: React.FC = () => {
		const navigation = useNavigation();
		const loaderData = useLoaderData<typeof loader>();
		const actionData = useActionData<typeof action>();
		console.log('Component:', { loaderData, actionData });

		return (
			<Form method='post'>
				<label>
					Enter your name:
					<input type='text' name='name' disabled={navigation.state !== 'idle'} />
				</label>
				<button type='submit' disabled={navigation.state !== 'idle'}>
					Submit
				</button>

				{actionData?.message && <p style={{ marginTop: '1rem' }}>{actionData?.message}</p>}
			</Form>
		);
	};

	export const action = async ({ request }: ActionFunctionArgs) => {
		if (request.method === 'POST') {
			const formData = await request.formData();
			const formDataFields = Object.fromEntries(formData);
			// E.g. formDataFields.myProp
			console.log('formDataFields:', formDataFields);
			return { success: true, message: `Your name is ${formDataFields.name}` };
		}
		return null;
	};

	export default ExamplePage;

### Server-side logic: `loader` and `action`

`loader`:

- Catches `GET` requests.
- In nested routes, all `loader`’s are running.
- `useLoaderData` will only return data from the last `loader`.

`action`:

- Catches `POST`/`PUT`/`PATCH`/`DELETE` requests.

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

### Form vs useFetcher

**TLDR; If URL changes after action then use `Form`, if not use `useFetcher`.**

https://remix.run/docs/en/main/discussion/form-vs-fetcher

(All: triggers server-side `action` + `loader` once)

1. **HTML `<form>`**:
	- Normally: avoid
	- Traditional form submission with navigation to other route and/or full-page reload.
	- Triggers action + loader, **renders on server** + client (2 times)
2. **Remix `<Form>`**:
	- The default form usage in Remix
	- No full page reload, but `loader` runs
	- Can use `redirect` in loader
	- Renders client 6 times (no render on server)
3. **Remix `useFetcher` with `fetcher.Form`**:
	- When a `form` element is suitable, but not navigation to other route or full-page reload.
	- Renders client 6 times, `useActionData` returns `undefined`, instead action data is in `fetcher.data`
	- For AJAX-style form interactions, with a `form` element.
	- No full-page reload; stays on the same page and updates specific components.
4. **Remix `useFetcher` with `fetcher.submit`**:
	- When a `form` element is not suitable.
	- Behaves similarly as `fetcher.Form` above
	- For programmatic control over form submission.
	- Best for scenarios like conditional submissions or button clicks outside of the `form` element.

### `handle` and `useMatches`

https://remix.run/docs/en/main/route/handle

	interface TabHandle {
	  name: string;
	}

	const currentTabHandle = matches.find((m) => m.handle)?.handle as TabHandle;

### Get URL parameters

#### Path parameters: `/page/param`:

	params.paramName

Client-side hook:

	import { useParams } from '@remix-run/react';
	const { paramName } = useParams();

#### Query parameters: `?param=value`:

	const url = new URL(request.url);
	const paramValue = url.searchParams.get('paramName');

Client-side hook:

	import { useSearchParams } from '@remix-run/react';
	const [searchParams] = useSearchParams();
	const myvalueParam = searchParams.get('myvalue');

Setting `searchParams`:

	const [searchParams, setSearchParams] = useSearchParams();

	const handleChangeSection = (sectionId: string): void => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set('section', sectionId);
		setSearchParams(newSearchParams);
	};

	newSearchParams.delete('section');

### useNavigation for browser state

	import { useNavigation } from '@remix-run/react';
	const navigation = useNavigation();

	const formDisabled = navigation.state !== 'idle'; // idle/submitting/loading

	{navigation.state === 'submitting' && <ProgressSpinner />}
	
For POST: idle → submitting → loading → idle

### ButtonLink component

Create a `ButtonLink` component that has the same props as a normal button, plus a `to` prop:

	import React from "react";
	import { Link } from "@remix-run/react";
	import { VariantProps } from "class-variance-authority";

	import { cn } from "~/lib/utils";
	import { buttonVariants } from "./button";

	interface ButtonLinkProps extends VariantProps<typeof buttonVariants> {
		to: string;
		children: React.ReactNode;
		className?: string;
	}

	export const ButtonLink: React.FC<ButtonLinkProps> = ({
		to,
		children,
		variant = "default",
		className,
		...rest
	}) => {
		return (
			<Link
				to={to}
				className={cn(buttonVariants({ variant, ...rest }), className)}
			>
				{children}
			</Link>
		);
	};

### `Suspense`/`Await` components for progressive loading

	import { Suspense } from 'react';
	import { Await } from '@remix-run/react';

	<Suspense fallback={<div>Loading...</div>}>
		<Await resolve={myData}>
			{(myDataResolved) => (
				...
			)}
		</Await>
	</Suspense>

## Tips

### Localization (i18n)

Example: Default and /sv should be Swedish. /en should be English

Store text strings as JSON:

	app/locales/en.json
	app/locales/sv.json

Prefix pages with `($locale).`, e.g:

	app/routes/($locale).about.tsx

Get locale with `useParams`

Add flag icons to page header for easy switching

### `json()` → `data()`

### Merging with Lovable/GPT Engineer

- Hand-merge package.json deps
- Take tailwind.config.ts from GPTE
- @ alias in viteconfig.ts + tsconfig.json
- Optional: Search replace `'@/` to `'~/`
- Move /src to /app
- Change /src to /app in 3 files
- Delete: index.html, App.tsx, App.css, main.tsx
