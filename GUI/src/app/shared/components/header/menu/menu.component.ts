import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MENU_ITEMS} from '../../../constants/menu-items';
import {IS_ADMIN} from '../../../constants/common';
import {ProfileApiService} from '../../../api/profile/profile.api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menuItems = MENU_ITEMS;
  constructor(private router: Router, private profileApiService: ProfileApiService ) {}
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
  goToAuthorization() {
    this.profileApiService.logOut('')
      .subscribe(() => {
        window.location.href = 'localhost:8080/login';
      }, () => {
        window.location.href = 'localhost:8080/login';
      });
  }
  isAdmin = IS_ADMIN;
}


