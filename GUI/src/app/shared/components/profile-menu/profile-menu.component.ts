import { Component, OnInit } from '@angular/core';
import {MENU_ITEMS} from '../../constants/menu-items';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {

  profileNavItems = MENU_ITEMS;

  constructor() { }

  ngOnInit() {
  }

}
