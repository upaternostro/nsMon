import { Frame, ApplicationSettings } from '@nativescript/core'

import { HostViewModel } from './host-view-model'
import { SelectedPageService } from '~/shared/selected-page-service'
import { IcingaFacade } from '~/shared/icinga-facade';
import { Toasty, ToastDuration } from '@triniwiz/nativescript-toasty';
import { openModal } from '~/shared/modal'

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

export function onCheckTap() {
  const icingaFacade = new IcingaFacade(ApplicationSettings.getString('url'), ApplicationSettings.getString('username'), ApplicationSettings.getString('password'));
  icingaFacade.rescheduleHostCheck(page.bindingContext.host.attrs.__name, checkCB);
}

export function checkCB(obj) {
  new Toasty({ 
    text: obj.results[0].status,
    duration: ToastDuration.LONG,
  }).show();
}

export function onAckTap() {
  if (page.bindingContext.service.attrs.acknowledgement != 0) {
    openModal("~/widgets/remove-ack/dialog", require("~/widgets/remove-ack/dialog-host"));
  } else {
    openModal("~/widgets/add-ack/dialog", require("~/widgets/add-ack/dialog-host"), {
      model: page.bindingContext,
    });
  }
}
