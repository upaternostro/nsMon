import { IcingaObjectsViewModel } from "~/shared/icinga-objects-view-model";

export class HostsViewModel extends IcingaObjectsViewModel {
    static #_instance;

    static getInstance() {
        if (HostsViewModel.#_instance == null) {
            HostsViewModel.#_instance = new HostsViewModel();
        }
  
        return HostsViewModel.#_instance;
    }
    
    constructor() {
        super();
    }
}