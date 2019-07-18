import {NgModule} from '@angular/core';
import {PersonalAreaComponent} from './personal-area.component';
import {MyBookingsModule} from './my-bookings/my-bookings.module';
import {MyProposedModule} from './my-proposed/my-proposed.module';
import {ProfileModule} from './profile/profile.module';
import {ProfileMenuModule} from '../../shared/components/profile-menu/profile-menu.module';


@NgModule({
  imports: [
    MyBookingsModule,
    MyProposedModule,
    ProfileModule,
    ProfileMenuModule
  ],
  declarations: [
    PersonalAreaComponent,
  ],
  exports: [
    PersonalAreaComponent
  ]
})

export class PersonalAreaModule {}
