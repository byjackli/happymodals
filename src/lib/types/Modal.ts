export type ModalData = {
    trackOrigin: HTMLElement,
    trackContainer: HTMLElement,
    trackClose: VoidFunction
    preventBackdrop: boolean
    trackScrollLock: boolean
}

export type Local = {
    body: HTMLElement,
    manager: HTMLElement,
    trackDepth: number,
    trackOrigin: HTMLElement[],
    trackContainer: HTMLElement[],
    trackPreventBackdrop: boolean[],
    trackClose: VoidFunction[],
    trackResume: HTMLElement[],
    trackScrollLock: {
        doc: Element,
        top: number
    }[]
    focusable: HTMLElement[]
}