// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { ApplicationSettings } from '@nativescript/core'
import { closeModal, openModal } from '~/shared/modal'
import { IcingaFacade } from '~/shared/icinga-facade';
import { AddAckViewModel } from '~/widgets/add-ack/model';
import { Toasty, ToastDuration } from '@triniwiz/nativescript-toasty';

var model;

export function onModalOpen(args) {
// console.log('onModalOpen: ' + args);
    model = args.model;
    model.addAck = new AddAckViewModel(model);
}

export function onAckOkTap(args) {
// console.log('onAckOkTap SERVICE');
// console.log('onAckOkTap: ' + JSON.stringify(args.object.page.bindingContext.object.attrs.__name, null, 4));
    IcingaFacade.getInstance().acknowledgeServiceProblem(model.object.attrs.__name,
        ApplicationSettings.getString('username'), 
        model.addAck.comment,
        model.addAck.useExpireTime ? model.addAck.expireTime : null,
        model.addAck.stickyAcknowledgement,
        model.addAck.sendNotification,
        model.addAck.persistentComment,
        addAckCB
    );
    closeModal();
}

export function onAckCloseTap(args) {
// console.log('onAckCloseTap SERVICE');
    closeModal();
}

export function addAckCB(obj) {
    new Toasty({ 
        text: obj.results[0].status,
        duration: ToastDuration.LONG,
    }).show();
}

export function onDateTap(args) {
// console.log('onDateTap SERVICE');
    openModal("~/widgets/date-picker/dialog", require("~/widgets/date-picker/dialog"), {
        "model": model,
    });
}

export function onTimeTap(args) {
// console.log('onTimeTap SERVICE');
    openModal("~/widgets/time-picker/dialog", require("~/widgets/time-picker/dialog"), {
        "model": model,
    });
}
