import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class MapService {
private startl: string;
private endl: string;
private startr: string;
private endr: string;
private map;
  constructor() { }
   public initRelationLMwithY(LeftMenuInfo: FormGroup) {
     const leftmenuInfo = LeftMenuInfo;
     const self = this;
     ymaps.ready(init);
     function init() {
       let suggestionForStartInput = new ymaps.SuggestView('startl', {
         boundedBy: [
           [50, 60],
           [25, 30]
         ]
       });
       let suggestionForEndInput = new ymaps.SuggestView('endl', {
         boundedBy: [
           [50, 60],
           [25, 30]
         ]
       });
       suggestionForStartInput.events.add("select", function(e) {
         let startSuggestion = e.get('item').value;
         leftmenuInfo.get('address').get('startl').setValue(startSuggestion);
         self.startl = startSuggestion;
       });
       suggestionForEndInput.events.add("select", function(e) {
         let endSuggestion = e.get('item').value;
         leftmenuInfo.get('address').get('endl').setValue(endSuggestion);
         self.endl = endSuggestion;
       });
     }
   }
  public initRelationRMwithY(RightMenuInfo: FormGroup) {
    const rightmenuInfo = RightMenuInfo;
    const self = this;
    ymaps.ready(init);
    function init() {
      let suggestionForStartInput = new ymaps.SuggestView('startr', {
        boundedBy: [
          [50, 60],
          [25, 30]
        ]
      });
      let suggestionForEndInput = new ymaps.SuggestView('endr', {
        boundedBy: [
          [50, 60],
          [25, 30]
        ]
      });
      suggestionForStartInput.events.add("select", function(e) {
        let startSuggestion = e.get('item').value;
        rightmenuInfo.get('address').get('startr').setValue(startSuggestion);
        self.startr = startSuggestion;
      });
      suggestionForEndInput.events.add("select", function(e) {
        let endSuggestion = e.get('item').value;
        rightmenuInfo.get('address').get('endr').setValue(endSuggestion);
        self.endr = endSuggestion;
      });
    }
  }
  public makeRoutePoints() {
    const self = this;
    // const multiRoute = new ymaps.multiRouter.MultiRoute({
    //   referencePoints: [
    //     this.start,
    //     this.end
    //   ], params: {
    //     routingMode: 'auto'
    //   }
    // }, {
    //   boundsAutoApply: true
    // });
    // this.map.geoObjects.add(multiRoute);
    // multiRoute.model.events.add('requestsuccess', function(){
    //   let activeRoute = multiRoute.getActiveRoute();
    //   let paths = activeRoute.getPaths();
    //   paths.each(function(path) {
    //     let segments = path.getSegments();
    //     segments.each(function(segment) {
    //       console.log(segment.properties.get('coordinates'));
    //     });
    //   });
    //
    // });
    ///////////////////
    ymaps.route([
          this.startl,
          this.endl,
    ],
      {
        mapStateAutoApply: true
      }).then(function(route) {
      self.map.geoObjects.add(route);
      let way;
      let segments;
      for (let i = 0; i < route.getPaths().getLength(); i++) {
        way = route.getPaths().get(i);
        segments = way.getSegments();
        for(let j = 0; j < segments.length; j++) {
          console.log(segments[j].getCoordinates());
        }
      }
    });
    ymaps.route([
      [42.53838899999997, 44.48258999999989],
        [42.538392999999964, 44.48283999999989],
     [42.538408999999966, 44.48299799999989],
    [42.53845899999997, 44.48328499999989],
   [42.538487999999965, 44.483412999999885],
     [42.53853399999996, 44.483555999999886],
    [42.53875099999996, 44.48420499999989],
   [42.53883099999996, 44.48441399999989],
     [42.53894699999996, 44.484684999999885],
     [42.53902199999996, 44.484844999999886]
      ],
      {
        mapStateAutoApply: true,
      }).then(function(route) {
      self.map.geoObjects.add(route);
    });

    //////////////////////
    //let pointStart = new ymaps.Placemark(ymaps.geocode(this.start));
    //console.log(ymaps.geocode(this.start));
    //let pointEnd = new ymaps.Placemark(ymaps.geocode(this.end));
    //this.map.geoObjects.add(pointEnd);
    //////////////////////////
    var myGeocoder = ymaps.geocode(this.startl);
    myGeocoder.then(function(res) {
      self.map.geoObjects.add(res.geoObjects);
      self.map.setBounds(self.map.geoObjects.getBounds());
    });
    myGeocoder = ymaps.geocode(this.endl);
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
declare var ymaps: any;
