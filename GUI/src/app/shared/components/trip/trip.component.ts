import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Drive} from '../../types/common';
import {CAR} from '../../mocks/user.mocks';
import {TEST_TRIP} from '../../constants/trip';
import {CAR, USER} from '../../mocks/user.mocks';
import {Route, Router} from '@angular/router';

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
 car = CAR;
 constructor(private router: Router) { }

 goToEdit() {
   this.router.navigate(['/edit']);
 }
 ngOnInit() {}

}
