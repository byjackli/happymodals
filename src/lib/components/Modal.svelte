<script lang="ts">
    import { onMount } from "svelte";
    import { update } from "../store/ModalStore";

    export let beforeOpen: Function | undefined = undefined,
        afterOpen: Function | undefined = undefined,
        beforeClose: Function | undefined = undefined,
        afterClose: Function | undefined = undefined,
        preventBackdrop = false;

    $: slots = $$props.$$slots;

    function open() {
        beforeOpen && beforeOpen();

        afterOpen && afterOpen();
    }

    export function close() {
        beforeClose && beforeClose();

        afterClose && afterClose();
    }
    onMount(() => {
        update({ trackOpen: open, trackClose: close });
    });

    // check for toggle

    /* ONMOUNT
    1. add to ModalStore
    2. what use case will the developer be using an insane number of modals that we need to address event delegation?
    */
</script>

{#if slots.toggle}
    <div class="modal-toggle">
        <slot name="toggle" />
    </div>
{:else}
    <div class="modal-open">
        <slot name="button">
            <button>open modal</button>
        </slot>
    </div>
{/if}
<slot name="modal">
    <div role="dialog" />
</slot>
<slot name="backdrop">
    <div class="modal-backdrop" aria-hidden="true" />
</slot>
