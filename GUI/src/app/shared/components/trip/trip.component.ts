import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car, Drive} from '../../types/common';
import {CAR, USER} from '../../mocks/user.mocks';
import {Router} from "@angular/router";
import {TripService} from "./trip.service";

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
 @Input() drives: Drive[];
 @Input() ifProposed: boolean;
 @Output() cancelDrive: EventEmitter<Drive> = new EventEmitter();
 @Output() editDrive: EventEmitter<Drive> = new EventEmitter();
 @Output() cancelPassengerDrive: EventEmitter<Drive> = new EventEmitter();
 @Output() ratingToPassenger = new EventEmitter<{mark: number, passengerId: number, driveId: number}>();
  @Output() ratingToDriver = new EventEmitter<{mark: number, driveId: number}>();
 car = CAR;
 constructor(private router: Router, private tripService: TripService) { }
  public moreInfo(drive: Drive) {
   this.tripService.changeDrive(drive);
   this.tripService.changeIfProposed(this.ifProposed);
   this.router.navigate(['/personalarea/detailsofroute']);
  }
 ngOnInit() {}

 setRating(mark: number, passengerId: number, driveId: number){
   this.ratingToPassenger.emit({mark, passengerId, driveId});
 }
  setRatingBooking(mark: number, driveId: number){
   this.ratingToDriver.emit({mark, driveId});
}

}
