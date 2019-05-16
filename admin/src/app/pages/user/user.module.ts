import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    DxPopupModule,
    DxFormModule,
    DxFileUploaderModule,
    DxButtonModule,
    DxTemplateModule
} from 'devextreme-angular';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';

const components = [
    UserComponent,
    ProfileComponent
];
@NgModule({
    imports: [
        UserRoutingModule,
        CommonModule,
        DxPopupModule,
        DxFormModule,
        DxFileUploaderModule,
        DxButtonModule,
        DxTemplateModule
    ],
    declarations: [...components]
})

export class UserModule { }
