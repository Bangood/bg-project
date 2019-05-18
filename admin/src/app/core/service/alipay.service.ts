import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
@Injectable()
export class AlipayService extends BaseService {
    tradePay(data) {
        return this.post('/aliapi/trade-pay', data)
            .then(res => {

            });
    }
    fundAuthUnfreeze(data) {
        return this.post('/aliapi/fund-auth-unfreeze', data)
            .then(res => { });
    }
}
