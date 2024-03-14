// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { ApplicationSettings } from '@nativescript/core'
import { closeModal, openModal } from '~/shared/modal'
import { IcingaFacade } from '~/shared/icinga-facade';
import { AddCommentViewModel } from '~/widgets/add-comment/model';
import { Toasty, ToastDuration } from '@triniwiz/nativescript-toasty';

var model;
var refreshCommentsCB;

export function onModalOpen(args) {
    model = args.model;
    model.addComment = new AddCommentViewModel(model);
    refreshCommentsCB = args.refreshCommentsCB;
}

export function onCommentOkTap(args) {
    IcingaFacade.getInstance().commentService(model.object.attrs.__name,
        ApplicationSettings.getString('username'), 
        model.addComment.comment,
        model.addComment.useExpireTime ? model.addComment.expireTime : null,
        addCommentCB
    );
    closeModal();
}

export function onCommentCloseTap(args) {
    closeModal();
}

export function addCommentCB(obj) {
    new Toasty({ 
        text: obj.results[0].status,
        duration: ToastDuration.LONG,
    }).show();
    refreshCommentsCB(obj);
}

export function onDateTap(args) {
    openModal("~/widgets/date-picker/dialog", require("~/widgets/date-picker/dialog"), {
        "model": model,
    });
}

export function onTimeTap(args) {
    openModal("~/widgets/time-picker/dialog", require("~/widgets/time-picker/dialog"), {
        "model": model,
    });
}
