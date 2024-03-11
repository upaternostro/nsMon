// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { BusyIndicatorViewModel } from '~/shared/busy-indicator-view-model'

export class HomeViewModel extends BusyIndicatorViewModel {
  static #_instance;

  static getInstance() {
      if (HomeViewModel.#_instance == null) {
        HomeViewModel.#_instance = new HomeViewModel();
      }

      return HomeViewModel.#_instance;
  }
  
  #icingaApplication;
  #cIB;

  constructor() {
    super();
  }

  get icingaApplication() {
    return this.#icingaApplication;
  }

  get cIB() {
    return this.#cIB;
  }

  set icingaApplication(icingaApplication) {
    if (icingaApplication.name === 'IcingaApplication') {
      this.#icingaApplication = icingaApplication;
      this.notifyPropertyChange('icingaApplication', this.#icingaApplication);
    }
  }

  set cIB(cIB) {
    if (cIB.name === 'CIB') {
      this.#cIB = cIB;
      this.notifyPropertyChange('cIB', this.#cIB);
    }
  }
}
