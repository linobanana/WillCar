import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car, User} from '../../types/common';

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
