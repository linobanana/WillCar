import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Drive} from '../../../shared/types/common';
import {TripService} from '../../../shared/components/trip/trip.service';

@Component({
  selector: 'app-my-proposed',
  templateUrl: './my-proposed.component.html',
  styleUrls: ['./my-proposed.component.scss']
})
export class MyProposedComponent implements OnInit {
  drives$: Observable<Drive[]>;
  constructor(private tripService: TripService) {
    this.drives$ = tripService.tripsSubject;
  }

  ngOnInit() {
  }
onCancelTrip(drive: Drive) {
  this.tripService.cancelTrip(drive);
}
}
