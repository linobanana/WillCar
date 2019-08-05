import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Drive} from "../../../shared/types/common";
import {Observable} from "rxjs";
import {TripService} from "../../../shared/components/trip/trip.service";
import {MapService} from "../../main/map/map.service";
import {promise} from "selenium-webdriver";
import {Router} from "@angular/router";

@Component({
  selector: 'app-details-of-route',
  templateUrl: './details-of-route.component.html',
  styleUrls: ['./details-of-route.component.scss']
})
export class DetailsOfRouteComponent implements OnInit {
  @Output() drive: Drive;
  public ifProposed: boolean;

  constructor(private tripService: TripService, private mapper: MapService, private router: Router) {
  }

  ngOnInit() {
    let promise = new Promise((resolve, reject) => {
      this.tripService.currentDrive.subscribe(drive => this.drive = drive);
      this.tripService.ifProposed.subscribe(ifProposed => this.ifProposed = ifProposed);
      resolve(this.drive);
    });
    promise.then(result => {
      if (!this.ifProposed) {
      this.mapper.createRouteForMoreInformationBookings(this.drive);
      } else {
      this.mapper.createRouteForMoreInformationProposed(this.drive);
      }
    });
  }

  public return() {
    if (!this.ifProposed) {
      this.router.navigate(['/personalarea/mybookings']);
    } else {
this.router.navigate(['/personalarea/myproposed']);
    }
  }

}
