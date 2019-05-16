import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ToasterService } from 'angular2-toaster';

import { ResponseModel } from '../models/response.model';
import { environment } from '../../../environments/environment';


@Injectable()
export class BaseService {
    constructor(
        private _http: HttpClient,
        private _toasterService: ToasterService,
    ) { }

    protected get($path) {
        return this._http.get(this.getFullUrl($path))
            .toPromise()
            .then(($res: ResponseModel) => {
                if ($res.error) {
                    return Promise.reject($res.error);
                } else {
                    return Promise.resolve($res.data);
                }
            }).catch(this.errorHandler);
    }

    protected post($path, $data) {
        return this._http.post(this.getFullUrl($path), $data)
            .toPromise()
            .then(($res: ResponseModel) => {
                if ($res.error) {
                    return Promise.reject($res.error);
                } else {
                    return Promise.resolve($res.data);
                }
            }).catch(this.errorHandler);
    }

    protected delete($path) {
        return this._http.delete(this.getFullUrl($path))
            .toPromise()
            .then(($res: ResponseModel) => {
                if ($res.error) {
                    return Promise.reject($res.error);
                } else {
                    return Promise.resolve(true);
                }
            }).catch(this.errorHandler);
    }

    protected put($path, $data) {
        return this._http.put(this.getFullUrl($path), $data)
            .toPromise()
            .then(($res: ResponseModel) => {
                if ($res.error) {
                    return Promise.reject($res.error);
                } else {
                    return Promise.resolve(true);
                }
            }).catch(this.errorHandler);
    }

    private getFullUrl($path: string): string {
        return `${environment.API_ENDPOINT}${$path}`;
    }

    errorHandler = ($err) => {
        let errorMessage = '肯定是哪里出错了!';
        if ($err instanceof HttpErrorResponse) {
            const status = $err.status;
            if (status === 401) {
                errorMessage = '登录过期, 请重新登录!';
            } else if (status === 0) {
                errorMessage = '连接服务器失败!';
            }
        } else if (typeof $err === 'string') {
            errorMessage = $err;
        }
        this._toasterService.pop('error', '提示', errorMessage);
    }
}
