<script lang="ts">
    import Code from "@byjackli/highlighter";
    import Note from "../../components/Note.svelte";
    export let isolated = true;
</script>

<section class="install">
    {#if isolated}
        <h1 class="h3">Installation</h1>
    {:else}
        <h2 class="h3">Installation</h2>
    {/if}

    <div class="collection">
        <div>
            <div>
                <p>1. Install Happy Modals</p>
                <Code>
                    <span
                        >npm install <span class="token important"
                            >happymodals</span
                        >
                    </span>
                </Code>
            </div>
            <div>
                <p>
                    2. Initialize Modals in your App (preferably in
                    __layout.svelte)
                </p>
                <Code
                    lang="svelte"
                    code={`\<script lang\=\"ts\"\>
        import { init } from \"happymodals\"\;

        init();
    \<\/script\>
            ...
        `}
                />
            </div>
        </div>
    </div>
</section>
