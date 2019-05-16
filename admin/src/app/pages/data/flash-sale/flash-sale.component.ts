import { Component, ViewChild } from '@angular/core';

import * as moment from 'moment';
import { DxFormComponent } from 'devextreme-angular';

import { FlashSaleService } from '../../../core/service/flashSale.service';
import { FlashSale } from '../../../core/models/flashSale.model';
import { GoodsService } from '../../../core/service/goods.service';
import { showNormalPrice } from '../../../core/util/common.util';


@Component({
    selector: 'hyp-flash-sale',
    styleUrls: ['./flash-sale.component.scss'],
    templateUrl: './flash-sale.component.html',
    providers: [FlashSaleService, GoodsService]
})
export class FlashSaleComponent {
    @ViewChild(DxFormComponent)
    form: DxFormComponent;
    actionList = {
        add: { label: '新增', type: 0 },
        update: { label: '修改', type: 1 }
    };
    actionType: any = this.actionList.add;
    startHours: number[] = [];
    flashSale: FlashSale = new FlashSale();
    tabs = [];
    popupVisible = false;
    showNormalPrice = showNormalPrice;
    currentTS: number;
    defualtTs: number;
    startHoursLen: number;
    startHoursConf: number[] = [];
    bb: string[] = ['33'];
    channelType = 6;
    constructor(
        private _flashSaleService: FlashSaleService,
        private _goodsService: GoodsService,
    ) {
        this._flashSaleService.queryStartHours()
            .then($res => {
                this.startHoursLen = $res.length;
                this.startHoursConf = $res;
                this.startHours = [...$res, ...$res, ...$res];
                this.defualtTs = this.convertTS(this.startHours[0], 0);
                this.currentTS = this.defualtTs;
                this.tabs = [];
                for (let i = 0; i < this.startHours.length; ++i) {
                    this.tabs.push({
                        id: i,
                        text: this.convertTime(this.startHours[i], i)
                    });
                }
            });
    }
    changeStartHours() {
        const arr = [...this.startHoursConf];
        const result = [];
        for (let i = 0; i < arr.length; ++i) {
            result.push(Number(arr[i]));
        }
        this._flashSaleService.setStartHours(result);
    }

    showFormPanel($type: string, $index: number = -1) {
        this.actionType = this.actionList[$type];
        if ($index === -1) {
            this.flashSale = new FlashSale();
            this.flashSale.Timestart = this.currentTS;
        }
        this.popupVisible = true;
    }

    convertTS($timeLabel: number, $index: number): number {
        let now;
        if ($index < this.startHoursLen) {
            now = moment().subtract(1, 'days').format('YYYY-MM-DD HH');
        } else if ($index >= this.startHoursLen && $index < this.startHoursLen * 2) {
            now = moment().format('YYYY-MM-DD HH');
        } else {
            now = moment().add(1, 'days').format('YYYY-MM-DD HH');
        }

        let timeLabel = String($timeLabel);
        timeLabel = timeLabel.length === 2 ? timeLabel : ('0' + timeLabel);
        const time = now.substring(0, 11) + timeLabel;
        console.log(time);
        return (moment(time).unix());
    }

    convertTime($timeLabel: number, $index: number): string {
        let prefix;
        if ($index < this.startHoursLen) {
            prefix = '昨天';
        } else if ($index >= this.startHoursLen && $index < this.startHoursLen * 2) {
            prefix = '今天';
        } else {
            prefix = '明天';
        }
        let timeLabel = String($timeLabel);
        timeLabel = timeLabel.length === 2 ? timeLabel : ('0' + timeLabel);
        return prefix + timeLabel + ':00';
    }

    selectTab(e) {
        const timeLable = this.startHours[e.itemIndex];

        const ts = this.convertTS(timeLable, e.itemIndex);
        this.currentTS = ts;
        this._flashSaleService.list(ts)
            .then($res => {

                if ($res) {
                    this.flashSale = $res;
                } else {
                    this.flashSale = new FlashSale();
                    this.flashSale.Timestart = ts;
                    this._flashSaleService.addOne(this.flashSale);
                }
            });
    }

    submit() {
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
        this._flashSaleService.addOne(this.flashSale)
            .then($res => this.popupVisible = false);
    }

    updateOne() {
        this._flashSaleService.updateOne(this.flashSale)
            .then($res => this.popupVisible = false);
    }

    refresh($index) {
        const promiseArr = [];
        for (let i = 0; i < this.flashSale.GoodsList.length; ++i) {
            const goodsUrl = this.flashSale.GoodsList[i].GoodsUrl;
            promiseArr.push(this._goodsService.queryGoods(goodsUrl, this.channelType));
        }
        Promise.all(promiseArr).then($res => {
            this.flashSale.GoodsList = [];
            for (let i = 0; i < $res.length; ++i) {
                if ($res[i] !== undefined) {
                    this.flashSale.GoodsList.push($res[i]);
                }
            }
            this._flashSaleService.updateOne(this.flashSale);
        });
    }
}
