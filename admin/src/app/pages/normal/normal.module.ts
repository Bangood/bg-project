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

import { NormalRoutingModule } from './normal-roting.module';
import { ThemeModule } from '../../theme/theme.module';
import { CommonModule } from '../common/common.module';
import { NormalComponent } from './normal.component';
import { CircleComponent } from './circle/circle.component';
import { CircleDetailMobileComponent } from './circle-detail-mobile/circle-detail-mobile.component';

const components = [
    NormalComponent,
    CircleComponent,
    CircleDetailMobileComponent,
];
@NgModule({
    imports: [
        CommonModule,
        NormalRoutingModule,
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
    providers: []
})
export class NormalModule { }
