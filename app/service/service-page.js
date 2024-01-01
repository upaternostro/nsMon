import { Frame, ApplicationSettings } from '@nativescript/core'

import { ServiceViewModel } from './service-view-model'
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
  page.bindingContext = new ServiceViewModel(page.navigationContext.service)
  SelectedPageService.getInstance().updateSelectedPage('Service');

  const icingaFacade = new IcingaFacade(ApplicationSettings.getString('url'), ApplicationSettings.getString('username'), ApplicationSettings.getString('password'));
  icingaFacade.getServiceComments(page.navigationContext.service.attrs.__name, commentsCB)
}

export function onBackButtonTap(args) {
  Frame.topmost().goBack();
}

export function commentsCB(obj) {
  if (obj) {
    for (const r of obj.results) {
      page.bindingContext.addComments(r);
    }
  }
}

export function onCheckTap() {
  const icingaFacade = new IcingaFacade(ApplicationSettings.getString('url'), ApplicationSettings.getString('username'), ApplicationSettings.getString('password'));
  icingaFacade.rescheduleServiceCheck(page.bindingContext.service.attrs.__name, checkCB);
}

export function checkCB(obj) {
  new Toasty({ 
    text: obj.results[0].status,
    duration: ToastDuration.LONG,
  }).show();
}

export function onAckTap() {
  if (page.bindingContext.service.attrs.acknowledgement != 0) {
    openModal("~/widgets/remove-ack/dialog", require("~/widgets/remove-ack/dialog-service"));
  } else {
    openModal("~/widgets/add-ack/dialog", require("~/widgets/add-ack/dialog-service"), {
      model: page.bindingContext,
    });
  }
}
