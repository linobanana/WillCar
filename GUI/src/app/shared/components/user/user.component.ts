import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Car, User} from '../../types/common';
import {MatSelectChange} from '@angular/material';
import {PROFILE_FIELD_LABELS} from '../../constants/profile';




@Component({
  selector: 'user-component',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Input() options: string[];
  @Output() carForm = new EventEmitter<Car>();
  profileLabels = PROFILE_FIELD_LABELS;

  constructor() {
  }

  ngOnInit() {
  }

  onSelectionChange(communicType: MatSelectChange): void {
    this.user.preferredCommunication = communicType.value;
  }
  onAddCar(car: Car) {
    this.carForm.emit(car);;
  }
}
