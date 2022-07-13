<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import ModalStore, { init, openModal, closeModal } from "../store/ModalStore";
  import type { Fixed, PreventClose } from "../types/Modal";

  export let raw: boolean = false, // when true, modal will not auto-create missing components
    toggle: boolean = false, // when true, the open modal button will act as a toggle
    fixed: Fixed = undefined, // coordinates for precise positioning of element on DOM
    dynamic: boolean = true, // when  true, inactive modal will be removed from the DOM
    /**
     * @deprecated use preventClose instead
     */
    preventBackdrop: boolean = false, // clicking on backdrop will not close the modal
    preventClose: PreventClose = {
      backdrop: false,
      contextMenu: true,
      keydown: false,
    },
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
    if (toggle && $ModalStore.track.find((group) => group.origin === origin))
      close();
    else open();
  }
  function open() {
    beforeOpen && beforeOpen();
    isLoading = true;
  }
  function close() {
    beforeClose && beforeClose();
    closeModal();
    isLoading = true;
  }
  function checkState(): boolean {
    return isOpen;
  }

  export const modal = {
    flex,
    open,
    close,
    checkState,
  };

  onMount(() => {
    if (!manager) init();
  });
  afterUpdate(() => {
    if (isLoading) {
      isLoading = false;
      isOpen = !isOpen;

      if (isOpen) {
        openModal(
          origin,
          container,
          { preventClose, preventBackdrop, fixed },
          close
        );
        afterOpen && afterOpen();
      } else {
        afterClose && afterClose();
      }
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
          <button class="modal-close {raw ? 'transparent' : ''}">close</button>
        </slot>
        <slot name="modal" />
      </div>
      <slot name="backdrop">
        <div
          class="modal-backdrop {raw ? 'transparent' : ''}"
          aria-hidden="true"
        />
      </slot>
    </div>
  {/if}
</div>
