/**
 * Created by pure on 2018/2/2.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { AdminGuard } from '../admin-guard.service';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  }, {
    path: 'application',
    loadChildren: './application/application.module#ApplicationModule'
  }, {
    path: 'data',
    loadChildren: './data/data.module#DataModule'
  }, {
    path: 'normal',
    loadChildren: './normal/normal.module#NormalModule'
  },
  {
    path: 'others',
    loadChildren: './others/others.module#OthersModule'
  }]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
