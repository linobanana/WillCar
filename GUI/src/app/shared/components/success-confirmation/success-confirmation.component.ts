import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-success-confirmation',
  templateUrl: './success-confirmation.component.html',
  styleUrls: ['./success-confirmation.component.css']
})
export class SuccessConfirmationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToMyBookings() {
    this.router.navigate(['/personalarea/', 'mybookings']);
  }
  goToMain() {
    this.router.navigate(['/main']);
  }
}
