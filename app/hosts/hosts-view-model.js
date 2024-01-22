// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
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
    // Keep 'em sorted
    this.#hosts.sort((a,b) => {
      return a.compare(b);
    });
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

  getItem(pos) {
    return this.#hosts.getItem(pos);
  }
}
