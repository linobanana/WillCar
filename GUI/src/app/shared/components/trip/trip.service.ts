import { Injectable } from '@angular/core';
import {Drive} from "../../types/common";
import {BehaviorSubject, Observable} from "rxjs";
import {TEST_TRIP} from "../../constants/trip";
import {clone} from 'ramda';

@Injectable()
export class TripService {
  private _drives: Drive[];
  private _tripsSubject: BehaviorSubject<Drive[]> = new BehaviorSubject(null);
  private _driveSubject: BehaviorSubject<Drive> = new BehaviorSubject(null);
  private _ifProposedSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);
  currentDrive = this.driveSubject;
  ifProposed = this.ifProposedSubject;
  constructor() {
    setTimeout(() => {
      this.drives = [TEST_TRIP];
    }, 1000);
  }

  get tripsSubject(): Observable<Drive[]> {
    return this._tripsSubject.asObservable();
  }
  get driveSubject(): Observable<Drive> {
    return this._driveSubject.asObservable();
  }
   changeDrive(drive: Drive) {
    // this._drive = drive;
    this._driveSubject.next(drive);
  }
  get ifProposedSubject(): Observable<boolean> {
    return this._ifProposedSubject.asObservable();
  }
  changeIfProposed(ifProposed: boolean) {
    this._ifProposedSubject.next(ifProposed);
  }
  // get drive(): Drive {
  //   return this._drive;
  // }
  get drives(): Drive[] {
    return this._drives;
  }
  set drives(drives: Drive[]) {
    this._drives = drives;
    this._tripsSubject.next(this.drives);
  }
  cancelTrip(drive: Drive): void {
    const index: number = this.drives.indexOf(drive);
    const tempTrips: Drive[] = clone(this.drives);
    tempTrips.splice(index, 1);
    this.drives = tempTrips;
  }
  addTrip(drive: Drive): void {
    this.drives = this.drives.concat(drive);
  }
}

