import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StateManagementService} from '../../services/role-toggle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public driverState: boolean;
  constructor(private router: Router ) {}
  goToMain() {
    this.router.navigate(['/main']);
  }

  ngOnInit() {
    this.initDriverState();
  }

  public changeDriverState() {
    StateManagementService.changeDriverMode(!this.driverState);
  }

  private initDriverState() {
    StateManagementService.getDriverModeObservable().subscribe((state) => {
      this.driverState = state;
    });
  }
}
