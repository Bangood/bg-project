import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable()
export class RoleService extends BaseService {
    update($data) {
        return this.put('/roles', $data);
    }
}
