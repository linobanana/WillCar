import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from './admin.component';
import {
  MatButtonModule,
  MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatNativeDateModule,
  MatSortModule,
} from '@angular/material';
import {MatTableModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {ProfileApiService} from '../../../shared/api/profile/profile.api.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    BrowserModule,
    MatNativeDateModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule
  ],
  exports: [
    AdminComponent
  ],
  providers: [
    ProfileApiService
  ]
})
export class AdminModule { }
