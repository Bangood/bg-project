import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable()
export class FansService extends BaseService {
    queryCnt($invitedCode) {
        return this.get(`/fans/cnt?invitedCode=${$invitedCode}`);
    }
}
