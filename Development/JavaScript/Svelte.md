# Svelte and SvelteKit

https://www.svelte.dev/

    npm create svelte@latest [my-app]
    cd my-app
    yarn && yarn dev

## Reactive declarations

    $: doubled = count * 2

Block:

    $: {
      console.log(`the count is ${count}`);
      alert(`I SAID THE COUNT IS ${count}`);
    }

## Binding input to variable

    <input bind:value={value}>
    <input bind:value>
    <input type=checkbox bind:checked={didApprove}>

## Special tags

    {#if expression}...{:else if expression}...{/if}
    {#each arrayLikeObject as name, index (keyField)}...{/each}
    {#await expression}...{:then name}...{:catch name}...{/await}
    {@html expression}
    {@debug var1, var2, ..., varN}

## Component props

    <script>
      export let myProp
    </script>

## Events

    <button on:click={handleClick}>Click Me</button>
    <div on:mousemove={event => m = { x: event.clientX, y: event.clientY }} />

Modifiers: https://svelte.dev/tutorial/event-modifiers

    <button on:click|preventDefault={handleClick}>Click Me</button>

### Event forwarding to parent

https://svelte.dev/tutorial/dom-event-forwarding

## Component children: <slot> tag

    <div class="box">
      <slot></slot>
    </div>

## onMount

    import { onMount } from 'svelte'

    onMount(async () => {
      const module = await import('my-non-ssr-component')
      MyComponent = module.default
    })

## Context

https://flaviocopes.com/svelte-state-management/

    import { setContext } from 'svelte'
    setContext('someKey', someObject)

    import { getContext } from 'svelte'
    const someObject = getContext('someKey')

## Stores

https://svelte.dev/tutorial/writable-stores

stores.js:

    import { writable } from 'svelte/store'
    export const count = writable(0)

Component:

    import { count } from './stores.js'
    <p>The count is {$count}</p>

## "module" context

https://svelte.dev/tutorial/module-exports

    <script context="module">

## Making components

https://github.com/YogliB/svelte-component-template


## SvelteKit (formerly Sapper)

https://kit.svelte.dev/

    npm init svelte@next MYAPP
    cd MYAPP
    yarn && yarn dev

### Preloading data (server-side)

https://sapper.svelte.dev/docs#Preloading

    <script context="module">
      export function preload({ params, query }) {
        return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
          return { posts }
        })
      }
    </script>

### Stores for page and session:

https://sapper.svelte.dev/docs#Stores

### Sapper on Zeit Now

- https://github.com/beyonk-adventures/now-sapper
- https://github.com/beyonk-adventures/now-sapper-demo

    npx degit beyonk-adventures/now-sapper-demo MYAPP
    cd MYAPP
    yarn && yarn dev

#### 500 ECONNREFUSED error on Zeit Now v2

To fix 500 ECONNREFUSED error on Zeit Now v2:

    export default function zeitNowUrl (path, host = '') {
      const baseUrl = (!process.browser && process.env.NOW_REGION)
        ? `https://${host}`
        : ''
      return `${baseUrl}/${path}`
    }

...and then in each page:

    <script context="module">
      import zeitNowUrl from '../../lib/zeitNowUrl'

      export function preload({ host, params, query }) {
        return this.fetch(zeitNowUrl('blog.json', host)).then(r => r.json()).then(posts => {
          return { posts };
        });
      }
    </script>


# Svelte Native

https://svelte-native.technology/
