import { Component } from '@angular/core';

import { VersionService } from '../../../core/service/version.service';
import { Version } from '../../../core/models/version.model';

@Component({
    selector: 'hyp-version',
    styleUrls: ['./version.component.scss'],
    templateUrl: './version.component.html',
    providers: [VersionService]
})

export class VersionComponent {
    versionInfo: Version = new Version();
    DEVICE_TYPE = {
        ANDROID: 1,
        IOS: 0
    };
    device = [{
        key: '设备',
        items: [
            { name: 'IOS', value: 0 },
            { name: 'ANDROID', value: 1 }
        ]
    }];
    popupVisible = false;
    selectOptions = {
        items: this.device,
        grouped: true,
        displayExpr: 'name',
        valueExpr: 'value',
        onValueChanged: this.changeDevice.bind(this)
    };
    constructor(
        private _versionService: VersionService,
    ) {
        this._versionService.queryVersion(this.DEVICE_TYPE.ANDROID)
            .then($res => this.versionInfo = $res);
    }
    submit() {
        this._versionService.setVersion(this.versionInfo)
            .then($res => this.popupVisible = false);
    }
    changeDevice($event) {
        this._versionService.queryVersion($event.value)
            .then($res => {
                this.versionInfo = $res || { Device: $event.value };
            });
    }

    getDeviceName($device: number): string {
        switch ($device) {
            case this.DEVICE_TYPE.IOS:
                return 'IOS';
            case this.DEVICE_TYPE.ANDROID:
                return 'ANDROID';
        }
    }
}
