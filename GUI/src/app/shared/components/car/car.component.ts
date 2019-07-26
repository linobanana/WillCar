import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car, User} from '../../types/common';
import {PROFILE_FIELD_LABELS} from '../../constants/profile';
import {ProfileApiService} from '../../api/profile/profile.api.service';

@Component({
  selector: 'car-component',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  @Input() user: User;
  @Input() car: Car;
  @Output() deleteCar: EventEmitter<Car> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
}
