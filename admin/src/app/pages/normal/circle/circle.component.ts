import { Component, ViewChild, ElementRef } from '@angular/core';

import { DxFormComponent } from 'devextreme-angular';
import { ConfirmationService } from 'primeng/api';

import { Circle } from '../../../core/models/circle.model';
import { showNormalPrice } from '../../../core/util/common.util';
import { CircleService } from '../../../core/service/circle.service';
import { GoodsService } from '../../../core/service/goods.service';

@Component({
    selector: 'hyp-circle',
    styleUrls: ['./circle.component.scss'],
    templateUrl: './circle.component.html',
    providers: [ConfirmationService, CircleService, GoodsService]
})
export class CircleComponent {
    @ViewChild(DxFormComponent)
    form: DxFormComponent;
    actionList = {
        add: { label: '新增', type: 0 },
        update: { label: '修改', type: 1 }
    };
    actionType: any = this.actionList.add;
    circle: Circle = new Circle();
    circleList: Circle[] = [];
    currentIndex: number;
    popupVisible = false;
    showNormalPrice = showNormalPrice;
    channelType = 99;
    constructor(
        private _confirmationService: ConfirmationService,
        private _circleService: CircleService,
        private _goodsService: GoodsService,
    ) {
        this._circleService.list()
            .then($res => this.circleList = $res);
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

    deleteCircle($index: number) {
        this._confirmationService.confirm({
            message: '确定删除该条目吗？',
            accept: () => {
                this._circleService.delete(this.circleList[$index].Id)
                    .then($res => {
                        this.circleList.splice($index, 1);
                        this.circleList = [...this.circleList];
                    });

            }
        });
    }

    showFormPanel($type: string, $index: number = -1) {
        this.actionType = this.actionList[$type];
        if ($index === -1) {
            this.circle = new Circle();
        } else {
            this.circle = this.circleList[$index];
            this.currentIndex = $index;
        }
        this.popupVisible = true;
    }
}
