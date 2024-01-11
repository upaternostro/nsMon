// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { fromObject } from '@nativescript/core'

import { SelectedPageService } from '~/shared/selected-page-service'

export function AppRootViewModel() {
  const viewModel = fromObject({
    selectedPage: '',
  })

  SelectedPageService.getInstance().selectedPage$.subscribe((selectedPage) => {
    viewModel.selectedPage = selectedPage
  })

  return viewModel
}
