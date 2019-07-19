import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car, Trip} from '../../types/common';
import {TEST_TRIP} from '../../constants/trip';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
 @Input() Trips: Trip[];
 @Input() ifProposed: boolean;
  @Output() cancelTrip: EventEmitter<Trip> = new EventEmitter();
 testTrip = TEST_TRIP;
  constructor() { }

  ngOnInit() {
  }

}
