import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatDividerModule, MatIconModule, MatListModule} from '@angular/material';
import {InfoRouteComponent} from "./info-route.component";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule
  ],
  providers: [],
  declarations: [InfoRouteComponent],
  exports: [InfoRouteComponent]
})
export class InfoRouteModule {}
