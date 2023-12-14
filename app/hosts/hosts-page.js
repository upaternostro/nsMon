import { Application } from '@nativescript/core'

import { SearchViewModel } from './hosts-view-model'

export function onNavigatingTo(args) {
  const page = args.object
  page.bindingContext = new SearchViewModel()
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView()
  sideDrawer.showDrawer()
}
