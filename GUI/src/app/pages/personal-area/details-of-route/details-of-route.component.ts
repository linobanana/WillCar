import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Drive} from "../../../shared/types/common";
import {combineLatest, Observable} from "rxjs";
import {TripService} from "../../../shared/components/trip/trip.service";
import {MapService} from "../../main/map/map.service";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";

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
    const self = this;
    let promise = new Promise((resolve, reject) => {
      combineLatest(
        this.tripService.currentDrive,
        this.tripService.ifProposed
      )
        .pipe(take(1))
      .subscribe(([drive, ifProposed]) => {
        if (drive === null) {
          self.router.navigate(['/main']);
          reject('update more info');
        } else {
          this.drive = drive;
          this.ifProposed = ifProposed;
          resolve(this.drive);
        }
      });
    });
    promise.then(result => {
      if (!this.ifProposed) {
      this.mapper.createRouteForMoreInformationBookings(this.drive);
      } else {
      this.mapper.createRouteForMoreInformationProposed(this.drive);
      }
    },
    error => {console.log(error); });
  }

  public backToPreviousTab() {
    if (!this.ifProposed) {
      this.router.navigate(['/personalarea/mybookings']);
    } else {
      this.router.navigate(['/personalarea/myproposed']);
    }
  }
}
