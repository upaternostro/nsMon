// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { Observable, ObservableArray } from "@nativescript/core"

export class IcingaObjectViewModel extends Observable {
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
    this.#object = object;
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

  addComments(comment) {
    this.#comments.push(comment);
    this.notifyPropertyChange('comments', this.#comments);
  }
}