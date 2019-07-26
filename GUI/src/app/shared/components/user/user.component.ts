import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car, User} from '../../types/common';
import {MatSelectChange} from '@angular/material';
import {PROFILE_FIELD_LABELS} from '../../constants/profile';
import {ProfileApiService} from '../../api/profile/profile.api.service';




@Component({
  selector: 'user-component',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Input() options: string[];
  @Output() carForm = new EventEmitter<Car>();
  @Output() deleteCarButton = new EventEmitter<Car>();
  profileLabels = PROFILE_FIELD_LABELS;

  constructor(private profileApiService: ProfileApiService) {
  }

  ngOnInit() {
  }

  onSelectionChange(communicType: MatSelectChange): void {
    this.user.preferredCommunication = communicType.value;
    this.profileApiService.changeUserOptions({
      cars: this.user.cars,
      //driverRating: this.user.rating,
      //drives: [],
      email: this.user.email,
      id: 1,
      lastName: this.user.name,
      //passengerRating: this.user.rating,
      phoneNumber: this.user.telNumber,
      prefCommunication: communicType.value,
      role: 0
    }).subscribe((data) => {
      console.log(data);
    }, (error) => {
      console.error(error);
    });
  }

  onAddCar(car: Car) {
    this.carForm.emit(car);
  }

  onDeleteCar(car: Car) {
    this.deleteCarButton.emit(car);
  }
}
