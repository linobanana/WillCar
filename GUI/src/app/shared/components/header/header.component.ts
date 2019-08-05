import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StateManagementService} from '../../services/role-toggle.service';
import {MapService} from "../../../pages/main/map/map.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public driverState: boolean;
  constructor(private router: Router, private mapper: MapService) {}
  goToMain() {
    this.router.navigate(['/main']);
  }

  ngOnInit() {
    this.initDriverState();
  }

  public changeDriverState() {
    this.mapper.cleanMap();
    this.mapper.clearDrives();
    StateManagementService.changeDriverMode(!this.driverState);
  }

  private initDriverState() {
    StateManagementService.getDriverModeObservable().subscribe((state) => {
      this.driverState = state;
    });
  }
}
