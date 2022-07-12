import { writable } from "svelte/store"
import type { Local, Track, Fixed, Offset } from "$lib/types/Modal";

const local: Local = {
    body: undefined, manager: undefined, focusable: undefined, trackDepth: 0, track: []
};
export const ModalStore = writable({ ...local })

// initialize setp up automatic modal manager
export function init(): void {
    const body = document.getElementsByTagName('html')[0],
        head = document.getElementsByTagName("head")[0],
        manageModal = createModalManager(),
        manageCSS = createCSSManager()

    body.addEventListener('click', observeClicks, { capture: true });
    body.addEventListener('scroll', observeScrolls, { capture: true, passive: true });
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

function observeScrolls(): void {
    for (const group of local.track) {
        if (!group?.fixed?.sticky) continue

        const origin = group.origin.getBoundingClientRect(),
            modal = group.modal,
            offset = group.fixed?.offset;

        updateSticky(origin, modal, offset)
    }
}

function updateSticky(origin: DOMRect, modal: HTMLElement, offset: Offset): void {
    const coords = {
        x: `calc(${offset.left} + ${window.scrollX + origin.left}px)`,
        y: `calc(${offset.top} + ${window.scrollY + origin.height + origin.top}px)`,
    }

    modal.style.left = coords.x
    modal.style.top = coords.y
    modal.style.transition = "unset"
}

// handles click events not within modal
function listenToCloseClicks(event: MouseEvent) {
    const origin = local.track.at(-1).origin,
        open = origin.firstElementChild,
        target = event.target as HTMLElement;

    if ((target.closest(".modal-open") as HTMLElement) === open)
        return 0

    const
        clickedModal = target.closest('*[role="dialog"]'),
        clickedBackdrop = target.closest(".modal-backdrop"),
        clickedClose = clickedBackdrop || target.closest('.modal-close')?.closest('*[role="dialog"]').nextElementSibling,
        depthOfModal = Number.parseInt(clickedModal?.getAttribute("id")),
        depthOfBackdrop = Number.parseInt(clickedClose?.previousElementSibling.getAttribute("id"));

    function isSelf(clicked: number) { return clicked === local.trackDepth }
    try {
        if (!clickedClose && !clickedModal) masterkey()
        else if (!clickedClose && !isSelf(depthOfModal)) masterkey(local.trackDepth - depthOfModal - 1)
        else if (clickedClose && !isSelf(depthOfBackdrop)) masterkey(local.trackDepth - depthOfBackdrop)
        else if (isSelf(depthOfBackdrop)) close()
    }
    catch (err) {
        console.error(err)
    }
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
        .modal-scroll-locked { overflow: hidden !important; }
        .modal-container {
            position: absolute;
            width: 0;
            height: 0;
            overflow: hidden;
        }
        .modal, .modal-backdrop {
            position: fixed;
        }
        .modal-container.false .modal, 
        .modal-container.false .modal-backdrop {
            position: absolute;
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
        .transparent {
            max-width: 0px !important;
            max-height: 0px !important;
            overflow: hidden !important;
            padding: 0px !important;
            margin: 0px !important;
            border: unset !important;
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
    // if (state) {
    //     const scrollLock = Array.from(document.querySelectorAll(".modal-scroll-lock"))
    //     for (const doc of scrollLock) {
    //         local.trackScrollLock.push({ doc, top: doc.parentElement.scrollTop })
    //         doc.parentElement.classList.add("modal-scroll-locked")
    //     }
    // }
    // else {
    //     for (const { doc, top } of local.trackScrollLock) {
    //         doc.parentElement.classList.remove("modal-scroll-locked")
    //         doc.parentElement.scrollTop = top
    //     }
    //     local.trackScrollLock = []
    // }
}
// toggle aria-hide for all other elements
function ariaHideRest(bool) {
    const body = document.getElementsByTagName('body')[0];
    body.setAttribute('aria-hidden', `${bool}`);
}
// return a list of focusable elements baed on passed in modal (html element)
function updateFocusable(modal) {
    // // temporarily remove nested dialogs
    const containers = modal.querySelectorAll('*.modal-container'),
        temp = [];

    for (const container of containers) {
        temp.push({ origin: container.parentElement, container });
        container.remove();
    }

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
    temp.forEach(({ origin, container }) => origin.after(container))
}


export function openModal(origin: HTMLElement, container: HTMLElement, options: { preventBackdrop?: boolean, fixed?: Fixed }, close: VoidFunction) {
    const tracker: Track = {
        origin,
        container,
        modal: container.firstElementChild as HTMLElement,
        resume: document.activeElement as HTMLElement,
        close
    },
        coords = options.fixed ? `top: ${options.fixed.offset.top}; left: ${options.fixed.offset.left}; ` : "",
        depth = local.trackDepth += 1,
        backdrop = container.lastElementChild as HTMLElement;

    updateFocusable(container);
    if (depth < 2) {                       // perform only when first modal is opened
        local.body.addEventListener('keydown', trapFocus);
        scrollLock(true);
    }
    else pausePreviousModal()

    tracker.modal.remove();                                 // remove modal from where its original location
    if (options.preventBackdrop) tracker.preventBackdrop = true
    if (options.fixed) tracker.fixed = options.fixed

    local.track.push(tracker)

    backdrop.setAttribute('style', `z-index: ${depth * 2 - 1};`);
    tracker.modal.setAttribute('style', `${coords}z-index: ${depth * 2};`);
    tracker.modal.setAttribute('id', `${depth}`);
    local.manager.prepend(backdrop);                 // add backdrop to Modal Manager
    local.manager.prepend(tracker.modal);                 // add backdrop to Modal Manager
    ariaHideRest(true);

    (tracker.modal.firstElementChild as HTMLElement).focus()
    local.trackDepth = depth

    if (tracker?.fixed?.sticky)
        updateSticky(origin.getBoundingClientRect(), tracker.modal, tracker.fixed.offset)

}
export function closeModal() {
    local.trackDepth -= 1;                          // current level of modal

    const
        { modal, container, resume } = local.track.at(-1),
        backdrop = modal.nextElementSibling;

    container.appendChild(modal);                   // put modal back where it was found
    container.appendChild(backdrop);                // put modal back where it was found

    resume.focus();

    if (local.trackDepth) resumePreviousModal()     // if there are still modals, update focusable
    else {                                          // perform only when last modal is closed
        local.body.removeEventListener('keydown', trapFocus);
        scrollLock(false);
        ariaHideRest(false);
    }
    local.track.pop()
}
function close() {
    const group = local.track.at(-1),
        localClose = group.close,
        preventBackdrop = group.preventBackdrop;

    if (preventBackdrop) throw "closing modal was manually prevented"
    else if (localClose) localClose()
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
    local.track.at(-1).modal.setAttribute("aria-hidden", "true")
}
function resumePreviousModal() {
    local.track.at(-2).modal.setAttribute("aria-hidden", "false")
    updateFocusable(local.track.at(-2).modal);
}


export default ModalStore