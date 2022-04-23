<script lang="ts">
    import LiteModeStore from "../../store/LiteModeStore";
    import Lite from "../../views/Lite.svelte";
    import Normal from "../../views/Normal.svelte";
</script>

{#if $LiteModeStore} <Lite /> {:else} <Normal />{/if}
