import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TripService} from '../../../shared/components/trip/trip.service';
import {MyBookingsComponent} from './my-bookings.component';
import {TripModule} from '../../../shared/components/trip/trip.module';

@NgModule({
  imports: [
    CommonModule,
    TripModule
  ],
  providers: [
    TripService
  ],
  declarations: [MyBookingsComponent],
  exports: [MyBookingsComponent]
})
export class MyBookingsModule {}
