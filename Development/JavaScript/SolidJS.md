# SolidJS and SolidStart

	yarn create solid

## Yarn problems

	ERROR require() of ES Module ./node_modules/string-width/index.js from ./node_modules/wide-align/align.js not supported.
	Instead change the require of index.js in ./node_modules/wide-align/align.js to a dynamic import() which is available in all CommonJS modules.

https://github.com/nuxt/nuxt/issues/21231#issuecomment-2067519752

	yarn set version stable
	yarn install

## Server-side

- `createResource`

### "use server" and createAsync

https://docs.solidjs.com/solid-start/building-your-application/data-loading#data-loading-always-on-the-server

	import { For } from "solid-js";
	import { createAsync, cache } from "@solidjs/router";

	type Post = {
		id: number;
		userId: number;
		title: string;
		body: string;
	};

	const getPosts = cache(async (): Promise<Post[]> => {
		"use server";
		return fetch("https://jsonplaceholder.typicode.com/posts").then((res) => res.json());
	}, "posts");

	export const route = {
		load: () => getPosts(),
	};

	export default function ListPostsPage() {
		const posts = createAsync(() => getPosts());
		return (
			<>
				<For each={posts()}>
					{(post) => <li>{post.title}</li>}
				</For>
			</>
		)
	}

## SolidJS on Vercel

Update `app.config.ts` and add `server: { preset: 'vercel' }`:

	import { defineConfig } from '@solidjs/start/config'

	export default defineConfig({
		server: {
			preset: 'vercel',
			prerender: {
				routes: ['/', '/about', '/serverTest']
				// crawlLinks: true
			}
			// static: true
		}
	})

