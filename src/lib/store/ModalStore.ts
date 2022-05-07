import { writable } from "svelte/store"
import type Local from "$lib/types/Modal";

const local: Local = {
    body: undefined, manager: undefined, focusable: undefined, trackDepth: 0,
    trackContainer: [], trackModal: [], trackPreventBackdrop: [], trackClose: [], trackResume: [], trackScrollLock: []
};
export const ModalStore = writable({ ...local })

// initialize setp up automatic modal manager
export function init(): void {
    const body = document.getElementsByTagName('html')[0],
        head = document.getElementsByTagName("head")[0],
        manageModal = createModalManager(),
        manageCSS = createCSSManager()

    body.addEventListener('click', observeClicks, { capture: true });
    body.prepend(manageModal)
    head.prepend(manageCSS)

    local.body = body
    local.manager = manageModal
    ModalStore.update(() => ({ ...local }))
}

// listens for click events on modal open and close buttons
function observeClicks(event: MouseEvent): void {
    if (local.trackDepth) listenToCloseClicks(event);
}

// handles click events not within modal
function listenToCloseClicks(event: MouseEvent) {
    const target = event.target as HTMLElement,
        clickedModal = target.closest('*[role="dialog"]'),
        clickedBackdrop = target.closest(".modal-backdrop"),
        clickedClose = clickedBackdrop || target.closest('.modal-close')?.closest('*[role="dialog"]').nextElementSibling,
        preventBackdrop = local.trackPreventBackdrop[local.trackPreventBackdrop.length - 1],
        depthOfModal = Number.parseInt(clickedModal?.getAttribute("id")),
        depthOfBackdrop = Number.parseInt(clickedClose?.previousElementSibling.getAttribute("id"));

    function isSelf(clicked: number) { return clicked === local.trackDepth }

    if (clickedBackdrop && preventBackdrop) return
    if (!clickedClose && !clickedModal) masterkey()
    else if (!clickedClose && !isSelf(depthOfModal)) masterkey(local.trackDepth - depthOfModal - 1)
    else if (clickedClose && !isSelf(depthOfBackdrop)) masterkey(local.trackDepth - depthOfBackdrop)
    else if (isSelf(depthOfBackdrop)) close()
    local.trackPreventBackdrop.pop()
}
// traps focus within most recent active modal
function trapFocus(event: KeyboardEvent): void {
    const focusEnd = local.focusable.length - 1,
        focusCur = local.focusable.indexOf(document.activeElement as HTMLElement);

    if (event.key === `End` || (event.key === `Tab` && event.shiftKey && !focusCur)) {
        event.preventDefault();
        local.focusable[focusEnd].focus();
    } else if (
        event.key === `Home` ||
        (event.key === `Tab` && !event.shiftKey && focusCur === focusEnd)
    ) {
        event.preventDefault();
        local.focusable[0].focus();
    } else if (event.key === 'Escape') {
        event.preventDefault();
        close();
    }
}

// create CSS classes
function createCSSManager(): HTMLElement {
    const styles = document.createTextNode(`
        .modal-inactive { display: none !important; }
        .modal-scroll-locked { overflow: hidden !important; }
        .modal-container {
            position: absolute;
            width: 0;
            height: 0;
            overflow: hidden;
        }
        .modal, .modal-backdrop {
            position: fixed;
            top: 0; left: 0; 
        }
        .modal-backdrop {
            width: 100vw; 
            height: 100vh; 
            background-color: rgba(0,0,0,0.8); 
        }
        .modal-open, .modal-close {
            width: fit-content;
            height: fit-content;
        }
        .modal-close {
            padding: 10px;
            background-color: white;
            color: black;
        }
    `),
        styleNode = document.createElement("style");

    styleNode.setAttribute("id", "modal-css")
    styleNode.appendChild(styles)
    return styleNode
}
// Modal Manager houses all active modals and their respective backdrops
function createModalManager(): HTMLElement {
    const div = document.createElement('div');
    div.setAttribute('id', 'modal-manager');
    div.setAttribute('style', 'position: fixed; top: 0; left: 0; z-index: 9999;');
    return div;
}

