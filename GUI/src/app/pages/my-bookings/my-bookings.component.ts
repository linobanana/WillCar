import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Trip} from "../../shared/types/common";
import {TripService} from "../../shared/components/trip/trip.service";

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  trips$: Observable<Trip[]>;
  constructor(private tripService: TripService) {
    this.trips$ = tripService.tripsSubject;
  }

  ngOnInit() {
  }
onCancelTrip(trip: Trip) {
  this.tripService.cancelTrip(trip);
}
}
