import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
@Injectable()
export class OrderService extends BaseService {
    list(): any {
        return this.get('/order/list')
            .then(($res: any[] = []) => {
                console.log($res);
                return $res;
            });
    }
}
