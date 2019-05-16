import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private _authService: NbAuthService) {
        this._authService.getToken()
            .subscribe(($token: NbAuthJWTToken) => {
                this.user = $token ? $token.getPayload() : {};
            });
    }
    user: any;
    canActivate() {
        return this.user.pleaseFuckMe;
    }
}
