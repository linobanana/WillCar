import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  tabs = [
    'Profile',
    'My messages',
    'My bookings',
    'Proposed trips',
    'Exit'
  ]
}


