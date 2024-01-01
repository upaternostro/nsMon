import { ApplicationSettings } from '@nativescript/core'
import { closeModal, openModal } from '~/shared/modal'
import { IcingaFacade } from '~/shared/icinga-facade';
import { AddCommentViewModel } from '~/widgets/add-comment/model';

var model;

export function onModalOpen(args) {
// console.log('onModalOpen: ' + args);
    model = args.model;
    model.addComment = new AddCommentViewModel(model);
}

export function onCommentOkTap(args) {
// console.log('onCommentOkTap SERVICE');
// console.log('onCommentOkTap: ' + JSON.stringify(args.object.page.bindingContext.object.attrs.__name, null, 4));
    const icingaFacade = new IcingaFacade(ApplicationSettings.getString('url'), ApplicationSettings.getString('username'), ApplicationSettings.getString('password'));

    icingaFacade.commentService(model.object.attrs.__name,
        ApplicationSettings.getString('username'), 
        model.addComment.comment,
        model.addComment.useExpireTime ? model.addComment.expireTime : null,
        addCommentCB
    );
    closeModal();
}

export function onCommentCloseTap(args) {
// console.log('onCommentCloseTap SERVICE');
    closeModal();
}

export function addCommentCB(obj) {
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
