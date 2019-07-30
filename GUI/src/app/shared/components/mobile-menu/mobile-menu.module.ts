import { NgModule } from '@angular/core';
import {MobileMenuComponent} from "./mobile-menu.component";
import {MatButtonModule, MatIconModule, MatNativeDateModule, MatRadioModule, MatSidenavModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MainModule} from "../../../pages/main/main.module";



@NgModule({
  declarations: [MobileMenuComponent],
  imports: [
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatIconModule,
    MainModule
  ],
  exports : [
    MobileMenuComponent
  ],
  bootstrap: [],
})
export class MobileMenuModule { }
