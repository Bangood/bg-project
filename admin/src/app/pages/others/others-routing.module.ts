import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OthersComponent } from './others.component';
import { AdminGuard } from '../../admin-guard.service';
import { ServiceComponent } from './service/service.component';

const routes: Routes = [
    {
        path: '',
        component: OthersComponent,
        children: [
            {
                path: 'service',
                component: ServiceComponent,
                canActivate: [AdminGuard],
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OthersRoutingModule { }
