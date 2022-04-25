export type ModalData = {
    trackOpen?: (() => void)
    trackClose?: (() => void)
    preventBackdrop?: boolean
    trackScrollLock?: boolean
}