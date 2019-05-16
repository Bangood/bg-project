import { Component, ViewChild } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { DxFormComponent } from 'devextreme-angular';

import { SpecialSellService } from '../../../core/service/specialSell.service';
import { SpecialSell } from '../../../core/models/specialSell.model';
import { GoodsService } from '../../../core/service/goods.service';
import { QiniuService } from '../../../core/service/qiniu.service';
import { showNormalPrice } from '../../../core/util/common.util';

@Component({
    selector: 'hyp-special-sell',
    styleUrls: ['./special-sell.component.scss'],
    templateUrl: './special-sell.component.html',
    providers: [ConfirmationService, SpecialSellService, GoodsService, QiniuService]
})
export class SpecialSellComponent {
    @ViewChild(DxFormComponent)
    form: DxFormComponent;
    actionList = {
        add: { label: '新增', type: 0 },
        update: { label: '修改', type: 1 }
    };
    actionType: any = this.actionList.add;
    specialSell: SpecialSell = new SpecialSell();
    specialSellList: SpecialSell[] = [];
    currentIndex: number;
    popupVisible = false;
    uploadUrl: string;
    value: any[] = [];
    showNormalPrice = showNormalPrice;
    channelType = 99;
    constructor(
        private _specialSellService: SpecialSellService,
        private _confirmationService: ConfirmationService,
        private _goodsService: GoodsService,
        private _qiniuService: QiniuService,
    ) {
        this._specialSellService.list()
            .then($res => this.specialSellList = $res);
        this._qiniuService.queryUploadUrl()
            .then($res => this.uploadUrl = $res);
    }
    submit() {
        const result: any = this.form.instance.validate();
        if (!result.isValid) { return; }
        switch (this.actionType.type) {
            case this.actionList.add.type:
                this.addOne();
                break;
            case this.actionList.update.type:
                this.updateOne();
                break;
        }
    }

    addOne() {
        this._specialSellService.add(this.specialSell)
            .then($res => {
                this.specialSellList = [...this.specialSellList, $res];
                this.popupVisible = false;
            });
    }

    updateOne() {
        this._specialSellService.update(this.specialSell.Id, this.specialSell)
            .then($res => this.popupVisible = false);
    }

    deleteOne($index: number) {

        this._confirmationService.confirm({
            message: '确定删除该条目吗？',
            accept: () => {
                this._specialSellService.delete(this.specialSellList[$index].Id)
                    .then($res => {
                        this.specialSellList.splice($index, 1);
                        this.specialSellList = [...this.specialSellList];
                    });
            }
        });

    }

    showFormPanel($type: string, $index: number = -1) {
        this.actionType = this.actionList[$type];
        if ($index === -1) {
            this.specialSell = new SpecialSell();
        } else {
            this.specialSell = this.specialSellList[$index];
            this.currentIndex = $index;
        }
        this.popupVisible = true;
    }

    refresh($index) {
        this.specialSell = this.specialSellList[$index];
        const promiseArr = [];
        for (let i = 0; i < this.specialSell.GoodsInfos.length; ++i) {
            const goodsUrl = this.specialSell.GoodsInfos[i].GoodsUrl;
            promiseArr.push(this._goodsService.queryGoods(goodsUrl, this.channelType));
        }
        Promise.all(promiseArr).then($res => {
            this.specialSell.GoodsInfos = [];
            for (let i = 0; i < $res.length; ++i) {
                if ($res[i] !== undefined) {
                    this.specialSell.GoodsInfos.push($res[i]);
                }
            }
            this._specialSellService.update(this.specialSell.Id, this.specialSell);
        });
    }

    onUploaded($event) {
        const httpRes = $event.request.response;
        const data = JSON.parse(httpRes);
        const key = data.key;
        this.specialSell.BannerPic = this._qiniuService.PIC_DOMAIN + key;
    }
}
