# SolidJS and SolidStart

	yarn create solid

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

	export default function Page() {
		const posts = createAsync(() => getPosts());
		return (
			<>
				<For each={posts()}>
					{(post) => <li>{post.title}</li>}
				</For>
			</>
		)
	}
