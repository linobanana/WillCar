import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {delay, min, take} from "rxjs/operators";
import {MapApiService} from "../../../shared/api/map/map.api.service";
import {ApiService} from "../../../shared/services/api.service";

declare var ymaps: any;

@Injectable({
  providedIn: 'root'
})

export class MapService {
private start: string;
private end: string;
private datestart: Date;
private map;
private drive = {
  startPoint: '',
  finPoint: '',
  startTime: '',
  endTime: '2019-07-23T15:00:00.000Z',
  path: '',
  freePlaceCount: '1',
  driver: {
    id: '1'
  }
};
  constructor(private mapApi: MapApiService) {
  }
   public initRelationMwithY(MenuInfo: FormGroup, mode: string) {
     const menuInfo = MenuInfo;
     const self = this;
     const start = 'start';
     const end = 'end';
     ymaps.ready(init);
     function init() {
       let suggestionForStartInput = new ymaps.SuggestView(start + mode, {
         boundedBy: [
           [50, 60],
           [25, 30]
         ]
       });
       let suggestionForEndInput = new ymaps.SuggestView(end + mode, {
         boundedBy: [
           [50, 60],
           [25, 30]
         ]
       });
       suggestionForStartInput.events.add("select", function(e) {
         let startSuggestion = e.get('item').value;
         menuInfo.get('address').get(start + mode).setValue(startSuggestion);
         self.start = startSuggestion;
       });
       suggestionForEndInput.events.add("select", function(e) {
         let endSuggestion = e.get('item').value;
         menuInfo.get('address').get(end + mode).setValue(endSuggestion);
         self.end = endSuggestion;
       });
   }
   }
  public makeRoute(form: FormGroup) {
    const self = this;
    let multiRoute = new ymaps.multiRouter.MultiRoute({
      referencePoints: [
        self.start,
        self.end
      ],
      params: {
        results: 10
      }
    }, {
      boundsAutoApply: true,
      editorDrawOver: false,
      editorMidPointsType: "via",
      routeActiveStrokeColor: this.generateColor(null)
    });
    multiRoute.editor.start({
      // addWayPoints: true,
      removeWayPoints: true,
      addMidPoints: true
    });
    multiRoute.events
      .add("activeroutechange", self.onActiveRouteChange, self);
    self.map.geoObjects.add(multiRoute);
    multiRoute.events.add('update', function () {
      const route = multiRoute.getActiveRoute();
      let pathArray = route.getPaths();
      let path;
      let coords = [];
      for (let i = 0; i < pathArray.getLength(); i++) {
        path = pathArray.get(i);
        coords = coords.concat(path.properties.get('coordinates'));
      }
      self.drive.startPoint = JSON.stringify(coords[0]);
      self.drive.finPoint =  JSON.stringify(coords[coords.length - 1]);
      self.drive.path = JSON.stringify(coords);
      self.drive.freePlaceCount = form.get('numberOfSeats').value.toString();
      self.datestart = new Date(form.get('date').value.toString());
      self.formatDateISO8601(form.get('time').value.toString());
    });
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
    // /////////////////
    // ymaps.route([
    //       this.start,
    //       this.end,
    // ],
    //   {
    //     mapStateAutoApply: true
    //   }).then(function(route) {
    //   self.map.geoObjects.add(route);
    //   let way;
    //   let segments;
    //   let coordinates = [];
    //   for (let i = 0; i < route.getPaths().getLength(); i++) {
    //     way = route.getPaths().get(i);
    //     segments = way.getSegments();
    //     for(let j = 0; j < segments.length; j++) {
    //       coordinates = coordinates.concat(segments[j].getCoordinates());
    //     }
    //   }
    // let coordinates = self.createMultiRoute();
    // self.drive.path = coordinates.toString();
    // self.drive.start = coordinates[0];
    // self.drive.end = coordinates[coordinates.length - 1];
    // self.drive.seats = form.get('numberOfSeats').value.toString();
    // self.datestart = new Date(form.get('date').value.toString());
    // self.formatDateISO8601( form.get('time').value.toString());
    // console.log(self.drive);
      // console.log(JSON.stringify(coordinates.toString()));
    //});
   //  ymaps.route([
   //    [42.53838899999997, 44.48258999999989],
   //      [42.538392999999964, 44.48283999999989],
   //   [42.538408999999966, 44.48299799999989],
   //  [42.53845899999997, 44.48328499999989],
   // [42.538487999999965, 44.483412999999885],
   //   [42.53853399999996, 44.483555999999886],
   //  [42.53875099999996, 44.48420499999989],
   // [42.53883099999996, 44.48441399999989],
   //   [42.53894699999996, 44.484684999999885],
   //   [42.53902199999996, 44.484844999999886]
   //    ],
   //    {
   //      mapStateAutoApply: true,
   //    }).then(function(route) {
   //    self.map.geoObjects.add(route);
   //  });

    //////////////////////
    //let pointStart = new ymaps.Placemark(ymaps.geocode(this.start));
    //console.log(ymaps.geocode(this.start));
    //let pointEnd = new ymaps.Placemark(ymaps.geocode(this.end));
    //this.map.geoObjects.add(pointEnd);
    //////////////////////////
    // var myGeocoder = ymaps.geocode(this.start);
    // myGeocoder.then(function(res) {
    //   self.map.geoObjects.add(res.geoObjects);
    //   self.map.setBounds(self.map.geoObjects.getBounds());
    // });
    // myGeocoder = ymaps.geocode(this.end);
    // myGeocoder.then(function(res) {
    //   self.map.geoObjects.add(res.geoObjects);
    //   self.map.setBounds(self.map.geoObjects.getBounds());
    // });
  }
  public exportDrive() {
    console.log('--------');
    console.log(this.drive);
    console.log('--------');
    this.mapApi.postDrive(this.drive)
      .subscribe((data) => {
        console.log(data);
      });
  }
  private formatDateISO8601(time: string) {
    let hours = parseInt(time.substring(0, 2), 10);
    const minutes = parseInt(time.substring(3, 5), 10);
    if (time.substring(6, 8) === 'pm') {
      hours = hours + 12;
    }
    this.datestart.setHours(hours - (new Date().getTimezoneOffset() / 60));
    this.datestart.setMinutes(minutes);
    this.drive.startTime = this.datestart.toISOString();
    //console.log(this.drive.starttime);
    // const date  = new Date(this.drive.date.toString());
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
  private onActiveRouteChange(event) {
        let multiRoute = event.get('target');
        const route = multiRoute.getActiveRoute();
        let pathArray = route.getPaths();
        let path;
        let coords = [];
        for (let i = 0; i < pathArray.getLength(); i++) {
          path = pathArray.get(i);
      coords = coords.concat(path.properties.get('coordinates'));
    }
        // this.path = coords;
  }
  private generateColor(ranges) {
    if (!ranges) {
      ranges = [
        [150,256],
        [0, 190],
        [0, 30]
      ];
    }
    var g = function() {
      var range = ranges.splice(Math.floor(Math.random()*ranges.length), 1)[0];
      return Math.floor(Math.random() * (range[1] - range[0])) + range[0];
    };
    return "rgb(" + g() + "," + g() + "," + g() +")";
  }
}
