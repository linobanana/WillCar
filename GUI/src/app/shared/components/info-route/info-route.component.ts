import {Component, Input, OnInit} from '@angular/core';
import {Drive} from "../../types/common";
import {TripService} from "../trip/trip.service";

@Component({
  selector: 'app-info-route',
  templateUrl: './info-route.component.html',
  styleUrls: ['./info-route.component.scss']
})
export class InfoRouteComponent implements OnInit {
@Input() route: Drive;
  public ifProposed: boolean;
  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.tripService.ifProposed.subscribe(ifProposed => this.ifProposed = ifProposed);
  }

}
