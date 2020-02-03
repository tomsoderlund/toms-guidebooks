# Svelte

https://www.svelte.dev/

## Special tags

    {#if expression}...{:else if expression}...{/if}
    {#each expression as name, index}...{/each}
    {#await expression}...{:then name}...{:catch name}...{/await}
    {@html expression}
    {@debug var1, var2, ..., varN}

## Context and Stores

https://flaviocopes.com/svelte-state-management/

    import { setContext } from 'svelte'
    setContext('someKey', someObject)

    import { getContext } from 'svelte'
    const someObject = getContext('someKey')


## Sapper

https://sapper.svelte.dev/

    npx degit "sveltejs/sapper-template#rollup" MYAPP  # use 'webpack' instead of 'rollup' for Webpack
    cd MYAPP
    yarn && yarn dev

### Sapper on Zeit Now

https://github.com/beyonk-adventures/now-sapper-demo

    npx degit beyonk-adventures/now-sapper-demo MYAPP
    cd MYAPP
    yarn && yarn dev
