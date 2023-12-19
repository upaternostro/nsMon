import { Observable, ObservableArray } from "@nativescript/core"

export class HostViewModel extends Observable {
  #now;
  #host;
  #comments = new ObservableArray();

  constructor(host) {
    super();

    this.#now = new Date();
    this.#host = host;
    this.#comments.length = 0;
  }

  get now() {
    return this.#now;
  }

  get host() {
    return this.#host;
  }

  get comments() {
    return this.#comments;
  }

  addComment(comment) {
    this.#comments.push(comment);
    this.notifyPropertyChange('comments', this.#comments);
  }
}
