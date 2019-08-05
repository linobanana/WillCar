import {NgModule} from '@angular/core';
import {MiniMapComponent} from "./mini-map.component";
import {MapApiService} from "../../../../shared/api/map/map.api.service";
import {MapService} from "../../../main/map/map.service";


@NgModule({
  declarations: [
    MiniMapComponent
  ],
  providers: [MapService, MapApiService],
  exports: [
    MiniMapComponent
  ]
})

export class MiniMapModule {}
