<script context="module">
    export async function load(context) {
        return { props: { home: context.url.pathname, doc: context.url.hash } };
    }
</script>

<script lang="ts">
    import { init } from "$lib/store/ModalStore";
    import LiteModeStore from "../store/LiteModeStore";
    import { default as NavMain } from "../components/Nav.svelte";
    // import { default as NavDocs } from "../components/Docs/Nav.svelte";

    export let home: string, doc: string;

    $: path = home;
    $: hash = doc;
    $: update = $LiteModeStore ? undefined : init();
</script>

<NavMain />
<!-- {#if path.match(/(\/docs)+\/*\b(?![%])/)} <NavDocs />{/if} -->

<slot />
