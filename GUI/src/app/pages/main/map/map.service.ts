import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Trip} from "../../../shared/types/common";

@Injectable({
  providedIn: 'root'
})

export class MapService {
private startl: string;
private endl: string;
private startr: string;
private endr: string;
private map;
  constructor() {
  }
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
    const self = this;
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
        self.map.geoObjects.add(result.geoObjects);
      });
      this.createMultiRoute('улица Франциска Скорины, 21к1','улица Козлова, 15');
    }
  }
  private createRoute() {
    const self = this;
    ymaps.route(['улица Михася Лынькова, 39', 'улица Ваупшасова, 4к71'], {
      multiRoute: true,
      mapStateAutoApply: true
    })
      .done(function (multRoute) {
        multRoute.options.set("mapStateAutoApply", true);
        self.map.geoObjects.add(multRoute);
        const route = multRoute.getActiveRoute();
        console.log(route);
        var way;
        for (var i = 0; i < route.getPaths().getLength(); i++) {
          way = route.getPaths().get(i);
          var coords = way.properties.get('coordinates');
          console.log("координаты" + coords);
        }
      }, function (err) {
        throw err;
      }, this);
  }
  private createMultiRoute(startAddress:string , endAddress:string){
    const self = this;
    let multiRoute = new ymaps.multiRouter.MultiRoute({
      referencePoints: [
        startAddress,
        endAddress
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
      addWayPoints: true,
      // Для удаления точки нужно дважды кликнуть по ней.
      removeWayPoints: true,
      addMidPoints: true
    });
    multiRoute.events
      .add("activeroutechange", self.onActiveRouteChange, self);
    self.map.geoObjects.add(multiRoute);
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
  };

  private onActiveRouteChange(event){
    let multiRoute = event.get('target');
    const route = multiRoute.getActiveRoute();
    let pathArray = route.getPaths();
    let path;
    for (let i = 0; i < pathArray.getLength(); i++) {
      path = pathArray.get(i);
      let coords = path.properties.get('coordinates');
      // console.log(JSON.stringify(coords));
      console.log(coords);
    }
  }
  // private createBalloonOfTrip(trip :Trip){
  //    let balloonLayout = ymaps.templateLayoutFactory.createClass(
  //     "<div class='my-balloon'>" +
  //     '<a class="close" href="#">&times;</a>' +
  //     "Расстояние: " +
  //     "<i>{{ properties.distance.text }}</i>,<br />" +
  //     "Время в пути: " +
  //     "<i>{{ properties.duration.text }} (без учета пробок) </i>" +
  //     "</div>", {
  //
  //       build: function () {
  //         this.constructor.superclass.build.call(this);
  //         this._$element = $('.my-balloon', this.getParentElement());
  //         this._$element.find('.close')
  //           .on('click', $.proxy(this.onCloseClick, this));
  //       },
  //
  //       onCloseClick: function (e) {
  //         e.preventDefault();
  //         this.events.fire('userclose');
  //       }
  //     }
  //   );
  // }
}
declare var ymaps: any;
