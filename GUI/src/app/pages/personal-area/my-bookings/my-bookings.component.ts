import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Drive} from '../../../shared/types/common';
import {TripService} from '../../../shared/components/trip/trip.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {
  drives$: Observable<Drive[]>;

  constructor(private tripService: TripService) {
    this.drives$ = tripService.tripsSubject;
  }

  ngOnInit() {
  }

  onCancelTrip(drive) {
    this.tripService.cancelTrip(drive);
  }
}
