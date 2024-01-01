import { Observable, ObservableArray } from "@nativescript/core"

export class ServiceViewModel extends Observable {
  #now;
  #service;
  #comments = new ObservableArray();
  #addAck;

  constructor(service) {
    super();

    this.#now = new Date();
    this.#service = service;
    this.#comments.length = 0;
    this.#addAck = null;
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

  get addAck() {
    return this.#addAck;
  }

  set addAck(addAck) {
    this.#addAck = addAck;
  }

  addComments(comment) {
    this.#comments.push(comment);
    this.notifyPropertyChange('comments', this.#comments);
  }
}
