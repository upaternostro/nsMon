import { Frame, ApplicationSettings } from '@nativescript/core'

import { HostViewModel } from './host-view-model'
import { SelectedPageService } from '../shared/selected-page-service'
import { IcingaFacade } from '~/shared/icinga-facade';

var page;

export function onNavigatingTo(args) {
  if (args.isBackNavigation) {
    return;
  }
  
  page = args.object
  page.bindingContext = new HostViewModel(page.navigationContext.host)
  SelectedPageService.getInstance().updateSelectedPage('Host');

  const icingaFacade = new IcingaFacade(ApplicationSettings.getString('url'), ApplicationSettings.getString('username'), ApplicationSettings.getString('password'));
  icingaFacade.getHostComments(page.navigationContext.host.attrs.__name, commentsCB)
}

export function onBackButtonTap(args) {
  Frame.topmost().goBack();
}

export function commentsCB(obj) {
  if (obj) {
    for (const r of obj.results) {
      page.bindingContext.addComment(r);
// console.log(r.attrs.text)
    }
  }
}
