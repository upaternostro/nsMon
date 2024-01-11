// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { ApplicationSettings } from '@nativescript/core'
import { closeModal } from '~/shared/modal'
import { IcingaFacade } from '~/shared/icinga-facade';

export function onAckOkTap(args) {
// console.log('onAckOkTap HOST');
// console.log('onAckOkTap: ' + JSON.stringify(args.object.page.bindingContext.object.attrs.__name, null, 4));
    const icingaFacade = new IcingaFacade(ApplicationSettings.getString('url'), ApplicationSettings.getString('username'), ApplicationSettings.getString('password'));
    icingaFacade.removeHostAck(args.object.page.bindingContext.object.attrs.__name, removeAckCB);
    closeModal();
}

export function onAckCloseTap(args) {
// console.log('onAckCloseTap HOST');
    closeModal();
}

export function removeAckCB(obj) {
    new Toasty({ 
        text: obj.results[0].status,
        duration: ToastDuration.LONG,
    }).show();
}
