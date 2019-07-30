import { Injectable } from '@angular/core';
import {Car, User} from '../../types/common';
import {BehaviorSubject, Observable} from "rxjs";
import {ProfileApiService} from "../../api/profile/profile.api.service";
import {take} from "rxjs/operators";

@Injectable()
export class UserService {
  private _user: User;
  private _userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  constructor(private profileApiService: ProfileApiService) {
    this.profileApiService.getUser(1)
      .pipe(take(1))
      .subscribe((user) => {
        this.user = user;
        console.log(this.user);
      });
  }

  get userSubject(): Observable<User> {
    return this._userSubject.asObservable();
  }

  get user() {
    return this._user;
  }

  set user(user: User) {
    this._user = user;
    this._userSubject.next(this.user);
  }

  addCar(car: Car): void {
    this.profileApiService.setUserCar({
      id: car.id,
      model: car.model,
      color: car.color,
      number: car.number,
      userId: this.user.id
    }
    ).subscribe((data) => {
      this.user.cars.push(data);
    }, (error) => {
      console.error(error);
    });
  }

  deleteCar(car: Car): void {
    this.profileApiService.deleteUserCar(car.id)
    .subscribe(() => {
      const index = this.user.cars.map(x => {
        return x.id;
      }).indexOf(car.id);
      this.user.cars.splice(index, 1);
    }, (error) => {
      console.error(error);
    });
  }
}
