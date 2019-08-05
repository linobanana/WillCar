import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Drive} from '../../types/common';
import {TEST_TRIP} from '../../constants/trip';
import {CAR, USER} from '../../mocks/user.mocks';
import {Router} from "@angular/router";
import {TripService} from "./trip.service";

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
 constructor(private router: Router, private tripService: TripService) { }
  public moreInfo(drive: Drive) {
   this.tripService.changeDrive(drive);
   this.tripService.changeIfProposed(this.ifProposed);
   this.router.navigate(['/personalarea/detailsofroute']);
  }
 ngOnInit() {}

}
