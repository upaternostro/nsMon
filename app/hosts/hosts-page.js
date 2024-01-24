// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { Application, ApplicationSettings, Frame } from '@nativescript/core'

import { SelectedPageService } from '~/shared/selected-page-service'
import { IcingaObjectsViewModel } from '~/shared/icinga-objects-view-model'
import { IcingaFacade } from '~/shared/icinga-facade';
import { IcingaObject } from '~/shared/icinga-object';

var page;

export function onNavigatingTo(args) {
  if (args.isBackNavigation) {
    return;
  }
  
  page = args.object;
  SelectedPageService.getInstance().updateSelectedPage('Hosts');
  page.bindingContext = new IcingaObjectsViewModel();
  
  populateHostsList(false);
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView();
  sideDrawer.showDrawer();
}

export function hostsCB(obj) {
  if (obj) {
    for (const r of obj.results) {
      page.bindingContext.addObject(IcingaObject.assignObject(r));
    }
  }
}

export function onCheckedChange(args) {
  const showAllObjects = !page.bindingContext.showAllObjects;
  const hvm = new IcingaObjectsViewModel();

  hvm.showAllObjects = showAllObjects;
  page.bindingContext = hvm;

  populateHostsList(showAllObjects);
}

function populateHostsList(showAllObjects) {
  const icingaFacade = new IcingaFacade(ApplicationSettings.getString('url'), ApplicationSettings.getString('username'), ApplicationSettings.getString('password'));

  if (showAllObjects) {
    icingaFacade.getHosts(hostsCB);
  } else {
    icingaFacade.getHostProblems(hostsCB);
  }
}

export function onItemTap(args) {
  Frame.topmost().navigate({
    moduleName: 'host/host-page',
    context: { host: page.bindingContext.getItem(args.index) }
  })
}