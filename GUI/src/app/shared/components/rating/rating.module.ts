import {NgModule} from '@angular/core';
import {RatingComponent} from "./rating.component";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [],
  declarations: [RatingComponent],
  exports: [RatingComponent]
})
export class RatingModule {}
