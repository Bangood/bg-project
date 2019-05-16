import { NgModule } from '@angular/core';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
    TreeTableModule, DropdownModule, PanelModule, DialogModule, TabViewModule, InputTextModule, ButtonModule, ConfirmDialogModule,
} from 'primeng/primeng';
import {DataViewModule} from 'primeng/dataview';

import { OthersRoutingModule } from './others-routing.module';
import { OthersComponent } from './others.component';
import { ServiceComponent } from './service/service.component';
import { ThemeModule } from '../../theme/theme.module';
import { AdminGuard } from '../../admin-guard.service';
import { FormsModule } from '@angular/forms';

const components = [
    OthersComponent,
    ServiceComponent,
];
@NgModule({
    imports: [
        OthersRoutingModule,
        ThemeModule,
        FormsModule,
        Ng2SmartTableModule,
        TreeTableModule,
        DataViewModule,
        DropdownModule,
        PanelModule,
        DialogModule,
        TabViewModule,
        InputTextModule,
        ButtonModule,
        ConfirmDialogModule,
    ],
    declarations: [...components],
    providers: [AdminGuard]
})
export class OthersModule { }

