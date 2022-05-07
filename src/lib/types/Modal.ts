export type Local = {
    body: HTMLElement,
    manager: HTMLElement,
    trackDepth: number,
    trackContainer: HTMLElement[],
    trackModal: HTMLElement[],
    trackPreventBackdrop: boolean[],
    trackClose: VoidFunction[],
    trackResume: HTMLElement[],
    trackScrollLock: {
        doc: Element,
        top: number
    }[]
    focusable: HTMLElement[]
}

export default Local