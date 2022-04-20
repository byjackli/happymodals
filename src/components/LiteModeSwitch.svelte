<script lang="ts">
    import { onMount } from "svelte";

    import LiteModeStore from "../store/LiteModeStore";

    function updateLiteMode() {
        LiteModeStore.set(!$LiteModeStore);
        localStorage.setItem("liteMode", JSON.stringify($LiteModeStore));
    }

    onMount(() => {
        const src = localStorage.getItem("liteMode"),
            mode = src ? JSON.parse(src) : true;

        LiteModeStore.set(mode);
        localStorage.setItem("liteMode", JSON.stringify(mode));
    });
</script>

<div class="switch-container noselect">
    <div class="switch" on:click={updateLiteMode}>
        <div class="lite-mode-{$LiteModeStore ? 'on' : 'off'}" />
    </div>
    <span>lite mode</span>
</div>
