import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LABELS} from '../../constants/labels';
import {BUTTON_LABELS} from '../../constants/button-labels';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {
  label = LABELS;
  driverInfo = this.userService.user;
  buttonLabel = BUTTON_LABELS;

  constructor(private router: Router, private userService: UserService) {}

  goToSuccess() {
    this.router.navigate(['/success-confirmation']);
  }

  goToMain() {
    this.router.navigate(['/main']);
  }

  ngOnInit() {
  }

}
