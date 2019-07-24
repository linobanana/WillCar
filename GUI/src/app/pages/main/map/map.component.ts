import {Component, OnInit} from '@angular/core';

declare var ymaps: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private myMap: any;

  ngOnInit() {
    this.InitYandexMap();
  }

  private InitYandexMap() {
    const self = this;
    ymaps.ready(init);
    function init() {
      var geolocation = ymaps.geolocation;
      self.myMap = new ymaps.Map('map', {
        center: [53.9, 27.56],
        zoom: 12,
        controls: ['zoomControl', 'geolocationControl']
      }, {
        searchControlProvider: 'yandex#search'
      });
      geolocation.get({
        provider: 'browser',
        mapStateAutoApply: true
      }).then(function (result) {
        // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
        result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
        self.myMap.geoObjects.add(result.geoObjects);
      });
    }
  }
}

