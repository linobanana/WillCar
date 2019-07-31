import {Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";

import {delay, min, take} from "rxjs/operators";
import {MapApiService} from "../../../shared/api/map/map.api.service";
import {ApiService} from "../../../shared/services/api.service";
import {Drive} from "../../../shared/types/common";

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
private infoToSearchDrive =
  {
    startPoint : '',
    endPoint : '',
    dateTime : ''
  };
private drives: Drive[] = [];

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
   public importInfoRoute(form: FormGroup) {
     this.datestart = new Date(form.get('date').value.toString());
     this.infoToSearchDrive.dateTime = this.formatDateISO8601(form.get('time').value.toString());
     const self = this;
     const promises = [];
     promises.push(
     ymaps.geocode(self.start, {results: 1}).then(function (res) {
         const firstGeoObject = res.geoObjects.get(0);
       self.infoToSearchDrive.startPoint = JSON.stringify(firstGeoObject.geometry.getCoordinates());
     }));
     promises.push(
     ymaps.geocode(self.end, {results: 1}).then(function (res) {
       const firstGeoObject = res.geoObjects.get(0);
       self.infoToSearchDrive.endPoint = JSON.stringify(firstGeoObject.geometry.getCoordinates());
     }));
     return Promise.all(promises);
  }
  public exportInfoRoute() {
    const self = this;
      console.log('searching route:', this.infoToSearchDrive);
    const promise = new Promise((resolve, reject) => {
      self.mapApi.postInfoToSearchDrive( self.infoToSearchDrive).subscribe((data) => {
        data.forEach(function(element) {
          self.drives.push(element);
        });
        resolve(self.drives);
      }, (error) => {
        console.error(error);
      });
    });
    promise.then((drives) => {
    this.showDrives();
    });
  }
  private showDrives() {
    this.drives.forEach((drive) => {
      this.createRouteWithBalloonForUser(drive.path, 'Shumaxer', drive.startTime, drive.freePlaceCount);
    });
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
    multiRoute.events
      .add('update', function () {
      const route = multiRoute.getActiveRoute();
      let pathArray = route.getPaths();
      let path;
      let coords = [];
      for (let i = 0; i < pathArray.getLength(); i++) {
        path = pathArray.get(i);
        coords = coords.concat(path.properties.get('coordinates'));
      }
      let startAddress;
      ymaps.geocode(coords[0], {
        results: 1
      }).then(function (res) {
        let firstGeoObject = res.geoObjects.get(0);
        startAddress = firstGeoObject.getAddressLine();
        form.get('address').get("startr").setValue(startAddress);
      });
      let finAddress;
      ymaps.geocode(coords[coords.length-1], {
        results: 1
      }).then(function (res) {
        let firstGeoObject = res.geoObjects.get(0);
        finAddress = firstGeoObject.getAddressLine();
        form.get('address').get("endr").setValue(finAddress);
      });
      self.drive.startPoint = JSON.stringify(coords[0]);
      self.drive.finPoint = JSON.stringify(coords[coords.length - 1]);
      self.drive.path = JSON.stringify(coords);
      self.drive.freePlaceCount = form.get('numberOfSeats').value.toString();
      self.datestart = new Date(form.get('date').value.toString());
      self.drive.startTime = self.formatDateISO8601(form.get('time').value.toString());
    });
  }
  public exportDrive() {
    console.log('export drive:');
    console.log(this.drive);
    this.mapApi.postDrive(this.drive)
      .subscribe((data) => {
        console.log(data);
      });
  }
  private formatDateISO8601(time: string): string {
    let hours = parseInt(time.substring(0, 2), 10);
    const minutes = parseInt(time.substring(3, 5), 10);
    if (time.substring(6, 8) === 'pm') {
      hours = hours + 12;
    }
    this.datestart.setHours(hours - (new Date().getTimezoneOffset() / 60));
    this.datestart.setMinutes(minutes);
    return this.datestart.toISOString();
    //console.log(this.drive.starttime);
    // const date  = new Date(this.drive.date.toString());
  }
  public initMap() {
    const geolocation = ymaps.geolocation;
    const self = this;
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
      }).then(function (result) {
        result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
        self.map.geoObjects.add(result.geoObjects);
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
  }
  private generateColor(ranges) {
    if (!ranges) {
      ranges = [
        [150, 256],
        [0, 190],
        [0, 30]
      ];
    }
    var g = function () {
      var range = ranges.splice(Math.floor(Math.random() * ranges.length), 1)[0];
      return Math.floor(Math.random() * (range[1] - range[0])) + range[0];
    };
    return "rgb(" + g() + "," + g() + "," + g() + ")";
  }
  private createRouteWithBalloonForUser(coordinates, driverName, driveStartTime, freeSeats) {
    let newCoordinates = coordinates.filter(function (currentValue, index) {
      if (index % 5 === 0 || index === coordinates.length) {
        return currentValue;
      }
    });
    let viaIndex = [];
    for (let i = 0; i < newCoordinates.length-2; i++) {
      viaIndex.push(i + 1);
    }
    var multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: newCoordinates,
        params: {viaIndexes: viaIndex}
      },
      {
        viaPointVisible: false,
        boundsAutoApply: true,
      });
    const self = this;
    multiRoute.events.add("click", (event) => {
      let coords = event.get("coords");
      let myPlacemark = new ymaps.Placemark(coords, {
        balloonContentHeader: 'Водитель: ' + driverName,
        balloonContentBody: 'Время начла поездки: ' + driveStartTime,
        balloonContentFooter: "количество свободных мест " + freeSeats,
      });
      self.map.geoObjects.add(myPlacemark);
      myPlacemark.balloon.open();
    }, this);
    this.map.geoObjects.add(multiRoute);
  }

  public cleanMap() {
    this.map.geoObjects.removeAll();
  }

}
