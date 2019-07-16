import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {MatIconModule, MatSelectModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatSelectModule,
  ],
  providers: [],
  declarations: [UserComponent],
  exports: [UserComponent]
})
export class UserModule {}
