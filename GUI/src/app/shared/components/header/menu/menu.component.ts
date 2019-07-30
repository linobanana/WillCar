import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MENU_ITEMS} from '../../../constants/menu-items';
import {IS_ADMIN} from '../../../constants/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router ) {}
  goToProfile() {
    this.router.navigate(['/personalarea/', 'profile' ], );
  }
  goToMyBookings() {
    this.router.navigate(['/personalarea/', 'mybookings']);
  }
  goToMyProposed() {
    this.router.navigate(['/personalarea/', 'myproposed']);
  }
  goToAuthirization() {
    this.router.navigate(['/authorization']);
  }
  goToAdminTab() {
    this.router.navigate(['/personalarea/', 'admin-tab']);
  }

  menuItems = MENU_ITEMS;
  isAdmin = IS_ADMIN;
}


