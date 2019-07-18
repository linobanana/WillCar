import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TripComponent} from './trip.component';
import {MatButtonModule, MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  declarations: [TripComponent],
  exports: [TripComponent]
})
export class TripModule {}
