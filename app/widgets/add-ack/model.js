// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { Observable } from "@nativescript/core"
import { DATE_DIALOG_CLOSE_OK, TIME_DIALOG_CLOSE_OK } from '~/shared/constants'

export class AddAckViewModel extends Observable {
    #containingModel;
    #comment;
    #persistentComment;
    #useExpireTime;
    #expireTime;
    #stickyAcknowledgement;
    #sendNotification;

    constructor(containingModel) {
        super();

        this.#containingModel = containingModel;
        this.#comment = "";
        this.#persistentComment = false;
        this.#useExpireTime = false;
        this.#expireTime = new Date();
        this.#stickyAcknowledgement = false;
        this.#sendNotification = true;

        this.#containingModel.on(DATE_DIALOG_CLOSE_OK, this.onDateDialogCloseOk.bind(this));
        this.#containingModel.on(TIME_DIALOG_CLOSE_OK, this.onTimeDialogCloseOk.bind(this));
    }

    get comment() {
        return this.#comment;
    }

    get persistentComment() {
        return this.#persistentComment;
    }

    get useExpireTime() {
        return this.#useExpireTime;
    }

    get expireDate() {
        return this.#expireTime;
    }

    get expireTime() {
        return this.#expireTime;
    }

    get stickyAcknowledgement() {
        return this.#stickyAcknowledgement;
    }

    get sendNotification() {
        return this.#sendNotification;
    }

    set comment(comment) {
        this.#comment = comment;
        this.#containingModel.notifyPropertyChange('addAck.comment', this.#comment);
    }

    set persistentComment(persistentComment) {
        this.#persistentComment = persistentComment;
        this.#containingModel.notifyPropertyChange('addAck.persistentComment', this.#persistentComment);
    }

    set useExpireTime(useExpireTime) {
// console.log('useExpireTime: set ' + useExpireTime);
        this.#useExpireTime = useExpireTime;
        this.#containingModel.notifyPropertyChange('addAck.useExpireTime', this.#useExpireTime);
// console.log('DONE');
    }

    set expireDate(expireTime) {
        // do nothing (avoid console warnings) [logic in the event handler below]
    }

    set expireTime(expireTime) {
        // do nothing (avoid console warnings) [logic in the event handler below]
    }

    set stickyAcknowledgement(stickyAcknowledgement) {
        this.#stickyAcknowledgement = stickyAcknowledgement;
        this.#containingModel.notifyPropertyChange('addAck.stickyAcknowledgement', this.#stickyAcknowledgement);
    }

    set sendNotification(sendNotification) {
        this.#sendNotification = sendNotification;
        this.#containingModel.notifyPropertyChange('addAck.sendNotification', this.#sendNotification);
    }

    onDateDialogCloseOk(args) {
// console.log('onDateDialogCloseOk');
        this.#expireTime = new Date(
            args.object.getFullYear(),
            args.object.getMonth(),
            args.object.getDate(),
            this.#expireTime.getHours(),
            this.#expireTime.getMinutes(),
            this.#expireTime.getSeconds(),
            this.#expireTime.getMilliseconds()
        );
// console.log('onDateDialogCloseOk: ' + this.#expireTime);
        this.#containingModel.notifyPropertyChange('addAck.expireDate', this.#expireTime);
    }

    onTimeDialogCloseOk(args) {
// console.log('onTimeDialogCloseOk');
        this.#expireTime = new Date(
            this.#expireTime.getFullYear(),
            this.#expireTime.getMonth(),
            this.#expireTime.getDate(),
            args.object.getHours(),
            args.object.getMinutes(),
            args.object.getSeconds(),
            args.object.getMilliseconds()
        );
// console.log('onTimeDialogCloseOk: ' + this.#expireTime);
        this.#containingModel.notifyPropertyChange('addAck.expireTime', this.#expireTime);
   }
}