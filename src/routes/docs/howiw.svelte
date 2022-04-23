<script lang="ts">
    import LiteModeStore from "../../store/LiteModeStore";
    import { default as Lite } from "../../views/lite/Howiw.svelte";
    import { default as Normal } from "../../views/normal/Howiw.svelte";
</script>

{#if $LiteModeStore} <Lite /> {:else} <Normal />{/if}
