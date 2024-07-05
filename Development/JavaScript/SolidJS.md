# SolidJS and SolidStart

	yarn create solid

## Server-side

- `createResource`

### "use server" and createAsync

	import { For } from "solid-js";
	import { createAsync, cache } from "@solidjs/router";

	type User = { name: string; email: string };

	const getUsers = cache(async () => {
		"use server";
		return store.users.list();
	}, "users");

	export const route = {
		load: () => getUsers(),
	};

	export default function Page() {
		const users = createAsync(() => getUsers());
		return <For each={users()}>{(user) => <li>{user.name}</li>}</For>;
	}
