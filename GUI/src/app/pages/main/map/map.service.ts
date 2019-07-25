import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

declare var ymaps: any;
export class MapService {
private start: string;
private end: string;
private map;
  constructor() { }
  // private setMap(map: any) {
  //   this.map = map;
  // }
  public initYandexSuggestionsForInput(LeftMenuInfo: FormGroup) {
    const leftMenuInfo = LeftMenuInfo;
    const self = this;
    ymaps.ready(init);
    function init() {
      let suggestionForStartInput = new ymaps.SuggestView('start',{
        boundedBy: [
          [50, 60],
          [25, 30]
        ]
      });
      let suggestionForEndInput = new ymaps.SuggestView('end',{
        boundedBy: [
          [50, 60],
          [25, 30]
        ]
      });
      suggestionForStartInput.events.add("select", function(e) {
        let startSuggestion = e.get('item').value;
        leftMenuInfo.get('address').get('start').setValue(startSuggestion);
        self.start = startSuggestion;
      });
      suggestionForEndInput.events.add("select", function(e) {
        let endSuggestion = e.get('item').value;
        leftMenuInfo.get('address').get('end').setValue(endSuggestion);
        self.end = endSuggestion;
      });
    }
  }
  public makeRoute() {
    // const multiRoute = new ymaps.multiRouter.MultiRoute({
    //   referencePoints: [
    //     this.start,
    //     this.end
    //   ]
    // }, {
    //   // Автоматически устанавливать границы карты так,
    //   // чтобы маршрут был виден целиком.
    //   boundsAutoApply: true
    // });
    // this.map.geoObjects.add(multiRoute);
    ////////////////////////
    //let pointStart = new ymaps.Placemark(ymaps.geocode(this.start));
    //console.log(ymaps.geocode(this.start));
    //let pointEnd = new ymaps.Placemark(ymaps.geocode(this.end));
    //this.map.geoObjects.add(pointEnd);
    //////////////////////////
    const self = this;
        var myGeocoder = ymaps.geocode(this.start);
        myGeocoder.then(function(res) {
          self.map.geoObjects.add(res.geoObjects);
          self.map.setBounds(self.map.geoObjects.getBounds());
        });
        myGeocoder = ymaps.geocode(this.end);
        myGeocoder.then(function(res) {
          self.map.geoObjects.add(res.geoObjects);
          self.map.setBounds(self.map.geoObjects.getBounds());
        });
  }
  public initMap() {
    const geolocation = ymaps.geolocation;
    if (this.map === undefined) {
      this.map = new ymaps.Map('map', {
        center: [53.9, 27.56],
        zoom: 12,
        controls: ['zoomControl', 'geolocationControl']
      }, {
        searchControlProvider: 'yandex#search'
      });
      geolocation.get({
        provider: 'browser',
        mapStateAutoApply: true
      }).then(function(result) {
        result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
        this.map.geoObjects.add(result.geoObjects);
      });
    }
  }
}
