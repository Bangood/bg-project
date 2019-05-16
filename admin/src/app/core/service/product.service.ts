import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
@Injectable()
export class ProductService extends BaseService {
    list(): any {
        return this.get('/product/list')
            .then(($res: any[] = []) => {
                console.log($res);
                return $res;
            });
    }
}
