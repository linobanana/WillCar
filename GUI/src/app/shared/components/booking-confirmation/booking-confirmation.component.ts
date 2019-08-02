import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LABELS} from '../../constants/labels';
import {USER} from '../../mocks/user.mocks';
import {BUTTON_LABELS} from '../../constants/button-labels';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {
  label = LABELS;
  driverInfo = USER;
 // tripInfo = TEST_TRIP;
  buttonLabel = BUTTON_LABELS;

  constructor(private router: Router) {}

  goToSuccess() {
    this.router.navigate(['/success-confirmation']);
  }

  goToMain() {
    this.router.navigate(['/main']);
  }

  ngOnInit() {
  }

}
