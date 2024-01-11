// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { Observable } from "@nativescript/core"
import { DATE_DIALOG_CLOSE_OK, TIME_DIALOG_CLOSE_OK } from '~/shared/constants'

export class AddCommentViewModel extends Observable {
    #containingModel;
    #comment;
    #useExpireTime;
    #expireTime;

    constructor(containingModel) {
        super();

        this.#containingModel = containingModel;
        this.#comment = "";
        this.#useExpireTime = false;
        this.#expireTime = new Date();

        this.#containingModel.on(DATE_DIALOG_CLOSE_OK, this.onDateDialogCloseOk.bind(this));
        this.#containingModel.on(TIME_DIALOG_CLOSE_OK, this.onTimeDialogCloseOk.bind(this));
    }

    get comment() {
        return this.#comment;
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

    set comment(comment) {
        this.#comment = comment;
        this.#containingModel.notifyPropertyChange('addComment.comment', this.#comment);
    }

    set useExpireTime(useExpireTime) {
// console.log('useExpireTime: set ' + useExpireTime);
        this.#useExpireTime = useExpireTime;
        this.#containingModel.notifyPropertyChange('addComment.useExpireTime', this.#useExpireTime);
// console.log('DONE');
    }

    set expireDate(expireTime) {
        // do nothing (avoid console warnings) [logic in the event handler below]
    }

    set expireTime(expireTime) {
        // do nothing (avoid console warnings) [logic in the event handler below]
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
        this.#containingModel.notifyPropertyChange('addComment.expireDate', this.#expireTime);
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
        this.#containingModel.notifyPropertyChange('addComment.expireTime', this.#expireTime);
   }
}