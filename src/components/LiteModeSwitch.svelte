<script lang="ts">
    import LiteModeStore from "../store/LiteModeStore";

    function updateLiteMode() {
        LiteModeStore.set(!$LiteModeStore);
    }
</script>

<div class="switch-container noselect">
    <div class="switch" on:click={updateLiteMode}>
        <div class="lite-mode-{$LiteModeStore ? 'on' : 'off'}" />
    </div>
    <span>lite mode</span>
</div>
