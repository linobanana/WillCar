import {Component, Input, OnInit} from '@angular/core';
import {Drive} from "../../types/common";
import {DriveApiService} from '../../api/trip/drive.api.service';
import {CAR} from '../../mocks/user.mocks';
import {TripService} from '../trip/trip.service';

@Component({
  selector: 'app-info-route',
  templateUrl: './info-route.component.html',
  styleUrls: ['./info-route.component.scss']
})
export class InfoRouteComponent implements OnInit {
  @Input() route: Drive;
  ifProposed: boolean;
  constructor(private driveApiService: DriveApiService, private tripService: TripService) { }
  car = CAR;
  ngOnInit() {
    this.tripService.ifProposed.subscribe(ifProposed => this.ifProposed = ifProposed);
  }

}
