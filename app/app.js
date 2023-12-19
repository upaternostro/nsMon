import { Application } from '@nativescript/core'
import { format, intervalToDuration, formatDuration } from 'date-fns'

global.date_fns = {
  format: function(date, pFormat, options) {
    return format(date, pFormat, options);
  },
  intervalToDuration: function(interval) {
// console.log(interval);
    return intervalToDuration(interval);
  },
  formatDuration: function(duration, options) {
    return formatDuration(duration, options);
  }
};

Application.run({ moduleName: 'app-root/app-root' })

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
