import { Observable, ObservableArray } from "@nativescript/core"

export class ServiceViewModel extends Observable {
  #now;
  #service;
  #comments = new ObservableArray();
  #dialogModel;
  #addAck;
  #addComment;

  constructor(service) {
    super();

    this.#now = new Date();
    this.#service = service;
    this.#comments.length = 0;
    this.#dialogModel = null;
    this.#addAck = null;
    this.#addComment = null;
  }

  get now() {
    return this.#now;
  }

  get service() {
    return this.#service;
  }

  get object() {
    return this.#service;
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

  set addAck(addAck) {
    this.#dialogModel = addAck;
    this.#addAck = addAck;
  }

  set addComment(addComment) {
    this.#dialogModel = addComment;
    this.#addComment = addComment;
  }

  addComments(comment) {
    this.#comments.push(comment);
    this.notifyPropertyChange('comments', this.#comments);
  }
}
