import { Component, ViewChild } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { DxFormComponent } from 'devextreme-angular';

import { BulletinService } from '../../../core/service/bulletin.service';
import { Bulletin } from '../../../core/models/bulletin.model';

@Component({
    selector: 'hyp-bulletin',
    styleUrls: ['./bulletin.component.scss'],
    templateUrl: './bulletin.component.html',
    providers: [ConfirmationService, BulletinService]
})

export class BulletinComponent {
    @ViewChild(DxFormComponent)
    form: DxFormComponent;
    actionList = {
        add: { label: '新增', type: 0 },
        update: { label: '修改', type: 1 }
    };
    actionType: any = this.actionList.add;
    bulletinInfo: Bulletin;
    bulletinInfos: Bulletin[] = [];
    currentIndex: number;
    popupVisible = false;
    constructor(
        private _confirmationService: ConfirmationService,
        private _bulletinService: BulletinService,
    ) {
        this._bulletinService.queryBulletin()
            .then($res => this.bulletinInfos = $res);

    }

    submit() {
        const result: any = this.form.instance.validate();
        if (!result.isValid) { return; }
        switch (this.actionType.type) {
            case this.actionList.add.type:
                this.addBulletin();
                break;
            case this.actionList.update.type:
                this.updateBulletin();
                break;
        }
    }

    addBulletin() {
        this._bulletinService.addBulletin(this.bulletinInfo)
            .then($res => {
                this.bulletinInfos = [...this.bulletinInfos, $res];
                this.popupVisible = false;
            });
    }

    updateBulletin() {
        this._bulletinService.updateBulletin(this.bulletinInfo)
            .then($res => {
                this.popupVisible = false;
            });
    }

    deleteBulletin($index: number) {
        this._confirmationService.confirm({
            message: '确定删除该条目吗？',
            accept: () => {
                this._bulletinService.deleteBulletin(this.bulletinInfos[$index].Id)
                    .then($res => {
                        this.bulletinInfos.splice($index, 1);
                        this.bulletinInfos = [...this.bulletinInfos];
                    });
            }
        });
    }

    showFormPanel($type: string, $index: number = -1) {
        this.actionType = this.actionList[$type];
        if ($index === -1) {
            this.bulletinInfo = new Bulletin();
        } else {
            this.bulletinInfo = this.bulletinInfos[$index];
            this.currentIndex = $index;
        }
        this.popupVisible = true;
    }

}
