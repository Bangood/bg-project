import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class ShopService extends BaseService {
    list() {
        return this.get('/shops');
    }

    add($data) {
        return this.post('/shops', { Shop: $data });
    }

    delete($shopId) {
        return super.delete(`/shops/${$shopId}`);
    }

    update($shopId, $data) {
        return this.put(`/shops/${$shopId}`, { Shop: $data });
    }
}
