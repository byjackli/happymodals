let body = undefined,           // HTMLElement of document body
    modalManager = undefined,   // HTMLElement containing all active modals
    trackDepth = 0,             // number of active modals
    track = [],
    trackScrollLock = [],       // position of scroll before locking
    focusable = undefined;      // list of focusable elements

// initialize setp up automatic modal manager
function init() {
    body = document.getElementsByTagName('html')[0];
    body.addEventListener('click', observeClicks);
    if (!document.getElementById('modal-manager')) {
        modalManager = createModalManager();
        body.prepend(modalManager);
    } else { modalManager = document.getElementById('modal-manager') }
    if (!document.getElementById('modal-css')) createCSSManager()
    hideModalThings()
}
// decomission: clear automatic modal manager
export function decom() {

    if (body) {
        body.removeEventListener("click", observeClicks)
        masterkey()
        modalManager.remove()
        modalManager = undefined
    }
}

// hide modals and their backdrop(if they have one)
function hideModalThings() {
    const modals = Array.from(document.querySelectorAll(`*[role="dialog"], .modal-backdrop`))

    for (const modal of modals)
        if (!modal.classList.contains("modal-inactive")) {
            modal.classList.add("modal-inactive")
            modal.setAttribute("aria-hidden", "true")
        }
}

// listens for click events on modal open and close buttons
function observeClicks(event) {
    const openBtn = event.target.closest('.modal-open');

    if (trackDepth) listenToCloseClicks(event);
    if (openBtn) openModal(openBtn);
}
// handles click events not within modal
function listenToCloseClicks(event) {
    const clickedModal = event.target.closest('*[role="dialog"]'),
        clickedBackdrop = event.target.closest(".modal-backdrop"),
        clickedClose = clickedBackdrop || event.target.closest('.modal-close')?.parentElement.nextElementSibling;

    function isSelf(property, clicked) { return track.at(-1)[property] === clicked }

    if (!clickedClose && !clickedModal) masterkey()
    else if (!clickedClose && !isSelf("modal", clickedModal)) masterkey(trackDepth - track.findIndex(group => group.modal === clickedModal) - 1)
    else if (clickedClose && !isSelf("backdrop", clickedClose)) masterkey(trackDepth - track.findIndex(group => group.close === clickedClose))
    else if (isSelf("backdrop", clickedClose)) closeModal()
}
// traps focus within most recent active modal
function trapFocus(event) {
    const focusEnd = focusable.length - 1,
        focusCur = focusable.indexOf(document.activeElement);

    if (event.key === `End` || (event.key === `Tab` && event.shiftKey && !focusCur)) {
        event.preventDefault();
        focusable[focusEnd].focus();
    } else if (
        event.key === `Home` ||
        (event.key === `Tab` && !event.shiftKey && focusCur === focusEnd)
    ) {
        event.preventDefault();
        focusable[0].focus();
    } else if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
    }
}

// create CSS classes
function createCSSManager() {
    const styles = document.createTextNode(`
        .modal-inactive { display: none !important; }
        .modal-scroll-locked { overflow: hidden !important; }
        .modal-backdrop {
            width: 100vw; 
            height: 100vh; 
            position: fixed;
            top: 0; left: 0; 
            background-color: rgba(0,0,0,0.8); 
        }
        .modal-close {
            padding: 10px;
            background-color: white;
            color: black;
        }
    `),
        styleNode = document.createElement("style"),
        head = document.getElementsByTagName("head")[0];

    styleNode.setAttribute("id", "modal-css")
    styleNode.appendChild(styles)
    head.prepend(styleNode)
}
// Modal Manager houses all active modals and their respective backdrops
function createModalManager() {
    const div = document.createElement('div');
    div.setAttribute('id', 'modal-manager');
    div.setAttribute('style', 'position: fixed; top: 0; left: 0; z-index: 9999;');
    return div;
}
function createBackdrop() {
    const div = document.createElement('div');
    div.setAttribute('class', 'modal-backdrop');
    return div;
}
function createCloseBtn() {
    const content = document.createTextNode('close modal'),
        ariaClose = document.createElement('button');

    ariaClose.appendChild(content);
    ariaClose.setAttribute('class', 'modal-close');
    ariaClose.setAttribute('style', 'position: absolute; top: -75px; right: 0;');
    return ariaClose
}

