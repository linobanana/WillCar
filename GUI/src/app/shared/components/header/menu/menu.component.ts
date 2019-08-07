import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MENU_ITEMS} from '../../../constants/menu-items';
import {ProfileApiService} from '../../../api/profile/profile.api.service';
import {UserService} from '../../user/user.service';
import {IS_ADMIN} from '../../../constants/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menuItems = MENU_ITEMS;

  constructor(private router: Router, private profileApiService: ProfileApiService, private userService: UserService) {
  }
  goToProfile() {
    this.router.navigate(['/personalarea/', 'profile' ], );
  }
  goToMyBookings() {
    this.router.navigate(['/personalarea/', 'mybookings']);
  }
  goToMyProposed() {
    this.router.navigate(['/personalarea/', 'myproposed']);
  }
  goToMyMessages() {
    this.router.navigate(['/personalarea/', 'chat']);
  }
  goToAdminTab() {
    this.router.navigate(['/personalarea/', 'admin-tab']);
  }
  // logOut(): void {
  //   this.profileApiService.logOut()
  //     .subscribe(data =>
  //       console.log(data));
  // }
  isAdmin = IS_ADMIN;
}


