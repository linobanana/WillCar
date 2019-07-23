import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LABELS} from '../../constants/labels';
import {MENU_ITEMS} from '../../constants/menu-items';

@Component({
  selector: 'app-success-confirmation',
  templateUrl: './success-confirmation.component.html',
  styleUrls: ['./success-confirmation.component.css']
})
export class SuccessConfirmationComponent implements OnInit {
  label = LABELS;
  menuItem = MENU_ITEMS;

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
