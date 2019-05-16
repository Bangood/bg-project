import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService {
    queryUser() {
        return this.get('/user/test');
    }

    updateUser($data) {
        return this.post('/user/test', $data);
    }
}
