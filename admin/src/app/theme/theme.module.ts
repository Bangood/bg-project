/**
 * Created by pure on 2018/2/2.
 */
//
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import {
  NbActionsModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbThemeModule,
  NbUserModule
} from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//
import {
  ThemeSwitcherComponent,
  ThemeSettingsComponent,
  HeaderComponent,
  FooterComponent
} from './components';
import { TimingPipe } from './pipes';
import { SampleLayoutComponent } from './layouts';

import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';

const BASE_MODULES = [
  CommonModule
];
const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbActionsModule,
  NbSearchModule,
  NbUserModule,
  NgbModule
];
const COMPONENTS = [
  ThemeSwitcherComponent,
  ThemeSettingsComponent,
  HeaderComponent,
  FooterComponent,
  SampleLayoutComponent
];
const PIPES = [
  TimingPipe
];
const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot({ name: 'cosmic' }, [DEFAULT_THEME, COSMIC_THEME]).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers
];
@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES],
  exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [...NB_THEME_PROVIDERS]
    };
  }
}
