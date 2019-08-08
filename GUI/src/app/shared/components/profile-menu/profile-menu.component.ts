import {Component, Input, OnInit} from '@angular/core';
import {MENU_ITEMS} from '../../constants/menu-items';
import {Router} from "@angular/router";
import {ProfileApiService} from '../../api/profile/profile.api.service';
import {User} from '../../types/common';
import {UserService} from '../user/user.service';


@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {
  @Input() user: User;
  profileNavItems = MENU_ITEMS;
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
      .subscribe(() =>
        window.location.href = 'http://localhost:8080/login'
      )};
  ngOnInit() {

  }
}
