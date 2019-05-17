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
    create(data): any {
        return this.post('/product', data)
            .then(res => {
                return res;
            });
    }
    deleteOne(id): any {
        console.log(id);
        return this.delete(`/product/${id}`)
            .then(res => {
                return res;
            });
    }
    update(id, data) {
        return this.post(`/product/${id}`, data)
            .then(res => {
                return res;
            });
    }
}
