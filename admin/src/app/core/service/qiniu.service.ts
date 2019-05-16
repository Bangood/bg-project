import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class QiniuService extends BaseService {
    // 七牛上传地址
    UPLOAD_URL = 'http://up-z0.qiniup.com/';
    // 七牛外链域名
    PIC_DOMAIN = 'http://rs.mgapp.com.cn/';
    queryQiniuToken() {
        return this.get('/auth/qiniu/token');
    }

    queryUploadUrl() {
        return this.queryQiniuToken()
            .then($res => `${this.UPLOAD_URL}?token=${$res}`);
    }
}
