import '@nativescript/core/globals'
import { Utils, Color, ApplicationSettings } from '@nativescript/core'
import { IcingaFacade } from '~/shared/icinga-facade';
import { LocalNotifications } from '@nativescript/local-notifications';
import { SettingsViewModel } from '~/settings/settings-view-model'

var intervalId;
var firstRun = true;
var working = false;
var icingaApplication;
var cIB;
var ok;
var warning;
var critical;
var unknown;
var oldLevel;
var notificationId;

self.onerror = function handler(error) {
    console.error('Update timer worker error: ' + error);
    return true;
}

self.onmessage = (e) => {
    clean();

    if (ApplicationSettings.getBoolean("autoRefresh", false)) {
        startTimer();
    }
}

if (ApplicationSettings.getBoolean("autoRefresh", false)) {
    startTimer();

    if (ApplicationSettings.getBoolean("notifications", false)) {
        // force a cicle to display notification
        timer();
    } else {
        firstRun = false;
    }
}

function startTimer() {
    intervalId = Utils.setInterval(timer, SettingsViewModel.getSelectedIntervalMillis());
}

function timer() {
    if (working) return;

    working = true;
    icingaApplication = null;
    cIB = null;
    ok = 0;
    warning = 0;
    critical = 0;
    unknown = 0;

    IcingaFacade.getInstance().getStatus(statusCB);
}

function statusCB(obj) {
    if (obj && obj.results && Array.isArray(obj.results) && obj.results.length > 0 && obj.results[0]) {
        for (const r of obj.results) {
            if (r.name === 'IcingaApplication') {
                icingaApplication = r;
            } else if (r.name === 'CIB') {
                cIB = r;
            }
        }

        if (!firstRun) {
            self.postMessage({
                'icingaApplication': icingaApplication,
                'cIB': cIB,
            });
        }

        firstRun = false;

        if (ApplicationSettings.getBoolean("notifications", false)) {
            IcingaFacade.getInstance().getUnhandledHosts(hostsCB);
        } else {
            working = false;
        }
    } else {
        working = false;
    }
}

function hostsCB(obj) {
    if (obj && obj.results && Array.isArray(obj.results)) {
        // hosts just have two states: 0 (ok) and 1 (down), so each unhandled host is down
        critical += obj.results.length;
        IcingaFacade.getInstance().getUnhandledServices(servicesCB);
    } else {
        working = false;
    }
}

function servicesCB(obj) {
    if (obj && obj.results && Array.isArray(obj.results)) {
        for (const s of obj.results) {
            switch (s.attrs.state) {
              case 0: // ok
                ok++;
                break;
              case 1: // warning
                warning++;
                break;
              case 2: // critical
                critical++;
                break;
              case 3: // unknown
                unknown++;
                break;
            }
        }

        var level;

        if (unknown > 0) {
            level = 3;
        } else if (critical > 0) {
            level = 2;
        } else if (warning > 0) {
            level = 1;
        } else {
            level = 0;
        }

        if (oldLevel == level) {
            // noting changed, bail out
            working = false;
            return;
        }

        oldLevel = level;

        // sum it up
        if (notificationId) {
            LocalNotifications.cancel(notificationId);
        }
    
        var color;
    
        switch (level) {
            case 3:
                color = new Color("#c57fff");
                break;
            case 2:
                color = new Color("#ff99aa");
                break;
            case 1:
                color = new Color("#ffcc66");
                break;
            case 0:
                color = new Color("#44bb77");
                break;
        } 
    
        LocalNotifications.schedule([
            {
                title: 'Icinga status',
                body: 'Hosts ' + (cIB.status.num_hosts_up + cIB.status.num_hosts_problem) + ' (' + cIB.status.num_hosts_problem + ' down)' +
                    ' - Services ' + (cIB.status.num_services_ok + cIB.status.num_services_problem) + ' (' + cIB.status.num_services_unknown + ' U/' + cIB.status.num_services_critical + ' C/' + cIB.status.num_services_warning + ' W)',
                'color': color,
                badge: 1,
                // ongoing: true, // makes the notification ongoing (Android only)
                channel: 'nsmon Channel',
            },
        ]).then(
            (scheduledIds) => {
                notificationId = scheduledIds[0];
            },
            (error) => {
                notificationId = null;
            }
        );
    }

    working = false;
}

export function clean() {
    if (intervalId) {
        Utils.clearInterval(intervalId);
        intervalId = null;
    }

    if (notificationId) {
        LocalNotifications.cancel(notificationId);
        notificationId = null;
        oldLevel = null;
    }
}