// locks and unlocks previous layer from scrolling
function scrollLock(state) {
    if (state) {
        const scrollLock = Array.from(document.querySelectorAll(".modal-scroll-lock"))
        for (const doc of scrollLock) {
            trackScrollLock.push({ doc, top: doc.parentElement.scrollTop })
            doc.parentElement.classList.add("modal-scroll-locked")
        }
    }
    else {
        for (const { doc, top } of trackScrollLock) {
            doc.parentElement.classList.remove("modal-scroll-locked")
            doc.parentElement.scrollTop = top
        }
        trackScrollLock = []
    }


}
// toggle aria-hide for all other elements
function ariaHideRest(bool) {
    const body = document.getElementsByTagName('body')[0];
    body.setAttribute('aria-hidden', `${bool}`);
}
// return a list of focusable elements baed on passed in modal (html element)
function updateFocusable(modal) {
    // temporarily remove nested dialogs
    const modals = modal.querySelectorAll('*[role="dialog"]'),
        temp = [];
    for (const modal of modals) {
        temp.push({ sibling: modal.previousElementSibling, modal });
        modal.remove();
    }

    // update focusable with list of focusables from most recent modal
    focusable = [
        ...modal.querySelectorAll(
            `a[href]:not([disabled]), 
            button:not([disabled]), 
            textarea:not([disabled]), 
            input:not([disabled]), 
            select:not([disabled]),
            *[tabindex="0"]`
        )
    ];

    // re-add nested dialogs
    for (const { sibling, modal } of temp) sibling.after(modal);
}

function openModal(openBtn) {
    trackDepth += 1;
    const
        button = openBtn,
        modal = openBtn.nextElementSibling,
        backdrop = // if modal does not have a backdrop, automatically create and add one
            modal?.nextElementSibling?.classList.contains("modal-backdrop")
                ? modal.nextElementSibling
                : createBackdrop();

    // if modal does not have a close button, automatically create and add one
    if (!modal.querySelectorAll('.modal-close').length) modal.prepend(createCloseBtn());

    updateFocusable(modal);
    if (trackDepth < 2) {                       // perform only when first modal is opened
        body.addEventListener('keydown', trapFocus);
        scrollLock(true);
    }
    else pausePreviousModal()

    modal.remove();                                 // remove modal from where its original location

    track.push({    // groups everything related to a modal into an object
        button,                         // track the original container of each modal
        modal,                          // track each all active modals and most recent modal
        backdrop,                       // track backdrop created for all current active modals
        resume: document.activeElement  // track previous element in focus before a modal was activated
    })

    modal.setAttribute(
        'style',
        `position: fixed; top: 50%; left: 50%; transform: translate3d(-50%, -50%, 0); z-index: ${trackDepth * 2
        };`
    );
    backdrop.setAttribute('style', `z-index: ${trackDepth * 2 - 1};`);
    backdrop.classList.remove("modal-inactive")     // expose backdrop to visual users
    modal.classList.remove("modal-inactive")        // expose modal to visual users
    modal.setAttribute("aria-hidden", "false")      // expose modal to assist tech
    modalManager.prepend(backdrop);                 // add backdrop to Modal Manager
    modalManager.prepend(modal);                    // add modal to Modal Manager
    ariaHideRest(true);

    modal.firstChild.focus()
}
function closeModal() {
    trackDepth -= 1; // current level of modal
    const { button, modal, resume, backdrop } = track.pop()

    button.after(modal);                            // put modal back where it was found
    modal.classList.add("modal-inactive")           // hide modal from visual users
    modal.setAttribute("aria-hidden", "true")       // hide modal from assist tech
    backdrop.classList.add("modal-inactive")        // hide backdrop from visual users
    backdrop.setAttribute("aria-hidden", "true")    // hide backdrop from assist tech
    modal.after(backdrop)                           // put backdrop next to where modal was found

    resume.focus();

    if (trackDepth) resumePreviousModal()           // if there are still modals, update focusable
    else {                                          // perform only when last modal is closed
        body.removeEventListener('keydown', trapFocus);
        scrollLock(false);
        ariaHideRest(false);
    }
}
// closes all or x number of modals at once
function masterkey(number = undefined) {
    let limit = number !== undefined ? number : trackDepth

    while (limit) {
        closeModal()
        limit--
    }

}

function pausePreviousModal() {
    track.at(-1).modal.setAttribute("aria-hidden", "true")
}
function resumePreviousModal() {
    track.at(-1).modal.setAttribute("aria-hidden", "false")
    updateFocusable(track.at(-1).modal);
}

// window.onload = init;

export default init