// locks and unlocks previous layer from scrolling
function scrollLock(state: boolean): void {
    if (state) {
        const scrollLock = Array.from(document.querySelectorAll(".modal-scroll-lock"))
        for (const doc of scrollLock) {
            local.trackScrollLock.push({ doc, top: doc.parentElement.scrollTop })
            doc.parentElement.classList.add("modal-scroll-locked")
        }
    }
    else {
        for (const { doc, top } of local.trackScrollLock) {
            doc.parentElement.classList.remove("modal-scroll-locked")
            doc.parentElement.scrollTop = top
        }
        local.trackScrollLock = []
    }


}
// toggle aria-hide for all other elements
function ariaHideRest(bool) {
    const body = document.getElementsByTagName('body')[0];
    body.setAttribute('aria-hidden', `${bool}`);
}
// return a list of focusable elements baed on passed in modal (html element)
function updateFocusable(modal) {
    // // temporarily remove nested dialogs
    // const modals = modal.querySelectorAll('*[role="dialog"]'),
    //     temp = [];
    // for (const modal of modals) {
    //     temp.push({ sibling: modal.previousElementSibling, modal });
    //     modal.remove();
    // }

    // update focusable with list of focusables from most recent modal
    local.focusable = [
        ...modal.querySelectorAll(
            `a[href]:not([disabled]), 
            button:not([disabled]), 
            textarea:not([disabled]), 
            input:not([disabled]), 
            select:not([disabled]),
            *[tabindex="0"]`
        )
    ];

    // // re-add nested dialogs
    // for (const { sibling, modal } of temp) sibling.after(modal);
}

export function openModal(container: HTMLElement, preventBackdrop: boolean, close: VoidFunction) {
    const
        depth = local.trackDepth += 1,
        modal = container.firstElementChild as HTMLElement,
        backdrop = container.lastElementChild as HTMLElement;

    updateFocusable(container);
    if (depth < 2) {                       // perform only when first modal is opened
        local.body.addEventListener('keydown', trapFocus);
        scrollLock(true);
    }
    else pausePreviousModal()

    modal.remove();                                 // remove modal from where its original location

    local.trackResume.push(document.activeElement as HTMLElement);       // track previous element in focus before a modal was activated
    local.trackContainer.push(container);                         // track each all active modals and most recent modal
    local.trackModal.push(modal);                         // track each all active modals and most recent modal
    local.trackPreventBackdrop.push(preventBackdrop)
    local.trackClose.push(close)

    backdrop.setAttribute('style', `z-index: ${depth * 2 - 1};`);
    modal.setAttribute('style', `z-index: ${depth * 2};`);
    modal.setAttribute('id', `${depth}`);
    local.manager.prepend(backdrop);                 // add backdrop to Modal Manager
    local.manager.prepend(modal);                 // add backdrop to Modal Manager
    ariaHideRest(true);

    (modal.firstElementChild as HTMLElement).focus()
    local.trackDepth = depth
}
export function closeModal() {
    local.trackDepth -= 1; // current level of modal
    const container = local.trackContainer.pop(),
        modal = local.trackModal.pop(),
        backdrop = modal.nextElementSibling,
        resume = local.trackResume.pop();

    container.appendChild(modal);                            // put modal back where it was found
    container.appendChild(backdrop);                            // put modal back where it was found

    resume.focus();

    if (local.trackDepth) resumePreviousModal()           // if there are still modals, update focusable
    else {                                          // perform only when last modal is closed
        local.body.removeEventListener('keydown', trapFocus);
        scrollLock(false);
        ariaHideRest(false);
    }
}
function close() {
    const close = local.trackClose.pop()
    if (close !== undefined) close()
    else closeModal()
}
// closes all or x number of modals at once
function masterkey(number = undefined) {
    let limit = number !== undefined ? number : local.trackDepth

    while (limit) {
        close()
        limit--
    }
}
function pausePreviousModal() {
    local.trackModal[local.trackDepth - 2].setAttribute("aria-hidden", "true")
}
function resumePreviousModal() {
    local.trackModal[local.trackDepth - 1].setAttribute("aria-hidden", "false")
    updateFocusable(local.trackModal[local.trackDepth - 1]);
}


export default ModalStore