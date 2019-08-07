import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Drive} from '../../../shared/types/common';
import {TripService} from '../../../shared/components/trip/trip.service';
import {UserService} from "../../../shared/components/user/user.service";

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {
  drives$: Observable<Drive[]>;
  constructor(private tripService: TripService, private userService: UserService) {
    tripService.getBookedDrives(/*this.userService.user.id*/2).then(()=>
      this.drives$ = tripService.bookedSubject);
  }

  ngOnInit() {
  }

  onCancelTrip(drive) {
  this.tripService.cancelPassengerTrip(drive, /*this.userService.user.id*/2);
  }

  onSetRating(markObject:{driveId:number, mark:number}){
    this.tripService.setRatingToDriver({driveId: markObject.driveId,
      mark: markObject.mark,
      passengerId: /*this.userService.user.id*/2});
  }
}
