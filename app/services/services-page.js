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
  SelectedPageService.getInstance().updateSelectedPage('Services')
  page.bindingContext = new IcingaObjectsViewModel();
  
  populateServicesList(false);
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView();
  sideDrawer.showDrawer();
}

export function servicesCB(obj) {
  if (obj) {
    for (const r of obj.results) {
      page.bindingContext.addObject(IcingaObject.assignObject(r));
    }
  }
}

export function onCheckedChange(args) {
  const showAllObjects = !page.bindingContext.showAllObjects;
  const svm = new IcingaObjectsViewModel();

  svm.showAllObjects = showAllObjects;
  page.bindingContext = svm;

  populateServicesList(showAllObjects);
}

function populateServicesList(showAllObjects) {
  const icingaFacade = new IcingaFacade(ApplicationSettings.getString('url'), ApplicationSettings.getString('username'), ApplicationSettings.getString('password'));

  if (showAllObjects) {
    icingaFacade.getServices(servicesCB);
  } else {
    icingaFacade.getServiceProblems(servicesCB);
  }
}

export function onItemTap(args) {
  Frame.topmost().navigate({
    moduleName: 'service/service-page',
    context: { service: page.bindingContext.getItem(args.index) }
  })
}