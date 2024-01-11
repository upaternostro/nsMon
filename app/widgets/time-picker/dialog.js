// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { closeModal } from '~/shared/modal'
import { TIME_DIALOG_CLOSE_OK, TIME_DIALOG_CLOSE_CANCEL } from '~/shared/constants'

var model;

export function onModalOpen(args) {
// console.log('onModalOpen: ' + args);
    model = args.model;
}

export function onTimePickerOk(args) {
// console.log('onTimePickerOk ' + TIME_DIALOG_CLOSE_OK + ' obj: ' + args.object.page.getViewById("timePicker").time);
    model.notify({
        eventName: TIME_DIALOG_CLOSE_OK,
        object: args.object.page.getViewById("timePicker").time,
    });
    closeModal();
}

export function onTimePickerCancel(args) {
// console.log('onTimePickerCancel ' + TIME_DIALOG_CLOSE_CANCEL);
    model.notify({
        eventName: TIME_DIALOG_CLOSE_CANCEL,
        object: null,
    });
    closeModal();
}
