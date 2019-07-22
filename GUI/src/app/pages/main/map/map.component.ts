import {Component, OnInit} from '@angular/core';

declare var ymaps:any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public myMap;

  ngOnInit() {
    this.initYandexMap();
  }
  private initYandexMap() {
    ymaps.ready(init);
    function init(){
      this.myMap = new ymaps.Map('map', {
        center: [53.9, 27.56],
        zoom: 12,
      }, {
        searchControlProvider: 'yandex#search'
      });
    }
  }
}

