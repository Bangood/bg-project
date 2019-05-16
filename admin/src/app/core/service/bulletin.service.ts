import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { Bulletin } from '../models/bulletin.model';

@Injectable()
export class BulletinService extends BaseService {
    addBulletin($data: Bulletin) {
        return this.post('/bulletins', $data);
    }

    queryBulletin($ts = 0) {
        return this.get(`/bulletins?timestamp=${$ts}`);
    }

    deleteBulletin($id) {
        return this.delete(`/bulletins/${$id}`);
    }

    updateBulletin($data) {
        return this.put('/bulletins', $data);
    }
}
