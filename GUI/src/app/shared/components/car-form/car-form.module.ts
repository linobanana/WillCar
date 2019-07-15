import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarFormComponent} from "./car-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule
  ],
  providers: [],
  declarations: [CarFormComponent],
  exports: [CarFormComponent]
})
export class CarFormModule {}
