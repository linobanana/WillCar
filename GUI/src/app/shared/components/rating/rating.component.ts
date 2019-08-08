import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
