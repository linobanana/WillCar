import {NgModule} from '@angular/core';
import {ProfileMenuComponent} from './profile-menu.component';
import {MatButtonModule, MatTabsModule} from '@angular/material';
import {CommonModule} from '@angular/common';



@NgModule({
  imports: [
    MatTabsModule,
    MatButtonModule,
    CommonModule
  ],
  declarations: [
    ProfileMenuComponent
  ],
  exports: [
    ProfileMenuComponent
  ]
})

export class ProfileMenuModule {}
