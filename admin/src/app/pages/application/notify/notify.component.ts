import { Component, ViewChild, OnDestroy } from '@angular/core';

import { ConfirmationService } from 'primeng/api';

import { DxFormComponent } from 'devextreme-angular';
import { NotificationService } from '../../../core/service/notification.service';
import { Notification } from '../../../core/models/notification.model';
import { QiniuService } from '../../../core/service/qiniu.service';
import { SpecialSellService } from '../../../core/service/specialSell.service';
import { BulletinService } from '../../../core/service/bulletin.service';
import { GoodsService } from '../../../core/service/goods.service';

@Component({
    selector: 'hyp-notify',
    styleUrls: ['./notify.component.scss'],
    templateUrl: './notify.component.html',
    providers: [
        ConfirmationService,
        NotificationService,
        QiniuService,
        SpecialSellService,
        BulletinService,
        GoodsService,
    ]
})
export class NotifyComponent implements OnDestroy {
    @ViewChild(DxFormComponent)
    form: DxFormComponent;
    goodsNotifyList: Notification[] = [];
    goodsNotify: Notification = new Notification();
    currentIndex: number;
    popupVisible = false;
    interval: any;
    // 推送的单品渠道
    channelType = 0;
    notificationType = [{
        key: '推送类型',
        items: [
            { name: '商品推送', value: 0 },
            { name: '专场推送', value: 1 },
            { name: '公告推广', value: 2 },
            { name: '存文本消息', value: 3 },
        ]
    }];
    selectOptions = {
        items: this.notificationType,
        grouped: true,
        displayExpr: 'name',
        valueExpr: 'value',
        onValueChanged: this.changeNotificationType.bind(this)
    };
    specialSellList: any = [{ name: '234', value: '123' }];
    specialSellSelectOptions = {
        items: [{
            key: '专场',
            items: this.specialSellList
        }],
        grouped: true,
        displayExpr: 'name',
        valueExpr: 'value',
        onValueChanged: this.changeSpecialSell.bind(this)
    };
    bulletinList: any = [{ name: '234', value: '123' }];
    bulletinSelectOptions = {
        items: [{
            key: '公告',
            items: this.bulletinList
        }],
        grouped: true,
        displayExpr: 'name',
        valueExpr: 'value',
        onValueChanged: this.changeBulletin.bind(this)
    };
    bulletinListMap = {};
    specialSellListMap = {};
    value: any[] = [];
    uploadUrl: string;
    constructor(
        private _confirmationService: ConfirmationService,
        private _notificationService: NotificationService,
        private _qiniuService: QiniuService,
        private _specialSellService: SpecialSellService,
        private _bulletinService: BulletinService,
        private _goodsService: GoodsService,
    ) {
        this._notificationService.list()
            .then($res => this.goodsNotifyList = $res);
        this._qiniuService.queryUploadUrl()
            .then($res => this.uploadUrl = $res);
        this.interval = setInterval(() => {
            this._notificationService.list().then(($res) => this.goodsNotifyList = $res);
        }, 10000);
    }

    add() {
        const result: any = this.form.instance.validate();
        if (!result.isValid) { return; }
        this._notificationService.add(this.goodsNotify)
            .then($res => {
                this.goodsNotifyList = [...this.goodsNotifyList, this.goodsNotify];
                this.popupVisible = false;
            });
    }

    delete($index: number) {
        this._confirmationService.confirm({
            message: '确定删除该条目吗？',
            accept: () => {
                this._notificationService.delete(this.goodsNotifyList[$index])
                    .then($res => {
                        this.goodsNotifyList.splice($index, 1);
                        this.goodsNotifyList = [...this.goodsNotifyList];
                    });
            }
        });
    }

    pushInstantly() {
        const result: any = this.form.instance.validate();
        if (!result.isValid) { return; }
        this._notificationService.pushInstantly(this.goodsNotify)
            .then($res => this.popupVisible = false);
    }

    changeNotificationType($event) {
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
                        this.specialSellSelectOptions.items[0].items = this.specialSellList;
                    });
                });
        } else if ($event.value === 2) {
            this._bulletinService.queryBulletin(0)
                .then($res => {
                    this.bulletinList = [];
                    this.bulletinListMap = {};
                    $res.map($currentValue => {
                        const id = $currentValue.Id;
                        const name = $currentValue.Title;
                        this.bulletinList.push({
                            name: name,
                            value: id,
                        });
                        this.bulletinListMap[id] = $currentValue.Pic;
                        this.bulletinSelectOptions.items[0].items = this.bulletinList;
                    });
                });
        }
    }

    changeSpecialSell($event) {
        this.goodsNotify.PicUrl = this.specialSellListMap[$event.value];
    }

    changeBulletin($event) {
        this.goodsNotify.PicUrl = this.bulletinListMap[$event.value];
    }

    autoFillGoodsInfo($event) {
        if ($event.dataField === 'Notify.SourceId' &&
            this.goodsNotify.Notify.SysPushType === 0 && $event.value !== undefined && $event.value.length > 20) {
            this._goodsService.queryGoodsDetail($event.value, this.channelType)
                .then($res => {
                    if ($event.value.indexOf($res) !== -1) {
                        this.goodsNotify.Notify.SourceId = $res;
                    } else {
                        this.goodsNotify.Notify.SourceId = undefined;
                        window.alert('请输入正确的商品链接');
                    }
                });
        }
    }

    onUploaded($event) {
        const httpRes = $event.request.response;
        const data = JSON.parse(httpRes);
        const key = data.key;
        this.goodsNotify.PicUrl = this._qiniuService.PIC_DOMAIN + key;
    }
    ngOnDestroy() {
        clearInterval(this.interval);
    }
}
