// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { Http, ApplicationSettings, Frame } from '@nativescript/core'
import { encode } from 'base-64'
import { Toasty, ToastDuration } from '@triniwiz/nativescript-toasty';

export class IcingaFacade {
    static #_instance;

    static getInstance() {
        if (IcingaFacade.#_instance == null) {
            IcingaFacade.#_instance = new IcingaFacade();
        }

        return IcingaFacade.#_instance;
    }
    
    #errorModuleName = null;

    constructor() {
    }

    set errorModuleName(errorModuleName) {
        this.#errorModuleName = errorModuleName;
    }

    requestErrorHandler(error) {
        console.error(error);
        new Toasty({ 
            text: error.toString(),
            duration: ToastDuration.LONG,
        }).show();

        if (this.#errorModuleName) {
            Frame.topmost().navigate({
                moduleName: this.#errorModuleName,
            })
        }
    }

    get(path, callback) {
        const requestOptions = {
            url: ApplicationSettings.getString('url') + path,
            method: 'GET',
            headers: { 'Authorization': 'Basic ' + encode(ApplicationSettings.getString('username') + ':' + ApplicationSettings.getString('password')) },
        };
          
        Http.request(requestOptions).then(result => {
            let callbackParameter = null;

// console.log('IcingaFacade.request: statusCode: ' + result.statusCode);
// console.log('IcingaFacade.request: response: ' + result.content);
            switch (result.statusCode) {
                case 200:
// console.log('response: ' + JSON.stringify(result.content, null, 4));
                    callbackParameter = JSON.parse(result.content);
                    break;
                case 401:
                    this.requestErrorHandler("Unauthorized user " + ApplicationSettings.getString('username'));
                    break;
                case 404:
                    this.requestErrorHandler("Not found (check URL " + requestOptions.url + ")");
                    break;
            }

            callback(callbackParameter);
        }, error => {
            this.requestErrorHandler(error);
            callback(null);
        });
    }

    getHosts(callback) {
        this.get('/v1/objects/hosts', callback);
    }

    getHostProblems(callback) {
        this.get('/v1/objects/hosts?filter=host.problem', callback);
    }

    getServices(callback) {
        this.get('/v1/objects/services?joins=host.address&joins=host.address6', callback);
    }

    getServiceProblems(callback) {
        this.get('/v1/objects/services?filter=service.problem&joins=host.address&joins=host.address6', callback);
    }

    getStatus(callback) {
        this.get('/v1/status', callback);
    }

    getServiceComments(serviceName, callback) {
        this.get('/v1/objects/comments?joins=service.__name&filter=service.__name==%22' + serviceName + '%22', callback);
    }

    getHostComments(hostName, callback) {
        this.get('/v1/objects/comments?joins=host.__name&filter=host.__name==%22' + hostName + '%22', callback);
    }

    post(path, content, callback) {
        const requestOptions = {
            url: ApplicationSettings.getString('url') + path,
            method: 'POST',
            headers: { 
                'Authorization': 'Basic ' + encode(ApplicationSettings.getString('username') + ':' + ApplicationSettings.getString('password')),
//                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            content: JSON.stringify(content),
        };

        Http.request(requestOptions).then(result => {
            let callbackParameter = null;

// console.log('result: ' + JSON.stringify(result, null, 4));
            switch (result.statusCode) {
                case 200:
                    callbackParameter = JSON.parse(result.content);
                    break;
                case 401:
                    this.requestErrorHandler("Unauthorized user " + ApplicationSettings.getString('username'));
                    break;
                case 404:
                    this.requestErrorHandler("Not found (check URL " + requestOptions.url + ")");
                    break;
            }

            callback(callbackParameter);
        }, error => {
            this.requestErrorHandler(error);
            callback(null);
        });
    }

    serviceFilter(name) {
        return {
            "type": "Service", 
            "filter": "service.__name==\"" + name + "\"",
        };
    }

    hostFilter(name) {
        return {
            "type": "Host", 
            "filter": "host.__name==\"" + name + "\"",
        };
    }

    rescheduleServiceCheck(name, callback) {
        this.post('/v1/actions/reschedule-check', this.serviceFilter(name), callback);
    }

    rescheduleHostCheck(name, callback) {
        this.post('/v1/actions/reschedule-check', this.hostFilter(name), callback);
    }

    removeServiceAck(name, callback) {
        this.post('/v1/actions/remove-acknowledgement', this.serviceFilter(name), callback);
    }

    removeHostAck(name, callback) {
        this.post('/v1/actions/remove-acknowledgement', this.hostFilter(name), callback);
    }

    acknowledgeServiceProblem(name, author, comment, expiry, sticky, notify, persistent, callback) {
        var params = this.serviceFilter(name);

        params.author = author;
        params.comment = comment;
        if (expiry) params.expiry = expiry;
        if (sticky) params.sticky = sticky;
        if (notify) params.notify = notify;
        if (persistent) params.persistent = persistent;

        this.post('/v1/actions/acknowledge-problem', params, callback);
    }

    acknowledgeHostProblem(name, author, comment, expiry, sticky, notify, persistent, callback) {
        var params = this.hostFilter(name);

        params.author = author;
        params.comment = comment;
        if (expiry) params.expiry = expiry;
        if (sticky) params.sticky = sticky;
        if (notify) params.notify = notify;
        if (persistent) params.persistent = persistent;

       this.post('/v1/actions/acknowledge-problem', params, callback);
    }

    commentService(name, author, comment, expiry, callback) {
        var params = this.serviceFilter(name);

        params.author = author;
        params.comment = comment;
        if (expiry) params.expiry = expiry;

        this.post('/v1/actions/add-comment', params, callback);
    }

    commentHost(name, author, comment, expiry, callback) {
        var params = this.hostFilter(name);

        params.author = author;
        params.comment = comment;
        if (expiry) params.expiry = expiry;

       this.post('/v1/actions/add-comment', params, callback);
    }

    notificationService(name, author, comment, force, callback) {
        var params = this.serviceFilter(name);

        params.author = author;
        params.comment = comment;
        if (force) params.force = force;

        this.post('/v1/actions/send-custom-notification', params, callback);
    }

    notificationHost(name, author, comment, force, callback) {
        var params = this.hostFilter(name);

        params.author = author;
        params.comment = comment;
        if (force) params.force = force;

       this.post('/v1/actions/send-custom-notification', params, callback);
    }
}