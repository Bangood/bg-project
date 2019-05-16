import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NormalComponent } from './normal.component';
import { CircleComponent } from './circle/circle.component';
import { CircleDetailMobileComponent } from './circle-detail-mobile/circle-detail-mobile.component';

const routes: Routes = [
    {
        path: '',
        component: NormalComponent,
        children: [
            {
                path: 'circle',
                component: CircleComponent
            }, {
                path: 'circle-detail-mobile',
                component: CircleDetailMobileComponent
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NormalRoutingModule { }
