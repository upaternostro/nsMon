// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { Observable } from '@nativescript/core'

export class BusyIndicatorViewModel extends Observable {
  #busy

  constructor() {
    super();

    if (this.constructor === BusyIndicatorViewModel) {
        throw new Error("Can't instantiate abstract class!");
    }

    this.#busy = true;
  }

  get isBusy() {
    return this.#busy;
  }

  set busy(busy) {
    this.#busy = busy;
    this.notifyPropertyChange('isBusy', busy);
  }
}
