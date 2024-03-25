// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { Application } from '@nativescript/core';

import { SelectedPageService } from '~/shared/selected-page-service';
import { HomeViewModel } from './home-view-model';
import { IcingaFacade } from '~/shared/icinga-facade';
import { navigateOnSwipe } from '~/app-root/app-root';
import { updateTimer } from '~/app';

var page;
var pullRefresh = null;

export function onNavigatingTo(args) {
  SelectedPageService.getInstance().updateSelectedPage('Home');

  if (args.isBackNavigation) {
    return;
  }
  
  page = args.object;
  page.bindingContext = HomeViewModel.getInstance();

  IcingaFacade.getInstance().getStatus(statusCB);

  updateTimer.onmessage = (e) => {
    page.bindingContext.icingaApplication = e.data.icingaApplication;
    page.bindingContext.cIB = e.data.cIB;
  }
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

export function onSwipe(args) {
  navigateOnSwipe(args);
}

export function onRefresh(args) {
  pullRefresh = args.object;
  IcingaFacade.getInstance().getStatus(statusCB);
}