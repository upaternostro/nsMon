import { IcingaObjectsViewModel } from "~/shared/icinga-objects-view-model";

export class ServicesViewModel extends IcingaObjectsViewModel {
    static #_instance;

    static getInstance() {
        if (ServicesViewModel.#_instance == null) {
            ServicesViewModel.#_instance = new ServicesViewModel();
        }
  
        return ServicesViewModel.#_instance;
    }
    
    constructor() {
        super();
    }
}