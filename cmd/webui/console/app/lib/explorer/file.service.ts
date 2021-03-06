import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

export class File {
    url: string;
    name: string;
    type: string;
    path?: string;
    content?: string;
    dirty?: boolean = false;
    extension?: string = '';
    children?: Array<File>
}

@Injectable()
export class FileService {
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }


    get(root: string, path: string): Promise<any> {
        const url = `api/${root}${path}`;
        return this.http.get(url, { headers: this.headers })
            .toPromise()
            .then(response => {
                if (response.text() == '') {
                    return '';
                }
                let contentType = response.headers.get('content-type');
                if (contentType.indexOf('/json') > 0) {
                    let data = response.json();
                    for (let item of data) {
                        if (item['type'] == 'dir') {
                            item['hasChildren'] = true;
                            item['childern'] = new Array<File>();
                        }
                    }
                    return data;
                } else {
                    return response.text();
                }
            })
            .catch(this.error);
    }

    create(root: string, path: string): Promise<any> {
        const url = `api/${root}${path}`;
        return this.http.post(url, '', { headers: this.headers })
            .toPromise()
            .then(response => {
                let item = response.json()
                // if (item['type'] == 'dir') {
                //     item['hasChildren'] = true;
                //     item['childern'] = new Array<File>();
                // }
                return item;
            })
            .catch(this.error);
    }

    update(root: string, path: string, file: File): Promise<any> {
        const url = `api/${root}${path}`;
        var body = JSON.stringify(file);
        console.log(body)
        return this.http.put(url, body, { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    remove(root: string, path: string): Promise<any> {
        const url = `api/${root}${path}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    private error(error: any): Promise<any> {
        return Promise.reject(error.text());
    }
}