# nsMon - NativeScript Icinga mobile client

nsMon is a mobile client using Icinga2 API written in NativeScript.

It is inspired by [GRMonitor](https://github.com/grotan1/grmonitor_issuetracker) by Geir Rune Grøtan (thanks!).

## LICENSE

Copyright Ugo Paternostro 2023, 2024. Licensed under
the EUPL-1.2 or later.

See [LICENSE](LICENSE.md) for license full text, or visit [European Commission Joinup site](https://joinup.ec.europa.eu/collection/eupl) for latest version.

## BUILDING

Install NativeScript (see [NativeScript - Environment Setup](https://docs.nativescript.org/setup/))

Clone repository

    git clone https://github.com/upaternostro/nsMon.git

Change directory

    cd nsMon

Build it

    tns build android

## USAGE

Launch the app and configure the server URL where Icinga2 API are exposed (i.e.: `https://myhost:myport/mycontext`, the app will add `/v1/...` to that URL), the username and the password.

Remember that the username/password pair must exists in your `api-users.conf`

## Disclaimer

Please be kind, this is my very first NativeScript project ;)
