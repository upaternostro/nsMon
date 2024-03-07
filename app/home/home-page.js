// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { Application } from '@nativescript/core'

import { SelectedPageService } from '~/shared/selected-page-service'
import { HomeViewModel } from './home-view-model'
import { IcingaFacade } from '~/shared/icinga-facade';

var page;
var pullRefresh = null;

export function onNavigatingTo(args) {
  if (args.isBackNavigation) {
    return;
  }
  
  page = args.object;
  SelectedPageService.getInstance().updateSelectedPage('Home')
  page.bindingContext = new HomeViewModel();

  IcingaFacade.getInstance().getStatus(statusCB);
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView();
  sideDrawer.showDrawer();
}

export function statusCB(obj) {
  if (obj) {
    for (const r of obj.results) {
      if (r.name === 'IcingaApplication') {
        page.bindingContext.icingaApplication = r;
      } else if (r.name === 'CIB') {
        page.bindingContext.cIB = r;
      }
    }
  }

  page.bindingContext.busy = false;
  
  if (pullRefresh) {
    pullRefresh.refreshing = false;
  }
}

export function onRefresh(args) {
  pullRefresh = args.object;
  IcingaFacade.getInstance().getStatus(statusCB);
}