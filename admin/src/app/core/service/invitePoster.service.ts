import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class InvitePosterService extends BaseService {
    list() {
        return this.get('/invite-posters');
    }

    set($data) {
        return this.post('/invite-posters', $data);
    }
}
