import {NgModule} from '@angular/core';
import {AuthorizationPageComponent} from './authorization-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    AuthorizationPageComponent
  ],
  exports: [
    AuthorizationPageComponent
  ]
})


export class AuthorizationPageModule {}
