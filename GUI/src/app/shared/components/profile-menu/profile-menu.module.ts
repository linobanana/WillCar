import {NgModule} from '@angular/core';
import {ProfileMenuComponent} from './profile-menu.component';
import {MatTabsModule} from '@angular/material';



@NgModule({
  imports: [
    MatTabsModule
  ],
  declarations: [
    ProfileMenuComponent
  ],
  exports: [
    ProfileMenuComponent
  ]
})

export class ProfileMenuModule {}
