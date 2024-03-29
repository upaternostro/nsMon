// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { closeModal } from '~/shared/modal'
import { IcingaFacade } from '~/shared/icinga-facade';
import { Toasty, ToastDuration } from '@triniwiz/nativescript-toasty';

var forceRefreshCB;

export function onModalOpen(args) {
    forceRefreshCB = args.forceRefreshCB;
}

export function onAckOkTap(args) {
// console.log('onAckOkTap SERVICE');
// console.log('onAckOkTap: ' + JSON.stringify(args.object.page.bindingContext.object.attrs.__name, null, 4));
    IcingaFacade.getInstance().removeServiceAck(args.object.page.bindingContext.object.attrs.__name, removeAckCB);
    closeModal();
}

export function onAckCloseTap(args) {
// console.log('onAckCloseTap SERVICE');
    closeModal();
}

export function removeAckCB(obj) {
    new Toasty({ 
        text: obj.results[0].status,
        duration: ToastDuration.LONG,
    }).show();
    forceRefreshCB(obj);
}
