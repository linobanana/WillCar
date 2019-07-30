import { Component, OnInit } from '@angular/core';
import {MENU_ITEMS} from '../../constants/menu-items';
import {Router} from "@angular/router";
import {IS_ADMIN} from '../../constants/common';


@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {

  profileNavItems = MENU_ITEMS;
  isAdmin = IS_ADMIN;

  constructor(private router: Router ) { }
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
  ngOnInit() {
  }

}
