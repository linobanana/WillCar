import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LABELS} from '../../constants/labels';
import {USER} from '../../mocks/user.mocks';
import {TEST_TRIP} from '../../constants/trip';
import {BUTTON_LABELS} from '../../constants/button-labels';
import {MapService} from "../../../pages/main/map/map.service";
import {Car, User} from "../../types/common";

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {
  label = LABELS;
  buttonLabel = BUTTON_LABELS;
  driver: User;
  driveDate: string;

  constructor(private router: Router, mapService: MapService) {
    this.driver = new User();
    let drive = mapService.getPassengerDrive();
    this.driver = drive.driver;
    console.log(this.driver.phoneNumber);
    this.driveDate = drive.driveDate;
  }

  goToSuccess() {
    this.router.navigate(['/success-confirmation']);
  }

  goToMain() {
    this.router.navigate(['/main']);
  }

  ngOnInit() {
  }

}
