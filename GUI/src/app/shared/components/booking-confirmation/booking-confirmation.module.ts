import {NgModule} from '@angular/core';
import {BookingConfirmationComponent} from './booking-confirmation.component';
import {MatButtonModule} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule

  ],
  declarations: [
    BookingConfirmationComponent
  ],
  exports: [
    BookingConfirmationComponent
  ]
})

export class BookingConfirmationModule {}
