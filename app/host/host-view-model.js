import { Observable, ObservableArray } from "@nativescript/core"

export class HostViewModel extends Observable {
  #now;
  #host;
  #comments = new ObservableArray();
  #addAck;

  constructor(host) {
    super();

    this.#now = new Date();
    this.#host = host;
    this.#comments.length = 0;
    this.#addAck = null;
  }

  get now() {
    return this.#now;
  }

  get host() {
    return this.#host;
  }

  get object() {
    return this.#host;
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

  addComment(comment) {
    this.#comments.push(comment);
    this.notifyPropertyChange('comments', this.#comments);
  }
}
