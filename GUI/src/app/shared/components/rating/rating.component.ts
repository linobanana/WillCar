import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TripService} from "../trip/trip.service";
import {Car} from "../../types/common";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Output() onSetRating:EventEmitter<number> = new EventEmitter();
  @Input()  rating: number;
  constructor() {
  }

  ngOnInit() {
  }

  arrayOfNumbers(n: number): any[] {
    return Array(n);
  }

  isRated(){
    return this.rating!=0 && this.rating!=null;
  }

}
