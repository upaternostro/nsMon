import { Observable } from '@nativescript/core'

export class HomeViewModel extends Observable {
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
