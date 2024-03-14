// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { Frame, SwipeDirection } from '@nativescript/core'

import { IcingaObjectViewModel } from '~/shared/icinga-object-view-model'
import { SelectedPageService } from '~/shared/selected-page-service'
import { IcingaFacade } from '~/shared/icinga-facade';
import { Toasty, ToastDuration } from '@triniwiz/nativescript-toasty';
import { openModal } from '~/shared/modal'
import { IcingaObject } from '~/shared/icinga-object'

var page;

export function onNavigatingTo(args) {
  if (args.isBackNavigation) {
    return;
  }
  
  page = args.object
  page.bindingContext = new IcingaObjectViewModel(page.navigationContext.object)
  SelectedPageService.getInstance().updateSelectedPage('Hosts'); // fake Hosts (plural) page, as this is a detail page not appearing in the drawer

  getComments();
}

export function getComments() {
  IcingaFacade.getInstance().getHostComments(page.navigationContext.object.attrs.__name, commentsCB)
}

export function onBackButtonTap(args) {
  Frame.topmost().goBack();
}

export function commentsCB(obj) {
  if (obj) {
    page.bindingContext.clearComments();

    for (const r of obj.results) {
      page.bindingContext.addComments(r);
// console.log(r.attrs.text)
    }
  }
  
  page.bindingContext.busy = false;
}

export function onCheckTap() {
  IcingaFacade.getInstance().rescheduleHostCheck(page.bindingContext.object.attrs.__name, checkCB);
}

export function checkCB(obj) {
  new Toasty({ 
    text: obj.results[0].status,
    duration: ToastDuration.LONG,
  }).show();
  page.navigationContext.forceRefreshCB();
}

export function onAckTap() {
  if (page.bindingContext.object.attrs.acknowledgement != 0) {
    openModal("~/widgets/remove-ack/dialog", require("~/widgets/remove-ack/dialog-host"), {
      forceRefreshCB: refreshCB,
    });
  } else {
    openModal("~/widgets/add-ack/dialog", require("~/widgets/add-ack/dialog-host"), {
      model: page.bindingContext,
      forceRefreshCB: refreshCB,
    });
  }
}

export function onCommentTap() {
  openModal("~/widgets/add-comment/dialog", require("~/widgets/add-comment/dialog-host"), {
    model: page.bindingContext,
    refreshCommentsCB: getComments,
  });
}

export function onNotificationTap() {
  openModal("~/widgets/add-notification/dialog", require("~/widgets/add-notification/dialog-host"), {
    model: page.bindingContext,
  });
}

export function onSwipe(args) {
  if (args.direction == SwipeDirection.right) {
    onBackButtonTap(args);
  }
}

export function refreshCB(obj) {
  IcingaFacade.getInstance().getService(page.bindingContext.object.attrs.__name, serviceCB);
}

export function serviceCB(obj) {
  page.bindingContext.object = IcingaObject.assignObject(obj.results[0]);
  getComments();
  page.navigationContext.forceRefreshCB();
}