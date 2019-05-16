import { Component } from '@angular/core';
import { QiniuService } from '../../../core/service/qiniu.service';
import { UserService } from '../../../core/service/user.service';
import { User } from '../../../core/models/user.model';
@Component({
    selector: 'hyp-user-profile',
    styleUrls: ['./profile.component.scss'],
    templateUrl: './profile.component.html',
    providers: [QiniuService, UserService]
})

export class ProfileComponent {
    user: User;
    popupVisible = false;
    uploadUrl: string;
    value: any[] = [];
    type = '修改';
    constructor(
        private _userService: UserService,
        private _qiniuService: QiniuService,
    ) {
        this._userService.queryUser()
            .then($res => {
                if ($res !== undefined) {
                    this.user = $res;
                }
            });

        this._qiniuService.queryUploadUrl()
            .then($res => this.uploadUrl = $res);
    }
    onUploaded($event) {
        const httpRes = $event.request.response;
        const data = JSON.parse(httpRes);
        const key = data.key;
        this.user.userHead = this._qiniuService.PIC_DOMAIN + key;
    }

    submit() {
        this._userService.updateUser(this.user)
            .then($res => {
                console.log($res);
                if ($res !== undefined) {
                    this.popupVisible = false;
                }
            });

    }
}

