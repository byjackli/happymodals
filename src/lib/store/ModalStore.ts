import { writable } from "svelte/store"
import type { ModalData } from "$lib/types/Modal";

const local = { body: undefined, trackDepth: 0, trackOpen: [], trackClose: [], trackPreventBackdrop: [], trackScrollLock: [] };
export const ModalStore = writable({ ...local })

export function update(record: ModalData): void {
    for (const [keys, values] of Object.entries(record))
        local[keys] = values

    ModalStore.update(() => ({ ...local }))
}

// export function initModal(): void {
//     let body = local.body;

//     body = document.getElementsByTagName('html')[0];
//     body.addEventListener('click', observeClicks);
//     if (!document.getElementById('modal-manager')) {
//         modalManager = createModalManager();
//         body.prepend(modalManager);
//     }
//     if (!document.getElementById('modal-css')) createCSSManager()
// }
// function observeClicks(event) {
//     const openBtn = event.target.closest('.modal-open');

//     if (trackDepth) listenToCloseClicks(event);
//     if (openBtn) openModal(openBtn);
// }
// // handles click events not within modal
// function listenToCloseClicks(event) {
//     const clickedModal = event.target.closest('*[role="dialog"]'),
//         clickedBackdrop = event.target.closest(".modal-backdrop"),
//         clickedClose = clickedBackdrop || event.target.closest('.modal-close')?.parentElement.nextElementSibling;

//     function isSelf(track, clicked) { return track.indexOf(clicked) === track.length - 1 }

//     if (!clickedClose && !clickedModal) masterkey()
//     else if (!clickedClose && !isSelf(trackModal, clickedModal)) masterkey(trackDepth - trackModal.indexOf(clickedModal) - 1)
//     else if (clickedClose && !isSelf(trackBackdrop, clickedClose)) masterkey(trackDepth - trackBackdrop.indexOf(clickedClose))
//     else if (isSelf(trackBackdrop, clickedClose)) closeModal()
// }

// always closes the top-most modal, uses the corresponding close function
export function close(): void {

    const close = local.trackClose.pop()
    close();
}

export default ModalStore