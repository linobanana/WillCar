import { Injectable } from '@angular/core';
import {Drive} from "../../types/common";
import {BehaviorSubject, Observable} from "rxjs";
import {clone} from 'ramda';
import {ProfileApiService} from "../../api/profile/profile.api.service";
import {take} from "rxjs/operators";
import {DriveApiService} from "../../api/trip/drive.api.service";

@Injectable()
export class TripService {
  private _proposedDrives: Drive[];
  private _bookedDrives: Drive[];
  private _proposedSubject: BehaviorSubject<Drive[]> = new BehaviorSubject(null);
  private _bookedSubject: BehaviorSubject<Drive[]> = new BehaviorSubject(null);
  constructor(private driveApiService: DriveApiService) {
  }

  get proposedSubject(): Observable<Drive[]> {
    return this._proposedSubject.asObservable();
  }
  get proposedDrives(): Drive[] {
    return this._proposedDrives;
  }
  set proposedDrives(drives: Drive[]) {
    this._proposedDrives = drives;
    this._proposedSubject.next(this._proposedDrives);
  }

  get bookedSubject(): Observable<Drive[]> {
    return this._bookedSubject.asObservable();
  }
  get bookedDrives(): Drive[] {
    return this._bookedDrives;
  }
  set bookedDrives(drives: Drive[]) {
    this._bookedDrives = drives;
    this._bookedSubject.next(this._bookedDrives);
  }

  cancelTrip(drive: Drive): void {
    this.driveApiService.canselDrive(drive.id)
      .subscribe(() => {
        const index: number = this.proposedDrives.indexOf(drive);
        this.proposedDrives[index].archive = true;
      });
  }

  cancelPassengerTrip(drive: Drive, userId: number): void {
    this.driveApiService.canselPassengerDrive(drive.id, userId)
      .subscribe(() => {
        const index: number = this.bookedDrives.indexOf(drive);
        this.bookedDrives.splice(index, 1);
      });
  }

  getProposedDrives(id: number){
    return new Promise(resolve=> {
      this.driveApiService.getProposedDrives(id)
        .subscribe((drives) => {
          this.proposedDrives = drives;
          resolve(drives);
        });
    });
  }

  getBookedDrives(id: number){
    return new Promise(resolve=> {
      this.driveApiService.getBookedDrives(id)
        .subscribe((drives) => {
          this.bookedDrives = drives;
          resolve(drives);
        });
    });
  }

  setRatingToDriver(markObject:{driveId:number, mark:number, passengerId:number}){
    this.driveApiService.setRatingToDriver(markObject).subscribe((data) => {
      let index = this.bookedDrives.findIndex((element) => {
        return element.id == markObject.driveId;
      });
      this.bookedDrives[index].driver.mark = data;
    }, (error) => {
      console.error(error);
    });
  }
  setRatingToPassenger(markObject:{driveId:number, mark:number, passengerId:number}){
    this.driveApiService.setRatingToPassenger(markObject).subscribe((data) => {
      let index = this.proposedDrives.findIndex((element) => {
        return element.id == markObject.driveId;
      });
      let passengerIndex = this.proposedDrives[index].passengers.findIndex((element) => {
        return element.id == markObject.passengerId;
      });
      this.proposedDrives[index].passengers[passengerIndex].mark = data;
    }, (error) => {
      console.error(error);
    });;
  }
}

