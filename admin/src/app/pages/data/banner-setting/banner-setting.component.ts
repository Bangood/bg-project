import { Component, ViewChild } from '@angular/core';

import { ToasterService } from 'angular2-toaster';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';

import { DxFormComponent } from 'devextreme-angular';
import { showNormalPrice } from '../../../core/util/common.util';
import { BannerService } from '../../../core/service/banner.service';
import { GoodsService } from '../../../core/service/goods.service';
import { Banner } from '../../../core/models/banner.model';
import { QiniuService } from '../../../core/service/qiniu.service';
import { SpecialSellService } from '../../../core/service/specialSell.service';

@Component({
    selector: 'hyp-banner-setting',
    styleUrls: ['./banner-setting.component.scss'],
    templateUrl: './banner-setting.component.html',
    providers: [ConfirmationService, BannerService, GoodsService, QiniuService, SpecialSellService]
})
export class BannerSettingComponent {
    @ViewChild(DxFormComponent)
    form: DxFormComponent;
    actionList = {
        add: { label: '新增', type: 0 },
        update: { label: '修改', type: 1 }
    };
    actionType: any = this.actionList.add;
    bannerList: Banner[] = [];
    banner: Banner = new Banner();
    currentIndex: number;
    popupVisible = false;
    showNormalPrice = showNormalPrice;
    bannerType = [{
        key: '设备',
        items: [
            { name: '商品', value: 0 },
            { name: '专场', value: 1 }
        ]
    }];
    isBannerMode = true;
    selectOptions = {
        items: this.bannerType,
        grouped: true,
        displayExpr: 'name',
        valueExpr: 'value',
        onValueChanged: this.changeBannerType.bind(this)
    };
    specialSellList: any = [{ name: '234', value: '123' }];
    specialSellSelectOptins = {
        items: [{
            key: '专场',
            items: this.specialSellList
        }],
        grouped: true,
        displayExpr: 'name',
        valueExpr: 'value',
        onValueChanged: this.changeSpecialSell.bind(this)
    };
    value: any[] = [];
    uploadUrl: string;
    specialSellListMap = {};
    channelType = 99;
    constructor(
        private _bannerService: BannerService,
        private _toasterService: ToasterService,
        private _confirmationService: ConfirmationService,
        private _goodsService: GoodsService,
        private _qiniuService: QiniuService,
        private _specialSellService: SpecialSellService,
    ) {
        this._bannerService.queryList()
            .then($res => this.bannerList = $res);
        this._qiniuService.queryUploadUrl()
            .then($res => this.uploadUrl = $res);
    }
    changeBannerType($event) {
        if ($event.value === 1) {
            this._specialSellService.list()
                .then($res => {
                    this.specialSellList = [];
                    this.specialSellListMap = {};
                    $res.map($currentValue => {
                        const id = $currentValue.Id;
                        const name = $currentValue.Name;
                        this.specialSellList.push({
                            name: name,
                            value: id,
                        });
                        this.specialSellListMap[id] = $currentValue.BannerPic;
                        this.specialSellSelectOptins.items[0].items = this.specialSellList;
                    });
                });
        }
    }

    changeSpecialSell($event) {
        this.banner.BannerPic = this.specialSellListMap[$event.value];
    }

    submit() {
        const result: any = this.form.instance.validate();
        if (!result.isValid) { return; }
        switch (this.actionType.type) {
            case this.actionList.add.type:
                this.addBanner();
                break;
            case this.actionList.update.type:
                this.updateBanner();
                break;
        }
    }

    addBanner() {
        const methodName = this.isBannerMode ? 'set' : 'setSub';
        const data = [...this.bannerList, this.banner];
        this._bannerService[methodName](data)
            .then($res => {
                this.bannerList = $res;
                this.popupVisible = false;
            });
    }

    updateBanner() {
        const methodName = this.isBannerMode ? 'set' : 'setSub';
        this.bannerList[this.currentIndex] = this.banner;
        this._bannerService[methodName](this.bannerList).then(() => {
            this.popupVisible = false;
        });
    }

    deleteBanner($index: number) {
        this._confirmationService.confirm({
            message: '确定删除该条目吗？',
            accept: () => {
                const methodName = this.isBannerMode ? 'set' : 'setSub';
                this.bannerList.splice($index, 1);
                this._bannerService[methodName](this.bannerList)
                    .then($res => {
                        this.bannerList = $res;
                    });
            }
        });
    }

    showFormPanel($type: string, $index: number = -1) {
        this.actionType = this.actionList[$type];
        if ($index === -1) {
            this.banner = new Banner();
        } else {
            this.banner = this.bannerList[$index];
            this.currentIndex = $index;
        }
        this.popupVisible = true;
    }

    autoFillGoodsInfo($event) {
        if ($event.dataField === 'Id' && this.banner.BannerType === 0 && $event.value !== undefined && $event.value.length > 20) {
            this._goodsService.queryGoodsDetail($event.value, this.channelType)
                .then($res => {
                    if ($event.value.indexOf($res) !== -1) {
                        this.banner.Id = $res;
                    } else {
                        this.banner.Id = undefined;
                        window.alert('请输入正确的商品链接');
                    }
                });
        }
    }
    onUploaded($event) {
        const httpRes = $event.request.response;
        const data = JSON.parse(httpRes);
        const key = data.key;
        this.banner.BannerPic = this._qiniuService.PIC_DOMAIN + key;
    }

    bannerModeChange($event) {
        const methodName = this.isBannerMode ? 'queryList' : 'querySubList';
        this._bannerService[methodName]()
            .then($res => this.bannerList = $res);
    }
}
