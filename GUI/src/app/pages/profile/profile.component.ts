import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Car, User} from '../../shared/types/common';
import {OPTIONS} from '../../shared/mocks/user.mocks';
import {clone} from 'ramda';
import {UserService} from "../../shared/components/user/user.service";

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  title = 'Hello, Profile';
  user$: Observable<User>;
  options$: BehaviorSubject<string[]> = new BehaviorSubject(null);

  constructor(private userService: UserService) {
    this.user$ = this.userService.userSubject;
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.options$.next(clone(OPTIONS));
    }, 500);
  }

  onAddCar(car: Car) {
    this.userService.addCar(car);
  }
}
