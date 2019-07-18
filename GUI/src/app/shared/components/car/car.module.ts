import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarComponent} from './car.component';
import {MatButtonModule, MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  declarations: [CarComponent],
  exports: [CarComponent]
})
export class CarModule {}
