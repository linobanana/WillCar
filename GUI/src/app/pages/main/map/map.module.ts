import {NgModule} from '@angular/core';
import {MapComponent} from './map.component';
import {MapService} from "./map.service";
import {MapApiService} from "../../../shared/api/map/map.api.service";


@NgModule({
  declarations: [
    MapComponent
  ],
  providers: [MapService, MapApiService],
  exports: [
    MapComponent
  ]
})

export class MapModule {}
