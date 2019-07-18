import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Trip} from '../../../shared/types/common';
import {TripService} from '../../../shared/components/trip/trip.service';

@Component({
  selector: 'app-my-proposed',
  templateUrl: './my-proposed.component.html',
  styleUrls: ['./my-proposed.component.scss']
})
export class MyProposedComponent implements OnInit {
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
