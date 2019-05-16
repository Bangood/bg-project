import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { Banner } from '../models/banner.model';

@Injectable()
export class BannerService extends BaseService {

    queryList(): any {
        return this.get('/banners')
            .then(($res: Banner[] = []) => {
                return this.formatData($res);
            });
    }

    set($data: Banner[]): any {
        return this.post('/banners', $data)
            .then(($res: Banner[] = []) => {
                return this.formatData($res);
            });
    }
    // subBanner method
    querySubList(): any {
        return this.get('/banners/sub')
            .then(($res: Banner[] = []) => {
                return this.formatData($res);
            });
    }

    setSub($data: Banner[]): any {
        return this.post('/banners/sub', $data)
            .then(($res: Banner[] = []) => {
                return this.formatData($res);
            });
    }
    translate($type) {
        switch ($type) {
            case 0:
                return '商品';
            case 1:
                return '专场';
        }
    }

    private formatData($bannerList: Banner[]): Banner[] {
        return $bannerList.map(($banner: Banner) => {
            const banner = { ...$banner };
            if (typeof banner.EndTime !== 'number') {
                banner.EndTime = Number(banner.EndTime);
            }
            return banner;
        });
    }
}
