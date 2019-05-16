import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class CategoryService extends BaseService {
    queryCategory() {
        return this.get('/categories');
    }

    set($data) {
        return this.post('/categories', $data);
    }
}
