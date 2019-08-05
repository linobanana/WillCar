import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LABELS} from '../../constants/labels';
import {USER} from '../../mocks/user.mocks';
import {TEST_TRIP} from '../../constants/trip';
import {BUTTON_LABELS} from '../../constants/button-labels';
import {MapService} from "../../../pages/main/map/map.service";
import {Car, User} from "../../types/common";
import {TripApiService} from "../../api/trip/trip.api.service";

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
  drive: any;

  constructor(private router: Router, mapService: MapService, private tripApiService: TripApiService) {
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
      passenger: {id: '1'},
      startPoint: this.drive.startPoint,
    };
    console.log(drive);
    this.tripApiService.postPassengerTrip(drive).subscribe(() => {
    });
    this.router.navigate(['/success-confirmation']);
  }

  goToMain() {
    this.router.navigate(['/main']);
  }

  ngOnInit() {
  }

}
