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

  page.bindingContext.set('selectedPage', componentTitle)

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
  let foundSelected = false;
  let nextEntry;

  for (const e of page.bindingContext.entries) {
    if (!foundSelected) {
      if (e.selected) {
        foundSelected = true;
      }
    } else {
      if (e.type == 'entry') {
        nextEntry = e;
        break;
      }
    }
  }

  if (!nextEntry) {
    for (const e of page.bindingContext.entries) {
      if (e.type == 'entry') {
        nextEntry = e;
        break;
      }
    }
  }

  return nextEntry.route;
}

function previousModule() {
  let previousEntry;

  for (const e of page.bindingContext.entries) {
    if (e.selected) {
      break;
    }

    if (e.type == 'entry') {
      previousEntry = e;
    }
  }

  if (!previousEntry) {
    for (const e of page.bindingContext.entries) {
      if (e.type == 'entry') {
        previousEntry = e;
      }
    }
  }

  return previousEntry.route;
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

export function entriesTemplateSelector(item, index, items) {
  return item.type;
}
