import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {LeftMenuComponent} from 'src/app/pages/main/left-menu/left-menu.component';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent implements OnInit {
  mode = new FormControl('over');
  constructor() { }
  ngOnInit() {
  }
}
