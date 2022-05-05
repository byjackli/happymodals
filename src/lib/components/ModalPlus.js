const functions: VoidFunction[] = []

function check(): void {
    if (!document.getElementById('modal-manager')) console.error("Modal is not properly initialized.")

}

export function updateFunction(closeFunc: VoidFunction): void {
    check();
    functions.push(closeFunc)
}