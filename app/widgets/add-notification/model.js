import { Observable } from "@nativescript/core"

export class AddNotificationViewModel extends Observable {
    #containingModel;
    #comment;
    #forced;

    constructor(containingModel) {
        super();

        this.#containingModel = containingModel;
        this.#comment = "";
        this.#forced = false;
    }

    get comment() {
        return this.#comment;
    }

    get forced() {
        return this.#forced;
    }

    set comment(comment) {
        this.#comment = comment;
        this.#containingModel.notifyPropertyChange('addNotification.comment', this.#comment);
    }

    set forced(forced) {
        this.#forced = forced;
        this.#containingModel.notifyPropertyChange('addNotification.forced', this.#forced);
    }
}