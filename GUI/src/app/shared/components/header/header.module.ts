import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenuComponent} from './menu/menu.component';
import {HeaderComponent} from './header.component';
import {MatButtonModule, MatIconModule, MatSlideToggleModule, MatMenuModule, MatSidenavModule} from '@angular/material';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule
  ],
  entryComponents: [MenuComponent],
  declarations: [
    MenuComponent,
    HeaderComponent
  ],
  exports: [HeaderComponent],
  bootstrap: [MenuComponent],
  providers: []
})

export class HeaderModule {}
