import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class StateManagementService {
  private static driverMode: Subject<boolean> = new BehaviorSubject<boolean>(false);

  static changeDriverMode(state: boolean): void {
    StateManagementService.driverMode.next(state);
  }

  static getDriverModeObservable(): Observable<any> {
    return StateManagementService.driverMode.asObservable();
  }
}
