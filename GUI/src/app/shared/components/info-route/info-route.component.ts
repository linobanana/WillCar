import {Component, Input, OnInit} from '@angular/core';
import {Drive} from "../../types/common";

@Component({
  selector: 'app-info-route',
  templateUrl: './info-route.component.html',
  styleUrls: ['./info-route.component.scss']
})
export class InfoRouteComponent implements OnInit {
@Input() route: Drive;
ifProposed: boolean;
  constructor() { }

  ngOnInit() {
  }

}
