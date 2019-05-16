import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
    DxPopupModule,
    DxFormModule,
    DxFileUploaderModule,
    DxButtonModule,
    DxTemplateModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxActionSheetModule,
} from 'devextreme-angular';
import {
    CarouselModule,
    DataGridModule,
    PanelModule,
    ConfirmDialogModule,
    FieldsetModule,
} from 'primeng/primeng';


import { ApplicationRoutingModule } from './application-routing.module';
import { ThemeModule } from '../../theme/theme.module';
import { ApplicationComponent } from './application.component';
import { NotifyComponent } from './notify/notify.component';
import { VersionComponent } from './version/version.component';
import { BulletinComponent } from './bulletin/bulletin.component';
import { InvitePosterComponent } from './invite-poster/invite-poster.component';
import { AdminGuard } from '../../admin-guard.service';

const components = [
    ApplicationComponent,
    NotifyComponent,
    VersionComponent,
    BulletinComponent,
    InvitePosterComponent,
];
@NgModule({
    imports: [
        ApplicationRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ThemeModule,
        DxPopupModule,
        DxFormModule,
        DxFileUploaderModule,
        DxButtonModule,
        DxTemplateModule,
        DxDataGridModule,
        DxSelectBoxModule,
        DxTextBoxModule,
        DxTextAreaModule,
        DxActionSheetModule,
        CarouselModule,
        DataGridModule,
        PanelModule,
        ConfirmDialogModule,
        FieldsetModule,
    ],
    declarations: [...components],
    providers: [AdminGuard]
})
export class ApplicationModule { }

