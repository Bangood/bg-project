import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class CircleService extends BaseService {
    add($data) {
        return this.post('/circles', $data);
    }

    list() {
        return this.get('/circles');
    }

    update($circleId, $data) {
        return this.put(`/circles/${$circleId}`, $data);
    }

    delete($circleId) {
        return super.delete(`/circles/${$circleId}`);
    }
}
