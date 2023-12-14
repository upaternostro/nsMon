import { Application, ApplicationSettings } from '@nativescript/core'

import { SelectedPageService } from '../shared/selected-page-service'
import { HomeViewModel } from './home-view-model'
import { IcingaFacade } from '~/shared/icinga-facade';

var page;

export function onNavigatingTo(args) {
  page = args.object;
  SelectedPageService.getInstance().updateSelectedPage('Home')
  page.bindingContext = new HomeViewModel();

  const icingaFacade = new IcingaFacade(ApplicationSettings.getString('url'), ApplicationSettings.getString('username'), ApplicationSettings.getString('password'));

  icingaFacade.getStatus(statusCB);
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
}
