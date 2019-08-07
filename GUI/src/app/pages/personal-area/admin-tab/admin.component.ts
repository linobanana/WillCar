import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../../shared/types/common';
import {ADMIN_LABELS} from '../../../shared/constants/admin-labels';
import {ProfileApiService} from '../../../shared/api/profile/profile.api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  filterForm: FormGroup;
  users: User[] = [];
  dataSource;
  displayedColumns: string[] = ['name', 'passengerRating', 'driverRating', 'km', 'numberOfDrives', 'passengers', 'points'];
  adminLabels = ADMIN_LABELS;

  constructor(private profileApiService: ProfileApiService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      startTime: [''],
      finTime: ['']
    });
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  onSubmit() {}
  onSubmitForm() {
    this.profileApiService.getFilteredUsers(this.filterForm.get('startTime').value.toString() + 'T00:00:00.000Z', this.filterForm.get('finTime').value.toString() + 'T00:00:00.000Z')
      .subscribe(data => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;
      });
  }
  cleanValues() {
    this.filterForm.reset();
  }
  ngOnInit() {
    this.profileApiService.getUsers()
      .subscribe(data => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;
      });
  }


}
