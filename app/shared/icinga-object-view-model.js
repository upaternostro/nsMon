// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { ObservableArray } from "@nativescript/core"
import { BusyIndicatorViewModel } from '~/shared/busy-indicator-view-model'

export class IcingaObjectViewModel extends BusyIndicatorViewModel {
  #now;
  #object;
  #comments = new ObservableArray();
  #dialogModel;
  #addAck;
  #addComment;
  #addNotification;

  constructor(object) {
    super();

    this.#now = new Date();
    this.object = object; // Warning: invoking setter method to parse performance data
    this.#comments.length = 0;
    this.#dialogModel = null;
    this.#addAck = null;
    this.#addComment = null;
    this.#addNotification = null;
  }

  get now() {
    return this.#now;
  }

  get object() {
    return this.#object;
  }

  get comments() {
    return this.#comments;
  }

  get dialogModel() {
    return this.#dialogModel;
  }

  get addAck() {
    return this.#addAck;
  }

  get addComment() {
    return this.#addComment;
  }

  get addNotification() {
    return this.#addNotification;
  }

  set object(object) {
    this.#now = new Date();
    this.#object = object;

    if (this.#object.attrs.last_check_result.performance_data) {
      let d;
      let s;

      for (let i = 0; i < this.#object.attrs.last_check_result.performance_data.length; i++) {
        d = this.#object.attrs.last_check_result.performance_data[i];
        s = d.indexOf(';');

        if (s != -1) {
          this.#object.attrs.last_check_result.performance_data[i] = d.substring(0, s);
        }
      }
    }

    this.notifyPropertyChange('now', this.#now);
    this.notifyPropertyChange('object', this.#object);
  }

  set addAck(addAck) {
    this.#dialogModel = addAck;
    this.#addAck = addAck;
  }

  set addComment(addComment) {
    this.#dialogModel = addComment;
    this.#addComment = addComment;
  }

  set addNotification(addNotification) {
    this.#dialogModel = addNotification;
    this.#addNotification = addNotification;
  }

  clearComments() {
    this.#comments.length = 0;
  }

  addComments(comment) {
    this.#comments.push(comment);
    this.notifyPropertyChange('comments', this.#comments);
  }
}
