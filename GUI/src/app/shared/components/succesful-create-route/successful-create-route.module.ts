import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {SuccesfulCreateRouteComponent} from './succesful-create-route.component';


@NgModule({
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    SuccesfulCreateRouteComponent
  ],
  exports: [
    SuccesfulCreateRouteComponent
  ]
})

export class SuccessfulCreateRouteModule {}
