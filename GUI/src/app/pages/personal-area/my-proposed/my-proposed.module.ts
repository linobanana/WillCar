import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TripService} from "../../../shared/components/trip/trip.service";
import {MyProposedComponent} from "./my-proposed.component";
import {TripModule} from "../../../shared/components/trip/trip.module";

@NgModule({
  imports: [
    CommonModule,
    TripModule
  ],
  providers: [
    TripService
  ],
  declarations: [MyProposedComponent],
  exports: [MyProposedComponent]
})
export class MyProposedModule {}
