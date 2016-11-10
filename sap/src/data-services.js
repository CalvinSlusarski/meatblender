import {HttpClient} from 'aurelia-fetch-client';


@inject(HttpClient)
//http://ilikekillnerds.com/2015/10/all-about-the-aurelia-fetch-client/
export class dataServices{
     constructor(http) {
        this.http = http;
        http.configure(config => {
        config
            .withBaseUrl('api/')
            .withDefaults({
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'Fetch'
                }
            })
            .withInterceptor({
                request(request) {
                    console.log(`Requesting ${request.method} ${request.url}`);
                    return request; // you can return a modified Request, or you can short-circuit the request by returning a Response
                },
                response(response) {
                    console.log(`Received ${response.status} ${response.url}`);
                    return response; // you can return a modified Response
                }
            });
    });
    }
    getJson(url) {
        console.log(url);
        console.log(url);
        console.log(url);
        console.log(url);
        return this.http.fetch(url)
            .then(response => response.json())
            .then(data => {
                    console.log(data);
            })
    }
    postJson(url, data) {
        return this.http.fetch(url, {
            method: 'post',
            body: json(data)
        })
    }
}
/*
Limitations

This library does not include a polyfill for Fetch. If you need to support browsers that haven't implemented Fetch, you will need to install a polyfill like GitHub's Fetch polyfill.
This library does not work around any of the existing limitations in the Fetch API, including:
Fetch does not currently support aborting requests or specifying request timeouts.
Fetch does not currently support progress reporting.
JSONP support is not currently provided by this library.
The Request constructor provides its own default values, so if a Request is created before invoking HttpClient.fetch (eg, the HttpClient.fetch(request) signature is used instead of the HttpClient.fetch(url, params) signature), there is no way for the client to know which default values to merge into the Request. The base URL and headers can be merged, but currently no other defaults will be applied in this case.
*/