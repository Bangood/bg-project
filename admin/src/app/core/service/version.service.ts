import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class VersionService extends BaseService {
    queryVersion($device) {
        return this.get(`/versions?device=${$device}`);
    }

    setVersion($data) {
        return this.post('/versions', $data);
    }
}
