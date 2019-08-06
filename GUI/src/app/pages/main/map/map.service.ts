import {Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";

import {delay, min, take} from "rxjs/operators";
import {MapApiService} from "../../../shared/api/map/map.api.service";
import {ApiService} from "../../../shared/services/api.service";
import {Drive, options} from "../../../shared/types/common";
import {User} from "../../../shared/types/common";
import {stringify} from "querystring";
import {END_STRING, START_STRING} from "../../../shared/constants/common";

declare var ymaps: any;

@Injectable({
  providedIn: 'root'
})

export class MapService {
  private suggestionForStartInputR;
  private suggestionForEndInputR;
  private suggestionForStartInputL;
  private suggestionForEndInputL;

  private points = {
    start: '',
    end: ''
  };
  private datestart: Date;
  private map;
  private drive = {
    name: '',
    segmentsCoords: '',
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
  private passengerDrive = {
    id: 1,
    driver: new User(),
    startPoint: '',
    startPointString: '',
    numOfKm: '',
    driveDate: ''
  };
  private infoToSearchDrive =
    {
      startPoint: '',
      endPoint: '',
      dateTime: ''
    };
  private duration: number;
  private drives: Drive[] = [];

  constructor(private mapApi: MapApiService) {
  }

  public initRelationMwithYForRightMenu(MenuInfo: FormGroup) {
    const menuInfo = MenuInfo;
    const self = this;
    ymaps.ready(init);

    function init() {
      self.suggestionForStartInputR = new ymaps.SuggestView(START_STRING + 'r', {
        boundedBy: [
          [50, 60],
          [25, 30]
        ]
      });
      self.suggestionForEndInputR = new ymaps.SuggestView(END_STRING + 'r', {
        boundedBy: [
          [50, 60],
          [25, 30]
        ]
      });
      self.suggestionForStartInputR.events.add("select", function (e) {
        let startSuggestion = e.get('item').value;
        menuInfo.get('address').get(START_STRING + 'r').setValue(startSuggestion);
        self.points.start = startSuggestion;

      });
      self.suggestionForEndInputR.events.add("select", function (e) {
        let endSuggestion = e.get('item').value;
        menuInfo.get('address').get(END_STRING + 'r').setValue(endSuggestion);
        self.points.end = endSuggestion;
      });
    }
  }
  public initRelationMwithYForLeftMenu(MenuInfo: FormGroup) {
    const menuInfo = MenuInfo;
    const self = this;
    ymaps.ready(init);

    function init() {
      self.suggestionForStartInputL = new ymaps.SuggestView(START_STRING + 'l', {
        boundedBy: [
          [50, 60],
          [25, 30]
        ]
      });
      self.suggestionForEndInputL = new ymaps.SuggestView(END_STRING + 'l', {
        boundedBy: [
          [50, 60],
          [25, 30]
        ]
      });
      self.suggestionForStartInputL.events.add("select", function (e) {
        let startSuggestion = e.get('item').value;
        menuInfo.get('address').get(START_STRING + 'l').setValue(startSuggestion);
        self.points.start = startSuggestion;

      });
      self.suggestionForEndInputL.events.add("select", function (e) {
        let endSuggestion = e.get('item').value;
        menuInfo.get('address').get(END_STRING + 'l').setValue(endSuggestion);
        self.points.end = endSuggestion;
      });
    }
  }
  public clearDrives() {
    // this.drives.length = 0;
    this.drives.splice(0, this.drives.length);
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
  private getCordinatesFromAdress(adress: string, points: {start: string, end: string}, mode: string) {
    let promise = new Promise(function(resolve, reject) {
      ymaps.geocode(adress, {results: 1}).then(function (res) {
        const firstGeoObject = res.geoObjects.get(0);
        if (mode === START_STRING) {
          points.start =  firstGeoObject.geometry.getCoordinates();
        } else {
          points.end = firstGeoObject.geometry.getCoordinates();
        }
        resolve('correct');
      });
    });
    return promise.then(result => { /*console.log(result);*/
    });
  }

  public exportInfoRoute() {
    const self = this;
    this.infoToSearchDrive.startPoint = JSON.stringify(this.points.start);
    this.infoToSearchDrive.endPoint = JSON.stringify(this.points.end);
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
      routeActiveStrokeColor: this.generateColor(null),
      routeStrokeWidth: 7,
    });
    multiRoute.editor.start({
      // addWayPoints: true,
      removeWayPoints: true,
      removeViaPoints: true,
      addMidPoints: true,
      //removeMidPoints: true,
    });
    multiRoute.events
      .add("activeroutechange", self.onActiveRouteChange, self);
    self.map.geoObjects.add(multiRoute);
    multiRoute.events.add('update', function () {
      const route = multiRoute.getActiveRoute();
      let pathArray = route.getPaths();
      let path;
      let coords = [];
      let segmentCoords = [];
      for (let i = 0; i < pathArray.getLength(); i++) {
        path = pathArray.get(i);
        // coords = coords.concat(i === 0 || i === pathArray.getLength() - 1 ? path.properties.get('coordinates') :path.properties.get('coordinates').slice(1, -1));
        coords = coords.concat(path.properties.get('coordinates'));
        var segments = path.getSegments();
        segments.each(function (segment) {
          let index = segment.properties.get("lodIndex");
          segmentCoords.push(coords[index]);
        });
      }
      let startAddress;
      ymaps.geocode(coords[0], {
        results: 1
      }).then(function (res) {
        var startAddress = res.geoObjects.get(0) ? res.geoObjects.get(0).properties.get('name') : 'Не удалось определить адрес.';
        form.get('address').get(START_STRING + 'r').setValue(startAddress);
        setTimeout(() => {
          self.suggestionForStartInputR.state.set({
            open: false,
            panelClosed: true,
            items: []
          });
        }, 1000);
      });
      let finAddress;
      ymaps.geocode(coords[coords.length - 1], {
        results: 1
      }).then(function (res) {
        var finAddress = res.geoObjects.get(0) ? res.geoObjects.get(0).properties.get('name') : 'Не удалось определить адрес.';
        form.get('address').get(END_STRING + 'r').setValue(finAddress);
        setTimeout(() => {
          self.suggestionForEndInputR.state.set({
            open: false,
            panelClosed: true,
            items: []
          });
        }, 1000);

      });
      self.duration = route.properties.get("duration").value;
      self.drive.startPoint = JSON.stringify(coords[0]);
      self.drive.finPoint =  JSON.stringify(coords[coords.length - 1]);
      self.drive.path = JSON.stringify(coords);
      self.drive.segmentsCoords = JSON.stringify(segmentCoords);
    });
  }
  public importDrive(form: FormGroup) {
    this.drive.freePlaceCount = form.get('numberOfSeats').value;
    this.datestart = new Date(form.get('date').value.toString());
    this.drive.startTime = this.formatDateISO8601(form.get('time').value.toString());
    this.drive.name = form.get('address').get(START_STRING + 'r').value + ' - ' + form.get('address').get(END_STRING + 'r').value;
    console.log(this.drive.name);
    const self = this;
    const promises = [];
    promises.push(
      self.getCordinatesFromAdress(self.points.start, self.points, START_STRING));
    promises.push(
      self.getCordinatesFromAdress(self.points.end, self.points, END_STRING));
    return Promise.all(promises);
  }
  public exportDrive(form: FormGroup) {
    this.drive.startPoint = JSON.stringify(this.points.start);
    this.drive.finPoint = JSON.stringify(this.points.end);
    console.log('export drive:');
    console.log(this.drive);
    console.log('-------------');
    this.mapApi.postDrive(this.drive)
      .subscribe((data) => {
        console.log(data);
      });
  }
  private getEndTime(startime: string):string {
    let tempdate = new Date(startime);
   //console.log(this.duration);
    console.log(this.duration);
    tempdate = new Date(tempdate.getTime() + this.duration * 1000);
    //tempdate.setHours(this.duration);
    return tempdate.toISOString();
  }
  private formatDateISO8601(time: string): string {
    let hours = parseInt(time.substring(0, 2), 10);
    const minutes = parseInt(time.substring(3, 5), 10);
    if (time.substring(6, 8) === 'pm') {
      hours = hours + 12;
    }
    this.datestart.setHours(hours - (new Date().getTimezoneOffset() / 60));
    this.datestart.setMinutes(minutes);
    console.log(this.datestart.toString());
    this.drive.endTime = this.getEndTime(this.datestart.toString());
    return this.datestart.toISOString();
    //console.log(this.drive.starttime);
    // const date  = new Date(this.drive.date.toString());
  }
  private parseToISO8601(date: string): string {
    date = new Date(date).toLocaleDateString('en-US', options);
    return date;
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
  public destroyMap() {
    this.map.destroy();
  }
  private onActiveRouteChange(event) {
    let multiRoute = event.get('target');
    const route = multiRoute.getActiveRoute();
    let pathArray = route.getPaths();
    let path;
    let coords = [];
    let segmentCoords = [];
    for (let i = 0; i < pathArray.getLength(); i++) {
      path = pathArray.get(i);
      coords = coords.concat(path.properties.get('coordinates'));
      var segments = path.getSegments();
      segments.each(function (segment) {
        let index = segment.properties.get("lodIndex");
        segmentCoords.push(coords[index]);
      });
    }
    this.duration = route.properties.get("duration").value;
    this.drive.path = JSON.stringify(coords);
    this.drive.segmentsCoords = JSON.stringify(segmentCoords);
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
      var range = ranges.splice(Math.floor(Math.random() * ranges.length), 1)[0];
      return Math.floor(Math.random() * (range[1] - range[0])) + range[0];
    };
    return "rgb(" + g() + "," + g() + "," + g() +")";
  }
  public createRouteWithBalloonForUser(drive: Drive) {
    let color = this.generateColor(null);
    let coordinates = drive.segmentsCoords;
    let driverName = drive.driver.name;
    let driveStartTime = this.parseToISO8601(drive.startTime);
    let freePlaceCount = drive.freePlaceCount;
    let temp = 0;
    let startCoords = drive.startPoint;
    let endCoords = drive.finPoint;

    let startPlacemark = new ymaps.Placemark(startCoords, {
      iconContent: 'A'
    }, {
      preset: "islands#redStretchyIcon"
    });
    let endPlacemark = new ymaps.Placemark(endCoords, {
      iconContent: 'B'
    }, {
      preset: "islands#blueStretchyIcon"
    });
    this.map.geoObjects.add(startPlacemark);

    const amount = drive.segmentsCoords.length / 70;
    for (let j = 0; j < amount; j++) {
      let tempCoordinates = [];
      if (j !== amount - 1) {
        tempCoordinates = coordinates.slice(temp, temp + 71);
      } else {
         tempCoordinates = coordinates.slice(temp);
      }
      let viaIndex = [];
      for (let k = 1; k < tempCoordinates.length - 1; k++) {
        viaIndex.push(k);
      }
      var multiRoute = new ymaps.multiRouter.MultiRoute({
          referencePoints: tempCoordinates,
          params: {
            viaIndexes: viaIndex,
            results: 1
          }
        },
        {
          wayPointVisible: false,
          viaPointVisible: false,
          boundsAutoApply: true,
          routeActiveStrokeColor: color,
          routeStrokeWidth: 7
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
        self.passengerDrive.id = drive.id;
        self.passengerDrive.driver = drive.driver;
        self.passengerDrive.startPoint = JSON.stringify(coords);
        self.passengerDrive.numOfKm = "100";
        self.passengerDrive.driveDate = driveStartTime;

        let myPlacemark = new ymaps.Placemark(coords, {
          balloonContentHeader: '<br>Водитель: ' + driverName,
          balloonContentBody: 'Время начла поездки: ' + driveStartTime + ' <br> ' +
            " Количество свободных мест " + freePlaceCount,
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
        temp = temp + 70;
    }
    this.map.geoObjects.add(endPlacemark);
  }
  public createRouteForMoreInformationBookings(drive: Drive) {
    let color = this.generateColor(null);
    let coordinates = drive.segmentsCoords;
    let temp = 0;
    const amount = drive.segmentsCoords.length / 70;
    for (let j = 0; j < amount; j++) {
      let tempCoordinates = [];
      if (j !== amount - 1) {
        tempCoordinates = coordinates.slice(temp, temp + 71);
      } else {
        tempCoordinates = coordinates.slice(temp);
      }
      let viaIndex = [];
      for (let k = 1; k < tempCoordinates.length - 1; k++) {
        viaIndex.push(k);
      }
      var multiRoute = new ymaps.multiRouter.MultiRoute({
          referencePoints: tempCoordinates,
          params: {
            viaIndexes: viaIndex,
            results: 1
          }
        },
        {
          wayPointVisible: false,
          viaPointVisible: false,
          boundsAutoApply: true,
          routeActiveStrokeColor: color
        });
      this.map.geoObjects.add(multiRoute);
      temp = temp + 70;
    }
    let PickUpPoint = new ymaps.GeoObject({
      geometry: {
        type: 'Point',
        coordinates: drive.pickUpPoint
      },
      properties: {
        iconContent: 'Pick up',
      }
    }, {
      preset: 'islands#redStretchyIcon',
      draggable: false,
    });
    let StartPoint = new ymaps.GeoObject({
      geometry: {
        type: 'Point',
        coordinates: coordinates[0]
      },
      properties: {
        iconContent: 'Start',
      }
    }, {
      preset: 'islands#blueStretchyIcon',
      draggable: false,
    });
    let FinishPoint = new ymaps.GeoObject({
      geometry: {
        type: 'Point',
        coordinates: coordinates[coordinates.length - 1]
      },
      properties: {
        iconContent: 'Finish',
      }
    }, {
      preset: 'islands#blueStretchyIcon',
      draggable: false,
    });
    this.map.geoObjects.add(PickUpPoint);
    this.map.geoObjects.add(StartPoint);
    this.map.geoObjects.add(FinishPoint);
  }
  //////////???????????????????????????//////
  public createRouteForMoreInformationProposed(drive: Drive) {
    const self = this;
    let color = this.generateColor(null);
    let coordinates = drive.path;
    let temp = 0;
    const amount = drive.path.length / 70;
    for (let j = 0; j < amount ; j++) {
      let tempCoordinates = [];
      if ( j !== amount - 1) {
        tempCoordinates = coordinates.slice(temp, temp + 71);
      } else {
        tempCoordinates = coordinates.slice(temp);
      }
      let viaIndex = [];
      for (let k = 1; k < tempCoordinates.length - 1; k++) {
        viaIndex.push(k);
      }
      var multiRoute = new ymaps.multiRouter.MultiRoute({
          referencePoints: tempCoordinates,
          params: {
            viaIndexes: viaIndex,
            results: 1
          }
        },
        {
          wayPointVisible: false,
          viaPointVisible: false,
          boundsAutoApply: true,
          routeActiveStrokeColor: color
        });
      this.map.geoObjects.add(multiRoute);
      temp = temp + 70;
    }
    drive.passengers.forEach((passenger) => {
      let PickUpPoint = new ymaps.GeoObject({
        geometry: {
          type: 'Point',
          coordinates: passenger.pickUpPoint
        },
        properties: {
          iconConteninit: 'Pick up',
        }
      }, {
        preset: 'islands#redStretchyIcon',
        draggable: false,
      });
      self.map.geoObjects.add(PickUpPoint);
    });
    let StartPoint = new ymaps.GeoObject({
      geometry: {
        type: 'Point',
        coordinates: coordinates[0]
      },
      properties: {
        iconContent: 'Start',
      }
    }, {
      preset: 'islands#blueStretchyIcon',
      draggable: false,
    });
    let FinishPoint = new ymaps.GeoObject({
      geometry: {
        type: 'Point',
        coordinates: coordinates[coordinates.length - 1]
      },
      properties: {
        iconContent: 'Finish',
      }
    }, {
      preset: 'islands#blueStretchyIcon',
      draggable: false,
    });
    this.map.geoObjects.add(StartPoint);
    this.map.geoObjects.add(FinishPoint);
    //this.setZoom();
  }
  public cleanMap() {
    this.map.geoObjects.removeAll();
  }
  public drawPointsForUser() {
    let passengerStartPoint = new ymaps.GeoObject({
      geometry: {
        type: "Point",
        coordinates: this.points.start
      },
      properties: {
        iconContent: 'точка подсадки',
        hintContent: 'передвиньте на место, гда вы собираетесь подсесть',

      }
    }, {
      preset: 'islands#blueStretchyIcon',
      draggable: true,
    });
    let passengerEndPoint = new ymaps.GeoObject({
      geometry: {
        type: "Point",
        coordinates: this.points.end
      },
      properties: {
        iconContent: 'точка высадки',
        hintContent: 'передвиньте на место, гда вы собираетесь выйти',

      }
    }, {
      preset: 'islands#blueStretchyIcon',
      draggable: true,
    });


    var myGeoObjects = new ymaps.GeoObjectCollection({}, {
      preset: "islands#redCircleIcon",
      strokeWidth: 4,
      geodesic: true
    });
    myGeoObjects.add(passengerStartPoint);
    myGeoObjects.add(passengerEndPoint);
    this.map.geoObjects.add(myGeoObjects);
  }
  public setZoom() {
    this.map.setBounds( this.map.geoObjects.getBounds(), {checkZoomRange: true});
  }
  public getPassengerDrive() {
    return this.passengerDrive;
  }
}
