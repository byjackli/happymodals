<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import ModalStore, {
        init,
        openModal,
        closeModal,
    } from "../store/ModalStore";

    export let raw: boolean = false, // when true, modal will not auto-create missing components
        toggle: boolean = false, // when true, the open modal button will act as a toggle
        sticky: boolean = false, // when true, the open modal button will act as a toggle
        fixed: { x: string; y: string } = undefined, // coordinates for precise positioning of element on DOM
        dynamic: boolean = true, // when  true, inactive modal will be removed from the DOM
        preventBackdrop: boolean = false, // clicking on backdrop will not close the modal
        beforeOpen: Function | undefined = undefined, // lifecycle hook: call function before opening modal
        afterOpen: Function | undefined = undefined, // lifecycle hook: call function after opening modal
        beforeClose: Function | undefined = undefined, // lifecycle hook: call function before closing modal
        afterClose: Function | undefined = undefined; // lifecycle hook: call function after closing modal

    let origin: HTMLElement,
        container: HTMLElement,
        isLoading: boolean = false,
        isOpen: boolean = false;

    $: manager = $ModalStore.manager;

    function flex() {
        if (toggle && $ModalStore.trackOrigin.includes(origin)) close();
        else open();
    }

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
                openModal(origin, container, { preventBackdrop, fixed, sticky }, close);
                afterOpen && afterOpen();
            }
            isLoading = false;
            isOpen = !isOpen;
        }
    });
</script>

<div class="modal-origin" bind:this={origin}>
    <div class="modal-open" on:click={flex}>
        <slot name="button">
            {#if !raw}
                <button>open modal</button>
            {/if}
        </slot>
    </div>

    {#if !dynamic || isLoading || isOpen}
        <div
            class="modal-container {isOpen}"
            aria-hidden={!isOpen}
            bind:this={container}
        >
            <div class="modal" role="dialog">
                <slot name="close">
                    <button class="modal-close {raw ? 'transparent' : null}"
                        >close</button
                    >
                </slot>
                <slot name="modal" />
            </div>
            <slot name="backdrop">
                <div
                    class="modal-backdrop {raw ? 'transparent' : null}"
                    aria-hidden="true"
                />
            </slot>
        </div>
    {/if}
</div>
