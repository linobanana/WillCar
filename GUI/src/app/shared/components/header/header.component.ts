import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StateManagementService} from '../../services/role-toggle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public driverState: boolean;
  constructor(private router: Router ) {}

  goToMain() {
    if (this.router.url.includes('edit')) {
      this.router.navigate(['/personalarea/', 'myproposed']);
    } else {
      this.router.navigate(['/main']);
    }
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
