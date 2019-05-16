import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class GoodsService extends BaseService {
    queryGoods($goodsUrl, $channelType): any {
        return this.get(`/goods?goodsUrl=${encodeURIComponent($goodsUrl)}&channelType=${$channelType}`)
            .then($res => {
                if ($res && $res.GoodsUrl) {
                    this.queryGoodsDetail($res.GoodsUrl, $channelType);
                }
                return $res;
            });
    }

    queryGoodsDetail($goodsUrl, $channelType): any {
        return this.get(`/goods/detail?goodsUrl=${encodeURIComponent($goodsUrl)}&channelType=${$channelType}`);
    }
}
