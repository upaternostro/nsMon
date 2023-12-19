import { Observable, ObservableArray } from "@nativescript/core"

export class ServiceViewModel extends Observable {
  #now;
  #service;
  #comments = new ObservableArray();

  constructor(service) {
    super();

    this.#now = new Date();
    this.#service = service;
    this.#comments.length = 0;
  }

  get now() {
    return this.#now;
  }

  get service() {
    return this.#service;
  }

  get comments() {
    return this.#comments;
  }

  addComment(comment) {
    this.#comments.push(comment);
    this.notifyPropertyChange('comments', this.#comments);
  }
}
