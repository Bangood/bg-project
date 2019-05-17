import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataComponent } from './data.component';
import { AdminGuard } from '../../admin-guard.service';
import { BannerSettingComponent } from './banner-setting/banner-setting.component';


const routes: Routes = [
    {
        path: '',
        component: DataComponent,
        children: [
            {
                path: 'banner-setting',
                component: BannerSettingComponent,
                canActivate: [AdminGuard],
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DataRoutingModule { }
