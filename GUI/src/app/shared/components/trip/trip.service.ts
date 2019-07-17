import { Injectable } from '@angular/core';
import {Trip} from "../../types/common";
import {BehaviorSubject, Observable} from "rxjs";
import {TEST_TRIP} from "../../constants/trip";

@Injectable()
export class TripService {
  private _trips: Trip[];
  private _tripsSubject: BehaviorSubject<Trip[]> = new BehaviorSubject(null);
  constructor() {
    setTimeout(() => {
      this.trips = [TEST_TRIP, TEST_TRIP];
    }, 1000);
  }

  get tripsSubject(): Observable<Trip[]> {
    return this._tripsSubject.asObservable();
  }

  get trips(): Trip[] {
    return this._trips;
  }

  set trips(trips: Trip[]) {
    this._trips = trips;
    this._tripsSubject.next(this.trips);
  }

  cancelTrip(trip: Trip): void {
    const index: number = this.trips.indexOf(trip);
    this.trips.splice(index,1 );
  }
}

