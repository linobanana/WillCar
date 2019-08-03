import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car, Drive} from '../../types/common';
import {CAR} from '../../mocks/user.mocks';

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
 constructor() { }

 ngOnInit() {}

 setRating(mark: number, passengerId: number, driveId: number){
   this.ratingToPassenger.emit({mark, passengerId, driveId});
 }
  setRatingBooking(mark: number, driveId: number){
   this.ratingToDriver.emit({mark, driveId});
}

}
