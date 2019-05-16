import { Component, ViewChild } from '@angular/core';

import { DxFormComponent } from 'devextreme-angular';

import { InvitePoster } from '../../../core/models/invitePoster.model';
import { InvitePosterService } from '../../../core/service/invitePoster.service';
import { ConfirmationService } from 'primeng/api';
import { QiniuService } from '../../../core/service/qiniu.service';

@Component({
    selector: 'hyp-invite-poster',
    styleUrls: ['./invite-poster.component.scss'],
    templateUrl: './invite-poster.component.html',
    providers: [ConfirmationService, InvitePosterService, QiniuService]
})
export class InvitePosterComponent {
    @ViewChild(DxFormComponent)
    form: DxFormComponent;
    actionList = {
        add: { label: '新增', type: 0 },
        update: { label: '修改', type: 1 }
    };
    actionType: any = this.actionList.add;
    invitePoster: InvitePoster = new InvitePoster();
    posterURL: string;
    currentIndex: number;
    popupVisible = false;
    value: any[] = [];
    uploadUrl: string;
    constructor(
        private _confirmationService: ConfirmationService,
        private _invitePosterService: InvitePosterService,
        private _qiniuService: QiniuService,
    ) {
        this._invitePosterService.list()
            .then(($res = new InvitePoster()) => this.invitePoster = $res);
        this._qiniuService.queryUploadUrl()
            .then($res => this.uploadUrl = $res);
    }

    submit() {
        if (this.posterURL.length < 5) {
            return;
        }
        switch (this.actionType.type) {
            case this.actionList.add.type:
                this.addOne();
                break;
            case this.actionList.update.type:
                this.update();
                break;
        }
    }


    addOne() {
        this.invitePoster.PosterURL = [...this.invitePoster.PosterURL, this.posterURL];
        this._invitePosterService.set(this.invitePoster)
            .then($res => {
                this.invitePoster = $res;
                this.popupVisible = false;
            });
    }

    update() {
        this.invitePoster.PosterURL[this.currentIndex] = this.posterURL;
        this._invitePosterService.set(this.invitePoster).then(() => {
            this.popupVisible = false;
        });
    }


    deleteOne($index: number) {
        this._confirmationService.confirm({
            message: '确定删除该条目吗？',
            accept: () => {
                this.invitePoster.PosterURL.splice($index, 1);
                this._invitePosterService.set(this.invitePoster)
                    .then($res => {
                        this.invitePoster = $res;
                    });
            }
        });
    }

    showFormPanel($type: string, $index: number = -1) {
        this.actionType = this.actionList[$type];
        if ($index === -1) {
            this.posterURL = '';
        } else {
            this.posterURL = this.invitePoster.PosterURL[$index];
            this.currentIndex = $index;
        }
        this.popupVisible = true;
    }

    onUploaded($event) {
        const httpRes = $event.request.response;
        const data = JSON.parse(httpRes);
        const key = data.key;
        this.posterURL = this._qiniuService.PIC_DOMAIN + key;
    }
}
