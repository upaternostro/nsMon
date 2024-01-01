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
    const icingaFacade = new IcingaFacade(ApplicationSettings.getString('url'), ApplicationSettings.getString('username'), ApplicationSettings.getString('password'));

    icingaFacade.notificationHost(model.object.attrs.__name,
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
