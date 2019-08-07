import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TripService} from '../../../shared/components/trip/trip.service';
import {TripModule} from '../../../shared/components/trip/trip.module';
import {DetailsOfRouteComponent} from "./details-of-route.component";
import {InfoRouteModule} from "../../../shared/components/info-route/info-route.module";
import {MiniMapModule} from "./mini-map/mini-map.module";
import {MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    TripModule,
    InfoRouteModule,
    MiniMapModule,
    MatButtonModule
  ],
  providers: [
    TripService
  ],
  declarations: [DetailsOfRouteComponent],
  exports: [DetailsOfRouteComponent],
})
export class DetailsOfRouteModule {}
