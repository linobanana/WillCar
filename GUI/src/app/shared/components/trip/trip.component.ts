import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Drive} from '../../types/common';
import {CAR} from '../../mocks/user.mocks';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
 @Input() drives: Drive[];
 @Input() ifProposed: boolean;
 @Output() cancelDrive: EventEmitter<Drive> = new EventEmitter();
 @Output() editDrive: EventEmitter<Drive> = new EventEmitter();
 @Output() cancelPassengerDrive: EventEmitter<Drive> = new EventEmitter();
 car = CAR;
 constructor() { }

 ngOnInit() {}

}
