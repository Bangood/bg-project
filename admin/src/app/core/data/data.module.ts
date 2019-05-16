/**
 * Created by pure on 2018/2/6.
 */
//
import { NgModule, ModuleWithProviders } from '@angular/core';
//
import { StateService } from './state.service';
const SERVICES = [
  StateService,
];
@NgModule({
  imports: [],
  providers: [
    ...SERVICES
  ]
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES
      ]
    };
  }
}
