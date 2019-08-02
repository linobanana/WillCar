import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from "./map.service";

declare var ymaps: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.InitYandexMap();
    console.log("init into map.component");
  }

  private InitYandexMap() {
    ymaps.ready(this.mapService.initMap());
  }

  ngOnDestroy() {
      this.mapService.destroyMap();
      console.log('destroy map');
  }
}
