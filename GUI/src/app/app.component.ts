import {Component, Input, OnInit} from '@angular/core';
import {User} from './shared/types/common';
import {ProfileApiService} from './shared/api/profile/profile.api.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserService} from './shared/components/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input() user: User;
  isAppReady = false;

  constructor(private userService: UserService, private  profileApiService: ProfileApiService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.isAppReady = true;
    }, 1000);
    this.profileApiService.getUser(1)
    .subscribe((user) => {
        this.user = user;
        this.userService.user = user;
    });
  }
}
