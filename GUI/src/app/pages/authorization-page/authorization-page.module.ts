import {NgModule} from '@angular/core';
import {AuthorizationPageComponent} from './authorization-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthorizationPageComponent
  ],
  exports: [
    AuthorizationPageComponent
  ]
})


export class AuthorizationPageModule {}
