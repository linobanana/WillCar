import {Component, OnInit} from '@angular/core';
import {StateManagementService} from '../../shared/services/role-toggle.service';

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public driverState: boolean;

  ngOnInit() {
    this.initDriverState();
  }

  private initDriverState() {
    StateManagementService.getDriverModeObservable().subscribe((state) => {
      this.driverState = state;
    });
  }
}
