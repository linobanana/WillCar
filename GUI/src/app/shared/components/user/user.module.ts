import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {MatIconModule, MatSelectModule} from '@angular/material';
import {CarFormModule} from "../car-form/car-form.module";
import {CarModule} from "../car/car.module";

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatSelectModule,
    CarFormModule,
    CarModule
  ],
  providers: [],
  declarations: [UserComponent],
  exports: [UserComponent]
})
export class UserModule {}
