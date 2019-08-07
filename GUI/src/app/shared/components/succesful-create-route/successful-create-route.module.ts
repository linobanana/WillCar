import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {SuccessfulCreateRouteComponent} from './successful-create-route.component';


@NgModule({
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    SuccessfulCreateRouteComponent
  ],
  exports: [
    SuccessfulCreateRouteComponent
  ]
})

export class SuccessfulCreateRouteModule {}
