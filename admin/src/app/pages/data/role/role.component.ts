import { Component } from '@angular/core';

import { FansService } from '../../../core/service/fans.service';
import { RoleService } from '../../../core/service/role.service';

@Component({
    selector: 'hyp-role',
    styleUrls: ['./role.component.scss'],
    templateUrl: './role.component.html',
    providers: [FansService, RoleService],
})
export class RoleComponent {
    roleMap = [{
        key: '角色',
        items: [
            { name: '消费者', value: 0 },
            { name: '代理', value: 1 },
            { name: '运营商', value: 2 }
        ]
    }];
    popupVisible = false;
    invitedCode: string;
    roleType: number;
    rqstData = {
        InvitedCode: '',
        Role: 0
    };
    fansInfo = {
        TotalCnt: null,
        Lv1Cnt: null,
        Role: null
    };
    selectOptions = {
        items: this.roleMap,
        grouped: true,
        displayExpr: 'name',
        valueExpr: 'value',
        onValueChanged: this.changeRole.bind(this)
    };
    constructor(
        private _fansService: FansService,
        private _roleService: RoleService,
    ) { }

    submit() {
        this._roleService.update(this.rqstData)
            .then($res => this.popupVisible = false);
    }
    changeRole($event) {
        this.rqstData.Role = $event.value;
    }
    queryFans() {
        this.rqstData.InvitedCode = this.invitedCode;
        this._fansService.queryCnt(this.invitedCode)
            .then($res => {
                this.fansInfo = $res;
                this.rqstData.Role = $res.Role;
            });
    }
}
