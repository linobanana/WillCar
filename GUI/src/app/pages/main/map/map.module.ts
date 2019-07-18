import {NgModule} from '@angular/core';
import {MapComponent} from './map.component';
import {BrowserModule} from '@angular/platform-browser';
import {YaCoreModule, YamapngModule} from 'yamapng';



@NgModule({
  imports: [
    BrowserModule,
    YamapngModule,
    YaCoreModule.forRoot({
      apiKey: '30f3f225-f160-4bf0-ab0f-3cd28314d672'
    })
  ],
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ]
})

export class MapModule {}
