import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
@Injectable()
export class ProductService extends BaseService {
    list(): any {
        return this.get('/product/public/list')
            .then(($res: any[] = []) => {
                console.log($res);
                return $res;
            });
    }
    create(data): any {
        return this.post('/product/private/', data)
            .then(res => {
                return res;
            });
    }
    deleteOne(id): any {
        console.log(id);
        return this.delete(`/product/private/${id}`)
            .then(res => {
                return res;
            });
    }
    update(id, data) {
        return this.post(`/product/private/${id}`, data)
            .then(res => {
                return res;
            });
    }
}
