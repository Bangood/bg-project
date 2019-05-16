import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class NotificationService extends BaseService {
    list() {
        return this.get('/notifications');
    }

    add($data) {
        return this.post('/notifications', $data);
    }

    pushInstantly($data) {
        return this.post('/notifications/instantly', $data);
    }

    delete($data) {
        return this.put('/notifications', $data);
    }

    translate($type) {
        switch ($type) {
            case 0:
                return '商品推送';
            case 1:
                return '专场推送';
            case 2:
                return '公告推送';
        }
    }

}
