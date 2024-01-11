// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { Observable, ObservableArray } from '@nativescript/core'

export class ServicesViewModel extends Observable {
  #services;
  #showAllServices;

  constructor() {
    super();

    this.#services = new ObservableArray();
    this.#showAllServices = false;
  }

  addService(s) {
    this.#services.push(s);
  }

  get services() {
    return this.#services;
  }

  get showAllServices() {
    return this.#showAllServices;
  }

  set showAllServices(showAllServices) {
    this.#showAllServices = showAllServices;
  }

  getItem(pos) {
    return this.#services.getItem(pos);
  }
}
