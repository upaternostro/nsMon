import { Http } from '@nativescript/core'

export class IcingaFacade {
    #url;
    #username;
    #password;
    
    constructor(url, username, password) {
        this.#url = url;
        this.#username = username;
        this.#password = password;
    }

    request(path, callback) {
        const requestOptions = {
            url: this.#url + path,
            method: 'GET',
            headers: { 'Authorization': 'Basic ' + btoa(this.#username + ':' + this.#password) },
        };
          
        Http.request(requestOptions).then(result => {
            if (result.statusCode == 200) {
              callback(JSON.parse(result.content));
            }
        }, error => {
            console.log(error);
        });

        return null;
    }

    getHosts(callback) {
        this.request('/v1/objects/hosts', callback);
    }

    getHostProblems(callback) {
        this.request('/v1/objects/hosts?filter=host.problem', callback);
    }

    getServices(callback) {
        this.request('/v1/objects/services?joins=host.address&joins=host.address6', callback);
    }

    getServiceProblems(callback) {
        this.request('/v1/objects/services?filter=service.problem&joins=host.address&joins=host.address6', callback);
    }

    getStatus(callback) {
        this.request('/v1/status', callback);
    }

    getServiceComments(serviceName, callback) {
        this.request('/v1/objects/comments?joins=service.__name&filter=service.__name==%22' + serviceName + '%22', callback);
    }

    getHostComments(hostName, callback) {
        this.request('/v1/objects/comments?joins=host.__name&filter=host.__name==%22' + hostName + '%22', callback);
    }
}