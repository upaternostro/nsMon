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
        this.request('/v1/objects/services', callback);
    }

    getServiceProblems(callback) {
        this.request('/v1/objects/services?filter=service.problem', callback);
    }

    getStatus(callback) {
        this.request('/v1/status', callback);
    }
}