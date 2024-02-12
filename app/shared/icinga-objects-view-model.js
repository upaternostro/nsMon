// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { ObservableArray } from '@nativescript/core'
import { BusyIndicatorViewModel } from '~/shared/busy-indicator-view-model'

export class IcingaObjectsViewModel extends BusyIndicatorViewModel {
  #objects;
  #showAllObjects;

  constructor() {
    super();

    this.#objects = new ObservableArray();
    this.#showAllObjects = false;
  }

  addObject(o) {
    this.#objects.push(o);
    // Keep 'em sorted
    this.#objects.sort((a,b) => {
      return a.compare(b);
    });
  }

  get objects() {
    return this.#objects;
  }

  get showAllObjects() {
    return this.#showAllObjects;
  }

  set showAllObjects(showAllObjects) {
    this.#showAllObjects = showAllObjects;
  }

  getItem(pos) {
    return this.#objects.getItem(pos);
  }
}
