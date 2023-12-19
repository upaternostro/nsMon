import { Application, ApplicationSettings, Frame } from '@nativescript/core'

import { SelectedPageService } from '../shared/selected-page-service'
import { HostsViewModel } from './hosts-view-model'
import { IcingaFacade } from '~/shared/icinga-facade';

var page;

export function onNavigatingTo(args) {
  page = args.object;
  SelectedPageService.getInstance().updateSelectedPage('Hosts');
  page.bindingContext = new HostsViewModel();
  
  populateHostsList(false);
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView();
  sideDrawer.showDrawer();
}

export function hostsCB(obj) {
  if (obj) {
    for (const r of obj.results) {
      page.bindingContext.addHost(r);
    }
  }
}

export function onCheckedChange(args) {
  const showAllHosts = !page.bindingContext.showAllHosts;
  const hvm = new HostsViewModel();

  hvm.showAllHosts = showAllHosts;
  page.bindingContext = hvm;

  populateHostsList(showAllHosts);
}

function populateHostsList(showAllHosts) {
  const icingaFacade = new IcingaFacade(ApplicationSettings.getString('url'), ApplicationSettings.getString('username'), ApplicationSettings.getString('password'));

  if (showAllHosts) {
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