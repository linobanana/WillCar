import {NgModule} from '@angular/core';
import {SuccessConfirmationComponent} from './success-confirmation.component';
import {MatButtonModule, MatIconModule} from '@angular/material';


@NgModule({
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    SuccessConfirmationComponent
  ],
  exports: [
    SuccessConfirmationComponent
  ]
})

export class ConfirmationModule {}
