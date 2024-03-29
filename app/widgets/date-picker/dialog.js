// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { closeModal } from '~/shared/modal'
import { DATE_DIALOG_CLOSE_OK, DATE_DIALOG_CLOSE_CANCEL } from '~/shared/constants'

var model;

export function onModalOpen(args) {
// console.log('onModalOpen: ' + args);
    model = args.model;
}

export function onDatePickerOk(args) {
// console.log('onDatePickerOk ' + DATE_DIALOG_CLOSE_OK + ' obj: ' + args.object.page.getViewById("datePicker").date);
    model.notify({
        eventName: DATE_DIALOG_CLOSE_OK,
        object: args.object.page.getViewById("datePicker").date,
    });
    closeModal();
}

export function onDatePickerCancel(args) {
// console.log('onDatePickerCancel ' + DATE_DIALOG_CLOSE_CANCEL);
    model.notify({
        eventName: DATE_DIALOG_CLOSE_CANCEL,
        object: null,
    });
    closeModal();
}
