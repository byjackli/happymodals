<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import ModalStore, {
        init,
        openModal,
        closeModal,
    } from "../store/ModalStore";

    export let dynamic: boolean = true,                 // when modal not open, it is removed from the DOM so the DOM is not polluted with unused nodes
        preventBackdrop = false,                        // clicking on backdrop will not close the modal
        beforeOpen: Function | undefined = undefined,   // lifecycle hook: call function before opening modal    
        afterOpen: Function | undefined = undefined,    // lifecycle hook: call function after opening modal
        beforeClose: Function | undefined = undefined,  // lifecycle hook: call function before closing modal
        afterClose: Function | undefined = undefined;   // lifecycle hook: call function after closing modal

    let origin: HTMLElement,
        container: HTMLElement,
        isLoading: boolean = false,
        isOpen: boolean = false;

    $: slots = $$props.$$slots;
    $: manager = $ModalStore.manager;

    function open() {
        beforeOpen && beforeOpen();
        isLoading = true;
    }

    export function close() {
        beforeClose && beforeClose();
        closeModal();
        isLoading = true;
        afterClose && afterClose();
    }
    onMount(() => {
        if (!manager) init();
    });
    afterUpdate(() => {
        if (isLoading) {
            if (!isOpen) {
                openModal(container, preventBackdrop, close);
                afterOpen && afterOpen();
            }
            isLoading = false;
            isOpen = !isOpen;
        }
    });

    // check for toggle

    /* ONMOUNT
    1. add to ModalStore
    2. what use case will the developer be using an insane number of modals that we need to address event delegation?
    */
</script>

<div class="modal-origin" bind:this={origin}>
    {#if slots?.toggle}
        <div class="modal-toggle">
            <slot name="toggle" />
        </div>
    {:else}
        <div class="modal-open" on:click={open}>
            <slot name="button">
                <button>open modal</button>
            </slot>
        </div>
    {/if}

    {#if !dynamic || isLoading || isOpen}
        <div
            class="modal-container {isOpen}"
            aria-hidden={!isOpen}
            bind:this={container}
        >
            <div class="modal" role="dialog">
                <slot name="close">
                    <button class="modal-close">Close Modal</button>
                </slot>
                <slot name="modal" />
            </div>
            <slot name="backdrop">
                <div class="modal-backdrop" aria-hidden="true" />
            </slot>
        </div>
    {/if}
</div>
