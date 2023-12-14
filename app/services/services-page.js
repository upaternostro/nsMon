import { Application } from '@nativescript/core'

import { BrowseViewModel } from './services-view-model'

export function onNavigatingTo(args) {
  const page = args.object
  page.bindingContext = new BrowseViewModel()
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView()
  sideDrawer.showDrawer()
}

