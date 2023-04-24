import request from './request.js';

class $CodeHS_DB {
    constructor() {
    }

    init = (subdomain, path) => {
        return new Promise((resolve, reject) => {
            this.instance = subdomain;
            this.headers = {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
                'referer': `https://${this.instance}.codehs.me`
            };
            this.path = path;

            /*request(`https://${this.instance}.codehs.me/editor/ajax/firebase_owner_id`, {
                method: 'POST',
                headers: this.headers
            }).then(res => {
                this.headers['Cookie'] = new Headers(res.headers).get('set-cookie');
                console.log(this.headers['Cookie']);
            });*/

            request(`https://${this.instance}.codehs.me/editor/ajax/firebase_owner_id`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    codehsmeHostname: `${this.instance}.codehs.me`
                })
            })
                .then(res => {
                    if (JSON.parse(res.data.toString()).status === 'ok') {
                        this.ownerID = JSON.parse(res.data.toString()).ownerID;

                        resolve(new this.DB(this));
                    } else {
                        console.error('Failed to get owner id');
                        reject('Failed to get owner id');
                    }
                }).catch(e => {
                    console.error('Failed to get owner id');
                    reject('Failed to get owner id');

                    console.log(e);
                });
        });
    }

    DB = class {
        constructor(data) {
            this.headers = data.headers;
            this.path = data.path;
            this.ownerID = data.ownerID;
            this.instance = data.instance;

            setTimeout(() => {
                this.onready();
            }, 1)
        }

        onready;

        on = (event, callback) => {
            this.onready = () => {
                if (event == 'ready') {
                    try {
                        callback();
                    } catch (e) { }
                }
            }
        }

        subFolder = (path) => {
            return new CodeHS_DB.DB({
                headers: this.headers,
                path: this.path+path,
                ownerID: this.ownerID,
                instance: this.instance
            });
        }

        get = () => {
            return new Promise((resolve, reject) => {
                request(`https://${this.instance}.codehs.me/editor/ajax/firebase_get`, {
                    method: 'POST',
                    headers: this.headers,
                    body: JSON.stringify({
                        codehsmeHostname: `${this.instance}.codehs.me`,
                        path: this.path,
                        projectName: this.path
                    })
                })
                    .then(res => {
                        if (JSON.parse(res.data.toString()).status === 'ok') {
                            resolve(JSON.parse(res.data.toString()).val);
                        } else {
                            console.error('Failed to set database');
                            reject('');
                        }
                    }).catch(e => {
                        console.error('Failed to set database');
                        reject('');
                    });
            });
        }

        set = (value) => {
            request(`https://${this.instance}.codehs.me/editor/ajax/firebase_set`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    codehsmeHostname: `${this.instance}.codehs.me`,
                    path: this.path,
                    projectName: this.path,
                    value: value
                })
            })
                .then(res => {
                    if (JSON.parse(res.data.toString()).status !== 'ok') {
                        console.error('Failed to set database');
                    }
                }).catch(e => {
                    console.error('Failed to set database');
                });
        }

        delete = () => {
            request(`https://${this.instance}.codehs.me/editor/ajax/firebase_push`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    codehsmeHostname: `${this.instance}.codehs.me`,
                    path: this.path,
                    projectName: this.path,
                    value: null
                })
            })
                .then(res => {
                    if (JSON.parse(res.data.toString()).status !== 'ok') {
                        console.error('Failed to remove database');
                    }
                }).catch(e => {
                    console.error('Failed to remove database');
                });
        }
    }
}

const CodeHS_DB = new $CodeHS_DB();

export default CodeHS_DB;
