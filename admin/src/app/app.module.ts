import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NbAuthModule, NbEmailPassAuthProvider, NbAuthJWTToken, NB_AUTH_TOKEN_WRAPPER_TOKEN, NbAuthJWTInterceptor } from '@nebular/auth';
import { ToasterModule } from 'angular2-toaster';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from './core/core.module';
import { ThemeModule } from './theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth-guard.service';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    ToasterModule.forRoot(),
    NgbModule.forRoot(),
    NbAuthModule.forRoot({
      forms: {
        login: {
          redirectDelay: 0
        }
      },
      providers: {
        email: {
          service: NbEmailPassAuthProvider,
          config: {
            login: {
              endpoint: `${environment.API_ENDPOINT}/auth/login`,
            },
            register: {
              endpoint: `${environment.API_ENDPOINT}/auth/register`,
            },
            logout: {
              endpoint: '',
              redirect: {
                success: '/auth/login',
                failure: '/auth/login',
              },
            },
            requestPass: {
              endpoint: `${environment.API_ENDPOINT}/auth/request-pass`,
              redirect: {
                success: '/auth/reset-password',
              },
            },
            resetPass: {
              endpoint: `${environment.API_ENDPOINT}/auth/reset-pass`,
              redirect: {
                success: '/auth/login',
              },
            },
            token: {
              key: 'token'
            }
          },
        },
      },
    })
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: NbAuthJWTToken },
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
