import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {LeftMenuComponent} from './left-menu/left-menu.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
// import {RightMenuComponent} from './right-menu/right-menu.component';
// import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import { RightMenuComponent } from './right-menu/right-menu.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,
    BrowserModule,
    MatNativeDateModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule
  ],
  providers: [],
  declarations: [LeftMenuComponent, MainComponent, RightMenuComponent],
  exports: [MainComponent],
  bootstrap: [LeftMenuComponent, RightMenuComponent]
})
export class MainModule {}
// platformBrowserDynamic().bootstrapModule(MainModule);

