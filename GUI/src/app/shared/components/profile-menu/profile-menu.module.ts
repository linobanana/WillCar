import {NgModule} from '@angular/core';
import {ProfileMenuComponent} from './profile-menu.component';
import {MatButtonModule, MatTabsModule} from '@angular/material';



@NgModule({
  imports: [
    MatTabsModule,
    MatButtonModule
  ],
  declarations: [
    ProfileMenuComponent
  ],
  exports: [
    ProfileMenuComponent
  ]
})

export class ProfileMenuModule {}
