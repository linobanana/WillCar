import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private roter: Router ) {}
goToProfile() {
  this.roter.navigate(['/profile']);
}
goToMyBookings() {
  this.roter.navigate(['/mybookings']);
}
  goToMyProposed() {
    this.roter.navigate(['/myproposed']);
  }
  goToAuthirization() {
    this.roter.navigate(['/authorization']);
  }
}


