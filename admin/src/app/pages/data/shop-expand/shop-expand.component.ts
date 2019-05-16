import { Component, ViewChild, ElementRef } from '@angular/core';

import { DxFormComponent } from 'devextreme-angular';
import { ConfirmationService } from 'primeng/api';

import { showNormalPrice } from '../../../core/util/common.util';
import { ShopService } from '../../../core/service/shop.service';
import { GoodsService } from '../../../core/service/goods.service';
import { QiniuService } from '../../../core/service/qiniu.service';
import { Shop } from '../../../core/models/shop.model';

@Component({
    selector: 'hyp-shop-expand',
    styleUrls: ['./shop-expand.component.scss'],
    templateUrl: './shop-expand.component.html',
    providers: [ConfirmationService, ShopService, GoodsService, QiniuService]
})
export class ShopExpandComponent {
    @ViewChild(DxFormComponent)
    form: DxFormComponent;
    actionList = {
        add: { label: '新增', type: 0 },
        update: { label: '修改', type: 1 }
    };
    actionType: any = this.actionList.add;
    shop: Shop = new Shop();
    shopList: Shop[] = [];
    currentIndex: number;
    popupVisible = false;
    uploadUrl: string;
    value: any[] = [];
    showNormalPrice = showNormalPrice;
    channelType = 99;
    constructor(
        private _confirmationService: ConfirmationService,
        private _shopService: ShopService,
        private _goodsService: GoodsService,
        private _qiniuService: QiniuService,
    ) {
        this._shopService.list()
            .then($res => this.shopList = $res);
        this._qiniuService.queryUploadUrl()
            .then($res => this.uploadUrl = $res);
    }

    submit() {
        const result: any = this.form.instance.validate();
        if (!result.isValid) { return; }
        switch (this.actionType.type) {
            case this.actionList.add.type:
                this.addShop();
                break;
            case this.actionList.update.type:
                this.updateShop();
                break;
        }
    }

    addShop() {
        this._shopService.add(this.shop)
            .then($res => {
                this.shopList = [...this.shopList, $res];
                this.popupVisible = false;
            });
    }

    updateShop() {
        this._shopService.update(this.shop.ShopId, this.shop)
            .then($res => this.popupVisible = false);
    }

    deleteShop($index: number) {

        this._confirmationService.confirm({
            message: '确定删除该条目吗？',
            accept: () => {
                this._shopService.delete(this.shopList[$index].ShopId)
                    .then($res => {
                        this.shopList.splice($index, 1);
                        this.shopList = [...this.shopList];
                    });
            }
        });

    }

    showFormPanel($type: string, $index: number = -1) {
        this.actionType = this.actionList[$type];
        if ($index === -1) {
            this.shop = new Shop();
        } else {
            this.shop = this.shopList[$index];
            this.currentIndex = $index;
        }
        this.popupVisible = true;
    }

    refresh($index) {
        this.shop = this.shopList[$index];
        const promiseArr = [];
        for (let i = 0; i < this.shop.GoodList.length; ++i) {
            const goodsUrl = this.shop.GoodList[i].GoodsUrl;
            promiseArr.push(this._goodsService.queryGoods(goodsUrl, this.channelType));
        }
        Promise.all(promiseArr).then($res => {
            this.shop.GoodList = [];
            for (let i = 0; i < $res.length; ++i) {
                if ($res[i] !== undefined) {
                    this.shop.GoodList.push($res[i]);
                }
            }
            this._shopService.update(this.shop.ShopId, this.shop);
        });
    }

    onUploaded($event) {
        const httpRes = $event.request.response;
        const data = JSON.parse(httpRes);
        const key = data.key;
        this.shop.ShopBanner = this._qiniuService.PIC_DOMAIN + key;
    }
}
