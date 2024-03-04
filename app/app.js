// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { Application, ApplicationSettings } from '@nativescript/core'
import { format, intervalToDuration, formatDuration } from 'date-fns'
import { IcingaFacade } from '~/shared/icinga-facade';

Application.setResources({ 
  dateF: format,
  dateI2D: intervalToDuration,
  dateFD: formatDuration,
  AS: ApplicationSettings,
});

IcingaFacade.getInstance().errorModuleName = 'settings/settings-page';

Application.run({ moduleName: 'app-root/app-root' })

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
