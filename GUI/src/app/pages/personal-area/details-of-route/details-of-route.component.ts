import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Drive} from "../../../shared/types/common";
import {Observable} from "rxjs";
import {TripService} from "../../../shared/components/trip/trip.service";
import {MapService} from "../../main/map/map.service";
import {promise} from "selenium-webdriver";
import {Router} from "@angular/router";
import {MiniMapComponent} from './mini-map/mini-map.component';

@Component({
  selector: 'app-details-of-route',
  templateUrl: './details-of-route.component.html',
  styleUrls: ['./details-of-route.component.scss']
})
export class DetailsOfRouteComponent implements OnInit {
  @Output() drive: Drive;
  public ifProposed: boolean;

  constructor(private tripService: TripService, private mapper: MapService, private router: Router, private miniMapComponent: MiniMapComponent) {
  }

  ngOnInit() {
    let promise = new Promise((resolve, reject) => {
      this.tripService.currentDrive.subscribe(drive => this.drive = drive);
      this.tripService.ifProposed.subscribe(ifProposed => this.ifProposed = ifProposed);
      resolve(this.drive);
    });
    promise.then(result => {
      if (!this.ifProposed) {
      this.miniMapComponent.createRouteForMoreInformationBookings(this.drive);
      } else {
      this.miniMapComponent.createRouteForMoreInformationProposed(this.drive);
      }
    });
  }

  public backToPreviousTab() {
    if (!this.ifProposed) {
      this.router.navigate(['/personalarea/mybookings']);
    } else {
      this.router.navigate(['/personalarea/myproposed']);
    }
  }


}
