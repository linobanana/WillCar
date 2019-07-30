import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from './admin.component';
import {MatSortModule} from '@angular/material';
import {MatTableModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {ProfileApiService} from '../../../shared/api/profile/profile.api.service';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatIconModule
  ],
  exports: [
    AdminComponent
  ],
  providers: [
    ProfileApiService
  ]
})
export class AdminModule { }
