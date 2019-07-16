import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarComponent} from './car.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [],
  declarations: [CarComponent],
  exports: [CarComponent]
})
export class CarModule {}
