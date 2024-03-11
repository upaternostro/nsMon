// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { fromObject, Observable, ObservableArray } from '@nativescript/core'

import { SelectedPageService } from '~/shared/selected-page-service'

export function AppRootViewModel() {
  const viewModel = fromObject({
    selectedPage: '',
    entries: new ObservableArray(
      new PageEntry('Home', 'home/home-page', '\uf015', 'nt-icon fas'),
      new PageEntry('Hosts', 'hosts/hosts-page', '\uf002', 'nt-icon fas'),
      new PageEntry('Services', 'services/services-page', '\uf1ea', 'nt-icon far'),
      new HREntry(),
      new PageEntry('Settings', 'settings/settings-page', '\uf013', 'nt-icon fas'),
    ),
  })

  SelectedPageService.getInstance().selectedPage$.subscribe((selectedPage) => {
    viewModel.selectedPage = selectedPage;

    for (const e of viewModel.entries) {
      e.selected = selectedPage === e.title;
      e.notifyPropertyChange('selected', e.selected);
    }
  })

  return viewModel
}

class Entry extends Observable {
  type;
  title;
  route;
  icon;
  iconClass;
  selected;

  constructor(type, title, route, icon, iconClass) {
    super();

    if (this.constructor === Entry) {
      throw new Error("Can't instantiate abstract class!");
    }

    this.type       = type;
    this.title      = title;
    this.route      = route;
    this.icon       = icon;
    this.iconClass  = iconClass;
    this.selected   = false;
  }
}

class PageEntry extends Entry {
  constructor(title, route, icon, iconClass) {
    super('entry', title, route, icon, iconClass);
  }
}

class HREntry extends Entry {
  constructor() {
    super('hr', null, null, null, null);
  }
}