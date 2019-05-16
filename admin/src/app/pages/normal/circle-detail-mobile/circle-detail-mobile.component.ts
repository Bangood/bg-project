import { Component, ViewChild } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { DxFormComponent } from 'devextreme-angular';

import { CircleService } from '../../../core/service/circle.service';
import { GoodsService } from '../../../core/service/goods.service';
import { Circle } from '../../../core/models/circle.model';
import { showNormalPrice } from '../../../core/util/common.util';

@Component({
    selector: 'hyp-circle-detail-mobile',
    styleUrls: ['./circle-detail-mobile.component.scss'],
    templateUrl: './circle-detail-mobile.component.html',
    providers: [ConfirmationService, CircleService, GoodsService]
})

export class CircleDetailMobileComponent {
    @ViewChild(DxFormComponent)
    form: DxFormComponent;
    circle: Circle = new Circle();
    circleList: Circle[] = [];
    showNormalPrice = showNormalPrice;
    actionSheetVisible = false;
    popupVisible = false;
    currentCircleIndex = 0;
    currentGoodsIndex = 0;
    actionList = {
        add: { label: '新增', type: 0 },
        update: { label: '修改', type: 1 }
    };
    actionType: any = this.actionList.add;
    channelType = 99;
    constructor(
        private _confirmationService: ConfirmationService,
        private _circleService: CircleService,
        private _goodsService: GoodsService,
    ) {
        this._circleService.list()
            .then($res => this.circleList = $res);
    }
    commands: any[] = [
        { text: '新建' },
        { text: '编辑' },
        { text: '删除' },
        { text: '刷新' }
    ];

    editGoods($circleIndex, $goodsIndex) {
        this.currentCircleIndex = $circleIndex;
        this.currentGoodsIndex = $goodsIndex;
        this.actionSheetVisible = true;
    }

    deleteGoodsFromCircle($circleIndex, $goodsIndex) {
        this.circle = this.circleList[$circleIndex];
        this.circle.GoodList.splice($goodsIndex, 1);
        this._circleService.update(this.circle.Id, this.circle)
            .then($res => {
                console.log($res);
            });
    }

    updateGoodsFromCircle($circleIndex, $goodsIndex) {
        this.circle = this.circleList[$circleIndex];
        this.popupVisible = true;
    }

    addCircle() {
        this._circleService.add(this.circle)
            .then($res => {
                this.circleList = [...this.circleList, $res];
                this.popupVisible = false;
            });
    }

    updateCircle() {
        this._circleService.update(this.circle.Id, this.circle)
            .then($res => this.popupVisible = false);
    }

    refresh($index) {
        this.circle = this.circleList[$index];

        const promiseArr = [];
        for (let i = 0; i < this.circle.GoodList.length; ++i) {
            const goodsUrl = this.circle.GoodList[i].GoodsUrl;
            promiseArr.push(this._goodsService.queryGoods(goodsUrl, this.channelType));
        }
        Promise.all(promiseArr).then($res => {
            this.circle.GoodList = [];
            for (let i = 0; i < $res.length; ++i) {
                if ($res[i] !== undefined) {
                    this.circle.GoodList.push($res[i]);
                }
            }
            this._circleService.update(this.circle.Id, this.circle);
        });
    }

    doAction($action) {
        switch ($action) {
            case '删除':
                this.deleteGoodsFromCircle(this.currentCircleIndex, this.currentGoodsIndex);
                break;
            case '编辑':
                this.actionType = this.actionList['update'];
                this.updateGoodsFromCircle(this.currentCircleIndex, this.currentGoodsIndex);
                break;
            case '刷新':
                this.refresh(this.currentCircleIndex);
                break;
            case '新建':
                this.actionType = this.actionList['add'];
                this.circle = new Circle();
                this.popupVisible = true;
                break;
        }
    }

    submit() {
        const result: any = this.form.instance.validate();
        if (!result.isValid) { return; }
        switch (this.actionType.type) {
            case this.actionList.add.type:
                this.addCircle();
                break;
            case this.actionList.update.type:
                this.updateCircle();
                break;
        }
    }

    transferTime(time) {

        if (time == null || time === undefined) {
            return '未知';
        }

        const now: any = new Date();
        const postTime: any = new Date(Number(time.substring(0, 13)));
        const pastSecond = (now - postTime) / 1000;

        let year;
        let month;
        let date;
        let hour;
        let min;
        let str = '';

        const restSecond = 0;
        if (pastSecond > 31536000) {
            year = Math.floor(pastSecond / 31536000);
            str = year + '年前';
        } else if (pastSecond > 2592000) {
            month = Math.floor(pastSecond / 2592000);
            str = month + '月前';
        } else if (pastSecond > 86400) {
            date = Math.floor(pastSecond / 86400);
            str = date + '天前';
        } else if (pastSecond > 3600) {
            hour = Math.floor(pastSecond / 3600);
            str = str + hour + '小时前';
        } else if (pastSecond > 60) {
            min = Math.floor(pastSecond / 60);
            str = str + min + '分钟前';
        } else {
            str = '几秒前';
        }

        return str;
    }

}

