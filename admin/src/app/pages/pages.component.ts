/**
 * Created by pure on 2018/2/2.
 */
import { Component } from '@angular/core';
//
//
import { MENU_ITEM, ADMIN_MENU_ITEM } from './pages-menu';
import { UserService } from '../core/service/user.service';
@Component({
  selector: 'hyp-pages',
  template: `
    <hyp-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </hyp-sample-layout>,
  `,
  providers: [UserService]
})
export class PagesComponent {
  menu = MENU_ITEM;
  constructor(
    private _userService: UserService,
  ) {
    this._userService.queryUser()
      .then($res => {
        if ($res.isAdmin) {
          this.menu = ADMIN_MENU_ITEM;
        }
      });
  }
}
