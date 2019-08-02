import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Drive, User} from '../../../shared/types/common';
import {TripService} from '../../../shared/components/trip/trip.service';
import {UserService} from "../../../shared/components/user/user.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-proposed',
  templateUrl: './my-proposed.component.html',
  styleUrls: ['./my-proposed.component.scss']
})
export class MyProposedComponent implements OnInit {
  drives$: Observable<Drive[]>;
  constructor(private tripService: TripService, private userService: UserService, private router: Router) {
    tripService.getProposedDrives(this.userService.user.id).then(()=>
      this.drives$ = tripService.proposedSubject);
  }

  ngOnInit() {
  }
onCancelTrip(drive: Drive) {
  this.tripService.cancelTrip(drive);
}
  onEditTrip(drive: Drive) {
    //this.tripService.cancelTrip(drive);
    this.router.navigate(['/edit']);
  }


}
