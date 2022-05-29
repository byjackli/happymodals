<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import ModalStore, {
        init,
        openModal,
        closeModal,
    } from "../store/ModalStore";

    export let raw: boolean = false, // when true, modal will not auto-create missing components
        toggle: boolean = false, // when true, the open modal button will act as a toggle
        fixed: { x: string; y: string } = undefined, // coordinates for precise positioning of element on DOM
        dynamic: boolean = true, // when  true, inactive modal will be removed from the DOM
        preventBackdrop: boolean = false, // clicking on backdrop will not close the modal
        beforeOpen: Function | undefined = undefined, // lifecycle hook: call function before opening modal
        afterOpen: Function | undefined = undefined, // lifecycle hook: call function after opening modal
        beforeClose: Function | undefined = undefined, // lifecycle hook: call function before closing modal
        afterClose: Function | undefined = undefined; // lifecycle hook: call function after closing modal

    let container: HTMLElement,
        isLoading: boolean = false,
        isOpen: boolean = false;

    $: manager = $ModalStore.manager;
    $: style = fixed ? `top:${fixed.x}; left:${fixed.y};` : null;

    function open() {
        beforeOpen && beforeOpen();
        isLoading = true;
    }

    function flex() {
        if (toggle && isOpen) close();
        else open();
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
</script>

<div class="modal-origin">
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
            <div class="modal" role="dialog" {style}>
                <slot name="close">
                    {#if !raw}
                        <button class="modal-close">Close Modal</button>
                    {/if}
                </slot>
                <slot name="modal" />
            </div>
            <slot name="backdrop">
                {#if !raw}
                    <div class="modal-backdrop" aria-hidden="true" />
                {/if}
            </slot>
        </div>
    {/if}
</div>
