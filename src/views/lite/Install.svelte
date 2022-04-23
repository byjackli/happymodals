<script lang="ts">
    import Code from "@byjackli/highlighter";
    export let isolated = true;
</script>

<section class="install">
    {#if isolated}
        <h1 class="h3">Installation</h1>
    {:else}
        <h2 class="h3">Installation</h2>
    {/if}
    <p>
        Don't worry, no matter what method you choose, installing and setting up
        your project is also stress-free.
    </p>
    <div class="collection">
        <div>
            <h3 class="h4">Option 1.</h3>
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
                <p>2. Initialize Modals in your App</p>
                <Code
                    lang="svelte"
                    code={`\<script lang\=\"ts\"\>
            import { initModalLite as ModalLite } from \"happymodals\"\;
            import { onMount } from \"svelte\"\;
    
            onMount(() \=\> initModals())\;
        \<\/script\>
            ...
        `}
                />
            </div>
        </div>
        <div>
            <h3 class="h4">Option 2a. (self host)</h3>
            <div>
                <p>
                    1. Download single <a
                        href="https://raw.githubusercontent.com//byjackli/happymodals/tree/main/src/lib/components/ModalLite.js"
                        rel="noreferrer"
                        download>source file</a
                    >
                </p>
            </div>
            <div>
                <p>2. Add file to headers.</p>
                <Code
                    lang="html"
                    code={`
            <html>
                <head>
                    <script type="text/javascript" src="location_of_file"/>
                </head>
                <body>
                    ...
                </body>
            </html>
        `}
                />
            </div>
        </div>
        <div>
            <h3 class="h4">Option 2b. (CDN)</h3>
            <div>
                <p>1. Add file to headers.</p>
                <Code
                    lang="html"
                    code={`
            <html>
                <head>
                    <script type="text/javascript" src="https://raw.githubusercontent.com//byjackli/happymodals/tree/main/src/lib/components/ModalLite.js" />
                </head>
                <body>
                    ...
                </body>
            </html>
        `}
                />
            </div>
        </div>
    </div>
</section>
