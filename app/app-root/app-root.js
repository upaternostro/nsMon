// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { Frame, Application, SwipeDirection } from '@nativescript/core';

import { AppRootViewModel } from './app-root-view-model'

var page;

export function onLoaded(args) {
  page = args.object
  page.bindingContext = new AppRootViewModel()
}

export function onNavigationItemTap(args) {
  const component = args.object
  const componentRoute = component.route
  const componentTitle = component.title
  const bindingContext = component.bindingContext

  bindingContext.set('selectedPage', componentTitle)

  Frame.topmost().navigate({
    moduleName: componentRoute,
    transition: {
      name: 'fade',
    },
  })

  const drawerComponent = Application.getRootView()
  drawerComponent.closeDrawer()
}

function nextModule() {
  let nextModule;

  switch (page.bindingContext.selectedPage) {
    case 'Home':
      nextModule = 'hosts/hosts-page';
      break;
    case 'Hosts':
      nextModule = 'services/services-page';
      break;
    case 'Services':
      nextModule = 'settings/settings-page';
      break;
    case 'Settings':
      nextModule = 'home/home-page';
      break;
  }

  return nextModule;
}

function previousModule() {
  let prevModule;

  switch (page.bindingContext.selectedPage) {
    case 'Home':
      prevModule = 'settings/settings-page';
      break;
    case 'Hosts':
      prevModule = 'home/home-page';
      break;
    case 'Services':
      prevModule = 'hosts/hosts-page';
      break;
    case 'Settings':
      prevModule = 'services/services-page';
      break;
  }

  return prevModule;
}

export function navigateOnSwipe(args) {
  let nextModuleName;
  let transitionName;

  switch (args.direction) {
    case SwipeDirection.left:
      nextModuleName = nextModule();
      transitionName = 'slideLeft';
      break;
    case SwipeDirection.right:
      nextModuleName = previousModule();
      transitionName = 'slideRight';
      break;
  }

  if (nextModuleName) {
    Frame.topmost().navigate({
      moduleName: nextModuleName,
      transition: {
        name: transitionName,
      },
    })
  } else {
    console.warn('nsMon.app-root.navigateOnSwipe wrong direction ' + args.direction);
  }
}
