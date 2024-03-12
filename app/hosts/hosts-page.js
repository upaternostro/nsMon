// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { Application, Frame } from '@nativescript/core'

import { SelectedPageService } from '~/shared/selected-page-service'
import { HostsViewModel } from './hosts-view-model'
import { IcingaFacade } from '~/shared/icinga-facade';
import { IcingaObject } from '~/shared/icinga-object';
import { navigateOnSwipe } from '~/app-root/app-root'

var page;
var pullRefresh = null;

export function onNavigatingTo(args) {
  SelectedPageService.getInstance().updateSelectedPage('Hosts');

  if (args.isBackNavigation) {
    return;
  }
  
  page = args.object;
  page.bindingContext = HostsViewModel.getInstance();
  
  populateHostsList(page.bindingContext.showAllObjects);
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

  page.bindingContext.busy = false;
  
  if (pullRefresh) {
    pullRefresh.refreshing = false;
  }
}

export function onCheckedChange(args) {
  const showAllObjects = args.value;
  const hvm = page.bindingContext;

  if (showAllObjects == hvm.showAllObjects) {
    /*
     * Model already contains the correct value. This may happen on page navigation
     * if the switch is activated because of model value. In this case, NativeScript
     * fires this event and, if you execute it calling populateHostsList, you'll end
     * up with a list if doubled items, as the populateHostsList is called also by
     * onNavigatingTo (does not need to be a back navigation).
     */
    return;
  }

  hvm.showAllObjects = showAllObjects;
  populateHostsList(showAllObjects);
}

function populateHostsList(showAllObjects) {
  page.bindingContext.busy = true;
  page.bindingContext.clearObjects();

  if (showAllObjects) {
    IcingaFacade.getInstance().getHosts(hostsCB);
  } else {
    IcingaFacade.getInstance().getHostProblems(hostsCB);
  }
}

export function onItemTap(args) {
  Frame.topmost().navigate({
    moduleName: 'host/host-page',
    context: { object: page.bindingContext.getItem(args.index) }
  })
}

export function onRefresh(args) {
  const showAllObjects = page.bindingContext.showAllObjects;

  pullRefresh = args.object;
  populateHostsList(showAllObjects);
}

export function onSwipe(args) {
// console.log('onSwipe ' + args.direction);
  navigateOnSwipe(args);
}
