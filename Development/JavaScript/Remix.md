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

## Syntax

### Get URL parameters

/page/param:

	params.value

?param=value:

	const url = new URL(request.url);
	const supplier = url.searchParams.get('supplier');
