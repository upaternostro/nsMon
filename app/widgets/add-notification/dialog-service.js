// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { ApplicationSettings } from '@nativescript/core'
import { closeModal } from '~/shared/modal'
import { IcingaFacade } from '~/shared/icinga-facade';
import { AddNotificationViewModel } from '~/widgets/add-notification/model';

var model;

export function onModalOpen(args) {
    model = args.model;
    model.addNotification = new AddNotificationViewModel(model);
}

export function onNotificationOkTap(args) {
    IcingaFacade.getInstance().notificationService(model.object.attrs.__name,
        ApplicationSettings.getString('username'), 
        model.addNotification.comment,
        model.addNotification.forced,
        addNotificationCB
    );
    closeModal();
}

export function onNotificationCloseTap(args) {
    closeModal();
}

export function addNotificationCB(obj) {
    new Toasty({ 
        text: obj.results[0].status,
        duration: ToastDuration.LONG,
    }).show();
}
