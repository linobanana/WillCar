import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Drive} from '../../types/common';
import {TEST_TRIP} from '../../constants/trip';
import {CAR, USER} from '../../mocks/user.mocks';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
 @Input() Drives: Drive[];
 @Input() ifProposed: boolean;
 @Output() cancelTrip: EventEmitter<Drive> = new EventEmitter();
 testTrip = TEST_TRIP;
 user = USER;
 car = CAR;
 constructor(private router: Router) { }

 goToEdit() {
   this.router.navigate(['/edit']);
 }
 ngOnInit() {}

}
