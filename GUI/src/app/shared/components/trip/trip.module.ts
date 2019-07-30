import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TripComponent} from './trip.component';
import {MatButtonModule, MatIconModule, MatListModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  declarations: [TripComponent],
  exports: [TripComponent]
})
export class TripModule {}
