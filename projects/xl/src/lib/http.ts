
export type RequestResult = [string, any]
export type ResultHandle<T> = (v: any) => T;

export interface HttpClass {
    getWithJson(url: string, data: any): Promise<any | null>
    getWithJson<T>(url: string, data: any): Promise<T | null>
    putWithJson(url: string, data: any): Promise<any | null>
    putWithJson<T>(url: string, data: any): Promise<T | null>
    postWithJson(url: string, data: any): Promise<any | null>
    postWithJson<T>(url: string, data: any): Promise<T | null>
    deleteWithJson(url: string, data: any): Promise<any | null>
    deleteWithJson<T>(url: string, data: any): Promise<T | null>
}



export class HttpClass {
    requestSync(url: string, method: string, data: any): Promise<[string, any]> {
        method = method || 'get';
        data = data || null;
        return new Promise<[string, any]>((s, f) => {
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onloadend = (ev) => {
                if (ev.loaded) {// 200 = OK
                    s(["", xmlhttp.response]);
                } else {
                    s([`${xmlhttp.status}(${xmlhttp.statusText})`, null]);
                }
            }
            xmlhttp.open(method, url, true);
            xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
            xmlhttp.setRequestHeader('Content-Type', 'application/json');
            xmlhttp.setRequestHeader('If-Modified-Since', '0');
            xmlhttp.setRequestHeader("x-requested-with", "XMLHttpRequest");

            let sendString: string = "";
            if (data && typeof data == 'string') {
                sendString = data as string;
            }
            if (data && typeof data == 'object') {
                sendString = JSON.stringify(data);
            }
            xmlhttp.send(sendString);

        });
    }




    getSync(url: string, data: any) {
        return this.requestSync(url, "GET", data);
    }

    putSync(url: string, data: any) {
        return this.requestSync(url, "PUT", data);
    }

    postSync(url: string, data: any) {
        return this.requestSync(url, "POST", data);
    }
    deleteSync(url: string, data: any) {
        return this.requestSync(url, "DELETE", data);
    }

    async getWithJson(url: string, data: any): Promise<Object | null> {
        const [err, ret] = await this.requestSync(url, "GET", data);
        if (!err) {
            return JSON.parse(ret)
        } else {
            return null;
        }
    }

    async putWithJson(url: string, data: any): Promise<Object | null> {
        const [err, ret] = await this.requestSync(url, "PUT", data);
        if (!err) {
            return JSON.parse(ret)
        } else {
            return null;
        }
    }

    async postWithJson(url: string, data: any): Promise<Object | null> {
        const [err, ret] = await this.requestSync(url, "POST", data);
        if (!err) {
            return JSON.parse(ret)
        } else {
            return null;
        }
    }
    async deleteWithJson(url: string, data: any): Promise<Object | null> {
        const [err, ret] = await this.requestSync(url, "DELETE", data);
        if (!err) {
            return JSON.parse(ret)
        } else {
            return null;
        }
    }
}

export const http = new HttpClass();