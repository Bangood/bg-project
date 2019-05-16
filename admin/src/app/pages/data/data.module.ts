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
    DxTabsModule,
} from 'devextreme-angular';
import {
    CarouselModule,
    DataGridModule,
    PanelModule,
    ConfirmDialogModule,
    FieldsetModule,
    ChipsModule,
    ToggleButtonModule,
} from 'primeng/primeng';


import { DataRoutingModule } from './data-routing.module';
import { ThemeModule } from '../../theme/theme.module';
import { CommonModule } from '../common/common.module';
import { DataComponent } from './data.component';
import { BannerSettingComponent } from './banner-setting/banner-setting.component';
import { CategoryComponent } from './category/category.component';
import { ChannelComponent } from './channel/channel.component';
import { SpecialSellComponent } from './special-sell/special-sell.component';
import { ShopExpandComponent } from './shop-expand/shop-expand.component';
import { AdminGuard } from '../../admin-guard.service';
import { FlashSaleComponent } from './flash-sale/flash-sale.component';
import { RoleComponent } from './role/role.component';

const components = [
    DataComponent,
    BannerSettingComponent,
    CategoryComponent,
    ChannelComponent,
    SpecialSellComponent,
    ShopExpandComponent,
    FlashSaleComponent,
    RoleComponent,
];
@NgModule({
    imports: [
        CommonModule,
        DataRoutingModule,
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
        DxTabsModule,
        CarouselModule,
        DataGridModule,
        PanelModule,
        ConfirmDialogModule,
        FieldsetModule,
        ChipsModule,
        ToggleButtonModule,
    ],
    declarations: [...components],
    providers: [AdminGuard]
})
export class DataModule { }

