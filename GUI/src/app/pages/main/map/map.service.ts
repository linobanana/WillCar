import {Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from '@angular/router';

import {delay, min, take} from "rxjs/operators";
import {MapApiService} from "../../../shared/api/map/map.api.service";
import {ApiService} from "../../../shared/services/api.service";
import {Drive, User} from "../../../shared/types/common";
import {stringify} from "querystring";
import {END_STRING, START_STRING} from "../../../shared/constants/common";

declare var ymaps: any;

@Injectable({
  providedIn: 'root'
})

export class MapService {
  private points = {
    start: '',
    end: ''
  };
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
    },
    name:''
  };
  private passengerDrive = {
    driver: new User(),
    startPoint: [],
    startPointString:'',
    numOfKm: '',
    driveDate: ''
  };
  private infoToSearchDrive =
    {
      startPoint: '',
      endPoint: '',
      dateTime: ''
    };
  private drives: Drive[] = [];

  constructor(private mapApi: MapApiService, private router: Router) {
  }

  public initRelationMwithY(MenuInfo: FormGroup, mode: string) {
    const menuInfo = MenuInfo;
    const self = this;
    ymaps.ready(init);

    function init() {
      let suggestionForStartInput = new ymaps.SuggestView(START_STRING + mode, {
        boundedBy: [
          [50, 60],
          [25, 30]
        ]
      });
      let suggestionForEndInput = new ymaps.SuggestView(END_STRING + mode, {
        boundedBy: [
          [50, 60],
          [25, 30]
        ]
      });
      suggestionForStartInput.events.add("select", function (e) {
        let startSuggestion = e.get('item').value;
        menuInfo.get('address').get(START_STRING + mode).setValue(startSuggestion);
        self.points.start = startSuggestion;
        suggestionForStartInput.state.set('open', false);
      });
      suggestionForEndInput.events.add("select", function (e) {
        let endSuggestion = e.get('item').value;
        menuInfo.get('address').get(END_STRING + mode).setValue(endSuggestion);
        self.points.end = endSuggestion;
        suggestionForEndInput.state.set('open', false);

      });
    }
  }

  public importInfoRoute(form: FormGroup) {
    this.datestart = new Date(form.get('date').value.toString());
    this.infoToSearchDrive.dateTime = this.formatDateISO8601(form.get('time').value.toString());
    const self = this;
    const promises = [];
    promises.push(
      self.getCordinatesFromAdress(self.points.start, self.points, START_STRING));
    promises.push(
      self.getCordinatesFromAdress(self.points.end, self.points, END_STRING));
    return Promise.all(promises);
  }

  private getCordinatesFromAdress(adress: string, points: { start: string, end: string }, mode: string) {
    let promise = new Promise(function (resolve, reject) {
      ymaps.geocode(adress, {results: 1}).then(function (res) {
        const firstGeoObject = res.geoObjects.get(0);
        if (mode === START_STRING) {
          points.start = JSON.stringify(firstGeoObject.geometry.getCoordinates());
        } else {
          points.end = JSON.stringify(firstGeoObject.geometry.getCoordinates());
        }
        resolve('correct');
      });
    });
    return promise.then(result => {
      console.log(result);
    });
  }

  public exportInfoRoute() {
    const self = this;
    this.infoToSearchDrive.startPoint = this.points.start;
    this.infoToSearchDrive.endPoint = this.points.end;
    console.log('searching route:', this.infoToSearchDrive);
    const promise = new Promise((resolve, reject) => {
      self.mapApi.postInfoToSearchDrive(self.infoToSearchDrive).subscribe((data) => {
        data.forEach(function (element) {
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
      console.log(drive);
      this.createRouteWithBalloonForUser(drive);
    });
  }

  public makeRoute(form: FormGroup) {
    const self = this;
    let multiRoute = new ymaps.multiRouter.MultiRoute({
      referencePoints: [
        self.points.start,
        self.points.end
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
      // alert(route.properties.get("duration").text);
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
        form.get('address').get(START_STRING + 'r').setValue(startAddress);

      });
      let finAddress;
      ymaps.geocode(coords[coords.length - 1], {
        results: 1
      }).then(function (res) {
        let firstGeoObject = res.geoObjects.get(0);
        finAddress = firstGeoObject.getAddressLine();
        form.get('address').get(END_STRING + 'r').setValue(finAddress);
      });
      self.drive.startPoint = JSON.stringify(coords[0]);
      self.drive.finPoint = JSON.stringify(coords[coords.length - 1]);
      self.drive.path = JSON.stringify(coords);
    });
  }

  public importDrive(form: FormGroup) {
    this.drive.freePlaceCount = form.get('numberOfSeats').value;
    this.datestart = new Date(form.get('date').value.toString());
    this.drive.startTime = this.formatDateISO8601(form.get('time').value.toString());
    this.drive.name = form.get(START_STRING+"r").value;
    const self = this;
    const promises = [];
    promises.push(
      self.getCordinatesFromAdress(self.points.start, self.points, START_STRING));
    promises.push(
      self.getCordinatesFromAdress(self.points.end, self.points, END_STRING));
    return Promise.all(promises);
  }

  public exportDrive(form: FormGroup) {
    this.drive.startPoint = this.points.start;
    this.drive.finPoint = this.points.end;
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
  }

  public initMap() {
    const geolocation = ymaps.geolocation;
    const self = this;
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
         self.map.geoObjects.add(result.geoObjects);
      });

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

  private createRouteWithBalloonForUser(drive) {
    let coordinates = drive.path;
    let driverName = drive.driver.name;
    let driveStartTime = drive.startTime;
    let freePlaceCount = drive.freePlaceCount;
    let temp = coordinates.length / 80 +1;
    let newCoordinates = coordinates.filter(function (currentValue, index) {
      if (index % 5 === 0 || index === coordinates.length) {
        return currentValue;
      }
    });
    let viaIndex = [];
    for (let i = 0; i < newCoordinates.length - 2; i++) {
      viaIndex.push(i+1);
    }
    var multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: newCoordinates,
        params: {viaIndexes: viaIndex}
      },
      {
        viaPointVisible: false,
        boundsAutoApply: true,
        routeActiveStrokeColor: this.generateColor(null)

      });
    const self = this;
    multiRoute.events.add("click", (event) => {
      let coords = event.get("coords");
      let pickUpPoint;
      ymaps.geocode(coords, {
        results: 1
      }).then(function (res) {
        let firstGeoObject = res.geoObjects.get(0);
        pickUpPoint = firstGeoObject.getAddressLine();
        self.passengerDrive.startPointString = pickUpPoint;
      });
      self.passengerDrive.driver = drive.driver;
      self.passengerDrive.startPoint = coords.toString();
      self.passengerDrive.numOfKm = "100";
      self.passengerDrive.driveDate = driveStartTime;

      let myPlacemark = new ymaps.Placemark(coords, {
        balloonContentHeader: '<br>Водитель: ' + driverName,
        balloonContentBody: 'Время начла поездки: ' + driveStartTime +
          " количество свободных мест " + freePlaceCount,
        balloonContentFooter: '<a href="/#/confirmation">Забронировать</a><br>'
      });
      myPlacemark.events.add("balloonclose", (event) => {
        let placeMark = event.get("target");
        self.map.geoObjects.remove(placeMark);
      });
      self.map.geoObjects.add(myPlacemark);
      myPlacemark.balloon.open();
    }, this);
    this.map.geoObjects.add(multiRoute);
  }
  public cleanMap() {
    if(this.map!==undefined) {
      this.map.geoObjects.removeAll();
    }
  }
  public getPassengerDrive(){
    return this.passengerDrive;
  }
}
