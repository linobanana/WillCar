import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Drive} from "../../types/common";
import {TripService} from "../trip/trip.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-info-route',
  templateUrl: './info-route.component.html',
  styleUrls: ['./info-route.component.scss']
})
export class InfoRouteComponent implements OnInit,OnDestroy {
@Input() route: Drive;
  public ifProposed: boolean;
  constructor(private tripService: TripService, private router: Router) {
  }

  ngOnInit() {
    this.tripService.ifProposed.subscribe(ifProposed => {
        this.ifProposed = ifProposed;
    });
  }
public valid() {
if (this.route === undefined) {
  return false;
} else {
  return true;
}
}
ngOnDestroy(): void {
}
}
