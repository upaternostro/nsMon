// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { Application } from '@nativescript/core'

import { SelectedPageService } from '~/shared/selected-page-service'
import { SettingsViewModel } from './settings-view-model'
import { navigateOnSwipe } from '~/app-root/app-root'
import { updateTimer } from '~/app';

var page;

export function onNavigatingTo(args) {
  SelectedPageService.getInstance().updateSelectedPage('Settings');
  
  if (args.isBackNavigation) {
    return;
  }
  
  page = args.object;
  page.bindingContext = SettingsViewModel.getInstance();
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView();
  sideDrawer.showDrawer();
}

export function onSaveTap(args) {
  page.bindingContext.persistConfig();
  // notify worker of setting change
  updateTimer.postMessage({});
}

export function onSwipe(args) {
  navigateOnSwipe(args);
}
