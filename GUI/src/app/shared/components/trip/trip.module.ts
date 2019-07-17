import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TripComponent} from "./trip.component";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [],
  declarations: [TripComponent],
  exports: [TripComponent]
})
export class TripModule {}
