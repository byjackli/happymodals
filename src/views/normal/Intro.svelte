<script lang="ts">
    export let isolated = true;
</script>

<section class="intro">
    <div class="title">
        {#if isolated}
            <h1 class="h4">happy modals</h1>
        {:else}
            <h1 class="h4">happy modals</h1>
        {/if}
        <p>stress-free developer experience + additional features</p>
    </div>
    <ul>
        <li>dynamic import/render</li>
        <li>open and close hooks</li>
        <li>expose closed function</li>
        <li>inherit position</li>
    </ul>
</section>
