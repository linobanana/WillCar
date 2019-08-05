import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from "../../../main/map/map.service";

declare var ymaps: any;

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.scss']
})
export class MiniMapComponent implements OnInit, OnDestroy {
  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.InitYandexMap();
    console.log('init mini-map');
  }

  private InitYandexMap() {
    ymaps.ready(this.mapService.initMap());
  }

  ngOnDestroy() {
    this.mapService.destroyMap();
    console.log('destroy mini-map');
  }
}
