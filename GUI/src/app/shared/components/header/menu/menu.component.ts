import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {MENU_ITEMS} from '../../../constants/menu-items';
import {ProfileApiService} from '../../../api/profile/profile.api.service';
import {UserService} from '../../user/user.service';
import {User} from '../../../types/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() user: User;
  menuItems = MENU_ITEMS;
  isAdmin = false;

  constructor(private router: Router, private profileApiService: ProfileApiService, private userService: UserService) {
    this.user = this.userService.user;
    if (this.user.roles.indexOf("ADMIN") != -1) {
      this.isAdmin = true;
    }
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
  logOut(): void {
    this.profileApiService.logOut()
      .subscribe(data =>
        console.log(data));
  }
}


