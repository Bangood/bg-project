import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class ChannelService extends BaseService {
    queryChannel() {
        return this.get('/channels');
    }

    set($data) {
        return this.post('/channels', $data);
    }
}
