import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataComponent } from './data.component';
import { AdminGuard } from '../../admin-guard.service';
import { BannerSettingComponent } from './banner-setting/banner-setting.component';
import { CategoryComponent } from './category/category.component';
import { ChannelComponent } from './channel/channel.component';
import { SpecialSellComponent } from './special-sell/special-sell.component';
import { ShopExpandComponent } from './shop-expand/shop-expand.component';
import { FlashSaleComponent } from './flash-sale/flash-sale.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
    {
        path: '',
        component: DataComponent,
        children: [
            {
                path: 'banner-setting',
                component: BannerSettingComponent,
                canActivate: [AdminGuard],
            }, {
                path: 'category',
                component: CategoryComponent,
                canActivate: [AdminGuard],
            }, {
                path: 'channel',
                component: ChannelComponent,
                canActivate: [AdminGuard],
            }, {
                path: 'special-sell',
                component: SpecialSellComponent,
                canActivate: [AdminGuard],
            }, {
                path: 'shop-expand',
                component: ShopExpandComponent,
                canActivate: [AdminGuard],
            }, {
                path: 'flash-sale',
                component: FlashSaleComponent,
                canActivate: [AdminGuard]
            }, {
                path: 'role',
                component: RoleComponent,
                canActivate: [AdminGuard]
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DataRoutingModule { }
