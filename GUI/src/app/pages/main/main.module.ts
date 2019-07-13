import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {LeftMenuComponent} from "./left-menu/left-menu.component";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatNativeDateModule} from "@angular/material";
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {MaterialModule} from "./material-module";


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
    MaterialModule
  ],
  providers: [],
  declarations: [LeftMenuComponent, MainComponent],
  exports: [MainComponent],
  bootstrap: [LeftMenuComponent]
})
export class MainModule {}
// platformBrowserDynamic().bootstrapModule(MainModule);

