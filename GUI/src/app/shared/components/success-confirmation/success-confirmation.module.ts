import {NgModule} from '@angular/core';
import {SuccessConfirmationComponent} from './success-confirmation.component';
import {MatIconModule} from '@angular/material';


@NgModule({
  imports: [
    MatIconModule
  ],
  declarations: [
    SuccessConfirmationComponent
  ],
  exports: [
    SuccessConfirmationComponent
  ]
})

export class ConfirmationModule {}
