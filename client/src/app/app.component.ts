import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { MenuComponent } from './menu/menu.component';

import { AuthService } from './auth/auth.service';
import { MenuService } from './menu/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(
    public authService: AuthService,
    public router: Router,
    private location: Location,
    private menuService: MenuService
  ) { }

  onMenuOpen(): void {
    this.menuService.isOpenedMenu = !this.menuService.isOpenedMenu;
  }

  onBack(): void {
    this.location.back();
  }

}
