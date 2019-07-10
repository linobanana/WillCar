import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MainComponent} from "./main.component";
import {MatMenuModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule
  ],
  providers: [],
  declarations: [MainComponent],
  exports: [MainComponent]
})
export class MainModule {}
