export type Local = {
    body: HTMLElement,
    manager: HTMLElement,
    trackDepth: number,
    track: Track[],
    focusable: HTMLElement[]
}

export type Track = {
    origin: HTMLElement,
    container: HTMLElement,
    modal: HTMLElement,
    /**
     * @deprecated use preventClose instead
     */
    preventBackdrop?: boolean,
    preventClose?: PreventClose,
    close: VoidFunction,
    resume: HTMLElement,
    lockScroll?: LockScroll,
    fixed?: Fixed
}

type LockScroll = {
    doc: HTMLElement,
    top: number
}

export type Fixed = {
    sticky?: boolean,
    offset?: Offset
}

export type Offset = {
    top: string,
    left: string,
    width?: boolean,
    height?: boolean
}

export type PreventClose = {
    backdrop?: boolean,
    contextMenu?: boolean,
    keydown?: boolean,
}

export default Local