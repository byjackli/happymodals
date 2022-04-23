<script lang="ts">
    import LiteModeStore from "../../store/LiteModeStore";
    import { default as Lite } from "../../views/lite/Examples.svelte";
    import { default as Normal } from "../../views/normal/Examples.svelte";
</script>

{#if $LiteModeStore} <Lite /> {:else} <Normal />{/if}
