import { Component, OnInit } from '@angular/core';
import {LABELS} from '../../constants/labels';
import {MENU_ITEMS} from '../../constants/menu-items';
import {Router} from '@angular/router';

@Component({
  selector: 'app-successful-create-route',
  templateUrl: './successful-create-route.component.html',
  styleUrls: ['./successful-create-route.component.css']
})
export class SuccessfulCreateRouteComponent implements OnInit {
  label = LABELS;
  menuItem = MENU_ITEMS;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToMyProposed() {
    this.router.navigate(['/personalarea/', 'myproposed']);
  }
  goToMain() {
    this.router.navigate(['/main']);
  }

}
