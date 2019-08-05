import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainEditComponent} from './main-edit.component';
import {TripService} from '../../shared/components/trip/trip.service';
import {MapService} from '../main/map/map.service';
import {MapModule} from '../main/map/map.module';
import {MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MapModule,
    MatButtonModule
  ],
  providers: [
    TripService
  ],
  declarations: [MainEditComponent],
  exports: [MainEditComponent]
})
export class MainEditModule {}
