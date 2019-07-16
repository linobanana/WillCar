import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../types/common';
import {PROFILE_FIELD_LABELS} from '../../constants/profile';

@Component({
  selector: 'car-component',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  @Input() user: User;
  profileLabels = PROFILE_FIELD_LABELS;

  constructor() { }

  ngOnInit() {
  }

}
