import { Component, ViewChild } from '@angular/core';

import { ConfirmationService } from 'primeng/api';

import { DxFormComponent } from 'devextreme-angular';
import { ChannelService } from '../../../core/service/channel.service';
import { QiniuService } from '../../../core/service/qiniu.service';
import { Channel } from '../../../core/models/channel.model';

@Component({
    selector: 'hyp-channel',
    styleUrls: ['./channel.component.scss'],
    templateUrl: './channel.component.html',
    providers: [ConfirmationService, ChannelService, QiniuService]
})
export class ChannelComponent {
    @ViewChild(DxFormComponent)
    form: DxFormComponent;
    actionList = {
        add: { label: '新增', type: 0 },
        update: { label: '修改', type: 1 }
    };
    actionType: any = this.actionList.add;
    channelList: Channel[] = [];
    channel: Channel = new Channel();
    currentIndex: number;
    popupVisible = false;
    value: any[] = [];
    uploadUrl: string;
    constructor(
        private _confirmationService: ConfirmationService,
        private _channelService: ChannelService,
        private _qiniuService: QiniuService,
    ) {
        this._channelService.queryChannel()
            .then(($res: Channel[]) => this.channelList = $res);
        this._qiniuService.queryUploadUrl()
            .then($res => this.uploadUrl = $res);
    }

    submit() {
        const result: any = this.form.instance.validate();
        if (!result.isValid) { return; }
        switch (this.actionType.type) {
            case this.actionList.add.type:
                this.addChannel();
                break;
            case this.actionList.update.type:
                this.updateChannel();
                break;
        }
    }

    addChannel() {
        const data = [...this.channelList, this.channel];
        this._channelService.set(data)
            .then($res => {
                this.channelList = $res;
                this.popupVisible = false;
            });
    }

    updateChannel() {
        this.channelList[this.currentIndex] = this.channel;
        this._channelService.set(this.channelList)
            .then(() => {
                this.popupVisible = false;
            });
    }

    deleteChannel($index: number) {
        this._confirmationService.confirm({
            message: '确定删除该条目吗？',
            accept: () => {
                this.channelList.splice($index, 1);
                this._channelService.set(this.channelList)
                    .then($res => {
                        this.channelList = $res;
                    });
            }
        });
    }

    showFormPanel($type: string, $index: number = -1) {
        this.actionType = this.actionList[$type];
        if ($index === -1) {
            this.channel = new Channel();
        } else {
            this.channel = this.channelList[$index];
            this.currentIndex = $index;
        }
        this.popupVisible = true;
    }

    onUploaded($event) {
        const httpRes = $event.request.response;
        const data = JSON.parse(httpRes);
        const key = data.key;
        this.channel.ChannelIcon = this._qiniuService.PIC_DOMAIN + key;
    }

}
