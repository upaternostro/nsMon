// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { Application } from '@nativescript/core'

import { SelectedPageService } from '~/shared/selected-page-service'
import { SettingsViewModel } from './settings-view-model'

var page;

export function onNavigatingTo(args) {
  if (args.isBackNavigation) {
    return;
  }
  
  page = args.object;
  SelectedPageService.getInstance().updateSelectedPage('Settings');
  page.bindingContext = new SettingsViewModel();
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView();
  sideDrawer.showDrawer();
}

export function onSaveTap(args) {
  page.bindingContext.persistConfig();
}
