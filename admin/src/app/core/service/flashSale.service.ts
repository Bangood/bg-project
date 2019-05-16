import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class FlashSaleService extends BaseService {
    list($startTime) {
        return this.get(`/flash-sales?startTime=${$startTime}`);
    }

    addOne($data) {
        return this.post('/flash-sales', $data);
    }

    updateOne($data) {
        return this.put('/flash-sales', $data);
    }

    queryStartHours() {
        return this.get('/flash-sales/start-hours');
    }

    setStartHours($data) {
        return this.post('/flash-sales/start-hours', { StartHours: $data });
    }
}
