import { Injectable } from '@angular/core';
import {Car, User} from '../../types/common';
import {BehaviorSubject, Observable} from "rxjs";
import {USER} from "../../mocks/user.mocks";

@Injectable()
export class UserService {
  private _user: User;
  private _userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  constructor() {
    setTimeout(() => {
      this.user = USER;
    }, 1000);
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

  setCommunicType(newType: string){
    this.user.preferredCommunication = newType;
  }

  addCar(car: Car): void {
    this.user = {
      ...this.user,
      cars: [
        ...this.user.cars,
        car
      ]
    };
  }

}
