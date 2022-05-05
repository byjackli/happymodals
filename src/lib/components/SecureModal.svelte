<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import ModalStore, {
        init,
        openModal,
        closeModal,
    } from "../store/ModalStore";

    export let beforeOpen: Function | undefined = undefined,
        afterOpen: Function | undefined = undefined,
        beforeClose: Function | undefined = undefined,
        afterClose: Function | undefined = undefined,
        preventBackdrop = false;

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
                openModal(
                    origin,
                    container,
                    preventBackdrop,
                    beforeClose || afterClose ? close : undefined
                );
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
</div>
{#if isLoading || isOpen}
    <div class="modal-container" bind:this={container}>
        <div role="dialog">
            <slot name="close">
                <button class="modal-close">Close Modal</button>
            </slot>
            <slot name="modal" />
        </div>
        <slot name="backdrop">
            <div class="modal-backdrop" aria-hidden="true" on:click={close} />
        </slot>
    </div>
{/if}
