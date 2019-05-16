/**
 * Created by pure on 2018/2/2.
 */
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../theme/theme.module';
import { AdminGuard } from '../admin-guard.service';
const PAGES_COMPONENT = [
  PagesComponent
];
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule
  ],
  declarations: [
    ...PAGES_COMPONENT
  ],
  providers: [AdminGuard]
})
export class PagesModule {
}
