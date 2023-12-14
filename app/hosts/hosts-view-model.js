import { Observable, ObservableArray } from '@nativescript/core'

export class HostsViewModel extends Observable {
  #hosts;
  #showAllHosts;

  constructor() {
    super();

    this.#hosts = new ObservableArray();
    this.#showAllHosts = false;
  }

  addHost(h) {
    this.#hosts.push(h);
  }

  get hosts() {
    return this.#hosts;
  }

  get showAllHosts() {
    return this.#showAllHosts;
  }

  set showAllHosts(showAllHosts) {
    this.#showAllHosts = showAllHosts;
  }
}
