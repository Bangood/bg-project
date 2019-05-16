/**
 * Created by pure on 2018/2/6.
 */
//
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//
import { NbSidebarService } from '@nebular/theme';
//
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'hyp-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() position = 'normal';
  user: any;
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private _sidebarService: NbSidebarService,
    private _authService: NbAuthService,
    private _router: Router) {
    this._authService.onTokenChange()
      .subscribe(($token: NbAuthJWTToken) => {
        this.user = $token ? $token.getPayload() : {};
      });
  }

  ngOnInit() {
  }

  toggleSidebar(): boolean {
    this._sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this._sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHomePage(): void {

  }

  startSearch() {
  }
  onMenuClick($event) {
    if ($event.title === 'Log out') {
      this._router.navigate(['auth/logout']);
    } else if ($event.title === 'Profile') {
      this._router.navigate(['pages/user/profile']);
    }
  }
}
