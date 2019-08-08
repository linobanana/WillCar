import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LABELS} from '../../constants/labels';
import {BUTTON_LABELS} from '../../constants/button-labels';
import {MapService} from "../../../pages/main/map/map.service";
import {Car, User} from "../../types/common";
import {UserService} from '../user/user.service';
import {DriveApiService} from '../../api/trip/drive.api.service';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {
  label = LABELS;
  driverInfo = this.userService.user;
  buttonLabel = BUTTON_LABELS;
  driver: User;
  driveDate: string;
  drive: any;

  constructor(private router: Router, mapService: MapService, private driveApiService: DriveApiService, private userService: UserService) {
    this.driver = new User();
    this.drive = mapService.getPassengerDrive();
    this.driver = this.drive.driver;
    console.log(this.driver.phoneNumber);
    this.driveDate = this.drive.driveDate;
  }

  goToSuccess() {
    let drive = {
      drive: {
        id: this.drive.id,
      },
      passenger: {id: this.driverInfo.id},
      startPoint: this.drive.startPoint,
    };
    console.log(drive);
    this.driveApiService.postPassengerTrip(drive).subscribe(() => {
    });
    this.router.navigate(['/success-confirmation']);
  }

  goToMain() {
    this.router.navigate(['/main']);
  }

  ngOnInit() {
  }

}
