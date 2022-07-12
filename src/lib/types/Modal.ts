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
    preventBackdrop?: boolean,
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

export default Local