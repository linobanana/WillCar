import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {LeftMenuComponent} from "./left-menu/left-menu.component";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    NgxMaterialTimepickerModule
  ],
  providers: [],
  declarations: [LeftMenuComponent, MainComponent],
  exports: [MainComponent]
})
export class MainModule {}
