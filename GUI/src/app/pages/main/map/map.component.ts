import {Component, OnInit} from '@angular/core';

declare var ymaps: any;
let myMap;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  positionLat: number;
  positionLon: number;

  ngOnInit() {
    this.testInitYandexMap();
  }
  private testInitYandexMap() {
    ymaps.ready(init);
    function init() {
      var geolocation = ymaps.geolocation;
       var myMap = new ymaps.Map('map', {
          center: [53.9, 27.56],
          zoom: 12,
          controls: ['zoomControl','geolocationControl']
        }, {
          searchControlProvider: 'yandex#search'
        });
      geolocation.get({
        provider: 'browser',
        mapStateAutoApply: true
      }).then(function (result) {
        //присвооить полям, чтобы использовать в драгом месте
        var coordinatesLat = result.geoObjects.position[0];
        var coordinatesLnt = result.geoObjects.position[1];
        // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
        result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
        myMap.geoObjects.add(result.geoObjects);
      });
    }
  }
}

