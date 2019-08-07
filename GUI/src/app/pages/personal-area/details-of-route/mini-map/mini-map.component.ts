import {Component, Injectable, Input, OnDestroy, OnInit} from '@angular/core';
import {MapService} from "../../../main/map/map.service";
import {Drive} from '../../../../shared/types/common';

declare var ymaps: any;

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.scss']
})
export class MiniMapComponent implements OnInit, OnDestroy {
  private map:any;
  constructor() {
  }

  ngOnInit() {
    this.InitYandexMap();
    console.log('init mini-map');
  }

  private InitYandexMap() {
    this.map = new ymaps.Map('map', {
      center: [53.9, 27.56],
      zoom: 12,
      controls: ['zoomControl', 'geolocationControl']
    }, {
      searchControlProvider: 'yandex#search'
    });
  }

  ngOnDestroy() {
    this.map.destroy();
    console.log('destroy mini-map');
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
  public createRouteForMoreInformationBookings(route: Drive) {
    let color = this.generateColor(null);
    let coordinates = JSON.parse(route.path);
    let temp = 0;
    const amount = route.path.length / 70;
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
      let PickUpPoint = new ymaps.GeoObject({
        geometry: {
          type: 'Point',
          coordinates: route.pickUpPoint
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
      this.map.geoObjects.add(multiRoute);
      temp = temp + 70;
    }
  }
  public createRouteForMoreInformationProposed(route: Drive) {
    let color = this.generateColor(null);
    let coordinates = JSON.parse(route.path);
    let temp = 0;
    const self = this;
    const amount = route.path.length / 70;
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
     route.passengers.forEach((passenger) => {
        let PickUpPoint = new ymaps.GeoObject({
          geometry: {
            type: 'Point',
            coordinates:  JSON.parse(passenger.pickUpPoint),
          },
          properties: {
            iconContent: 'Pick up',
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
      this.map.geoObjects.add(multiRoute);
      temp = temp + 70;
    }
    //this.setZoom();
  }
}
