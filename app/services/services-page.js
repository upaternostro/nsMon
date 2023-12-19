import { Application, ApplicationSettings, Frame } from '@nativescript/core'

import { SelectedPageService } from '../shared/selected-page-service'
import { ServicesViewModel } from './services-view-model'
import { IcingaFacade } from '~/shared/icinga-facade';

var page;

export function onNavigatingTo(args) {
  page = args.object;
  SelectedPageService.getInstance().updateSelectedPage('Services')
  page.bindingContext = new ServicesViewModel();
  
  populateServicesList(false);
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView();
  sideDrawer.showDrawer();
}

export function servicesCB(obj) {
  if (obj) {
    for (const r of obj.results) {
      page.bindingContext.addService(r);
    }
  }
}

export function onCheckedChange(args) {
  const showAllServices = !page.bindingContext.showAllServices;
  const svm = new ServicesViewModel();

  svm.showAllServices = showAllServices;
  page.bindingContext = svm;

  populateServicesList(showAllServices);
}

function populateServicesList(showAllServices) {
  const icingaFacade = new IcingaFacade(ApplicationSettings.getString('url'), ApplicationSettings.getString('username'), ApplicationSettings.getString('password'));

  if (showAllServices) {
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