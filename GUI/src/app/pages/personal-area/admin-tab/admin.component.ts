import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../../shared/types/common';
import {ADMIN_LABELS} from '../../../shared/constants/admin-labels';
import {ProfileApiService} from '../../../shared/api/profile/profile.api.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  dataSource;

  constructor(private profileApiService: ProfileApiService) {
  }

  displayedColumns: string[] = ['name', 'passengerRating', 'driverRating', 'km', 'numberOfDrives', 'passengers', 'points'];
  adminLabels = ADMIN_LABELS;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.profileApiService.getUsers()
      .subscribe(data => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;
      });
  }

}
