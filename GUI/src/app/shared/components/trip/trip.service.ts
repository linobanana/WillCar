import { Injectable } from '@angular/core';
import {Trip} from "../../types/common";
import {BehaviorSubject, Observable} from "rxjs";
import {TEST_TRIP} from "../../constants/trip";
import {clone} from 'ramda';

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
    const tempTrips: Trip[] = clone(this.trips);
    tempTrips.splice(index,1 );
    this.trips = tempTrips;
  }
  addTrip(trip: Trip): void {
    this.trips = this.trips.concat(trip);
  }
}

