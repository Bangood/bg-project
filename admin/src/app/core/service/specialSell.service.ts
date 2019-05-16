import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class SpecialSellService extends BaseService {
    list() {
        return this.get('/special-sells');
    }

    add($data) {
        return this.post('/special-sells', $data);
    }

    update($id, $data) {
        return this.put(`/special-sells/${$id}`, $data);
    }

    delete($id) {
        return super.delete(`/special-sells/${$id}`);
    }
}
