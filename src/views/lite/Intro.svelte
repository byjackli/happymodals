<script lang="ts">
    export let isolated = true;
</script>

<section class="intro">
    <div class="title">
        {#if isolated}
            <h1 class="h4">happy modals (<span class="italics">lite</span>)</h1>
        {:else}
            <h1 class="h4">happy modals (<span class="italics">lite</span>)</h1>
        {/if}
        <p>very stress-free developer experience</p>
    </div>
    <ol>
        <li>add happyModals-lite.js to your project</li>
        <li>add "modal-open" class to an element</li>
        <li>add role="dialog" to the preceeding element</li>
    </ol>
</section>
