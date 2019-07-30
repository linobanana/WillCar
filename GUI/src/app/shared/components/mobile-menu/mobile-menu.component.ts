import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

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
