import { Builder, getRootLayout } from '@nativescript/core'

var dialogs = [];

export function openModal(path, js, init) {
    const root = getRootLayout();
// console.log("openModal root: " + root);

    if (init) js.onModalOpen(init);

    const view = Builder.load(path, js);
    root.open(view, {
        shadeCover: {
            color: '#000',
            opacity: 0.7,
            tapToClose: true,
        },
        animation: {
            enterFrom: {
                opacity: 0,
                translateY: 500,
                duration: 300,
            },
            exitTo: {
                opacity: 0,
                duration: 300,
            },
        },
    });
    root.bringToFront(view);
    dialogs.push(view);
}

export function closeModal() {
    const view = dialogs.pop();
// console.log("closeModal view: " + view);
    const root = getRootLayout();
// console.log("closeModal root: " + root);

    root.close(view);
// console.log("closeModal CLOSED!");
}
