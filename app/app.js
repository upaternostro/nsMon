import { Application } from '@nativescript/core'
import { format, intervalToDuration, formatDuration } from 'date-fns'

Application.setResources({ 
  dateF: format,
  dateI2D: intervalToDuration,
  dateFD: formatDuration,
 });

Application.run({ moduleName: 'app-root/app-root' })

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
