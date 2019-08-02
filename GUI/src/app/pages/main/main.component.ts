import {Component, OnInit} from '@angular/core';
import {StateManagementService} from '../../shared/services/role-toggle.service';
import {MapService} from "./map/map.service";

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public driverState: boolean;
  constructor(private mapService:MapService){

  }
  ngOnInit() {
    this.initDriverState();
  }

  private initDriverState() {
    StateManagementService.getDriverModeObservable().subscribe((state) => {
      this.driverState = state;
      this.mapService.cleanMap();
    });
  }
}
