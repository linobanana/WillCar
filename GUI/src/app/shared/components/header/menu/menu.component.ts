import { Component } from '@angular/core';
import {MENU_ITEMS} from '../../../constants/menu-items';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menuItems = MENU_ITEMS;
}


