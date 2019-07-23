import {NgModule} from '@angular/core';
import {PersonalAreaComponent} from './personal-area.component';
import {MyBookingsModule} from './my-bookings/my-bookings.module';
import {MyProposedModule} from './my-proposed/my-proposed.module';
import {ProfileModule} from './profile/profile.module';
import {ProfileMenuModule} from '../../shared/components/profile-menu/profile-menu.module';
import {RouterModule, Routes} from "@angular/router";
import {MyBookingsRoutes} from "./my-bookings/my-bookings.routes";
import {MyProposedRoutes} from "./my-proposed/my-proposed.routes";
import {ProfileRoutes} from "./profile/profile.routes";

const personalAreaRotes: Routes = [
  {
    path: 'personalarea',
    component: PersonalAreaComponent,
    children: [
      {
        path: '',
        children: [
          ...MyBookingsRoutes,
          ...MyProposedRoutes,
          ...ProfileRoutes,
        ]
      }
    ]
  }
];
@NgModule({
  imports: [
    MyBookingsModule,
    MyProposedModule,
    ProfileModule,
    ProfileMenuModule,
    RouterModule.forChild(personalAreaRotes)
  ],
  declarations: [
    PersonalAreaComponent,
  ],
  exports: [
    PersonalAreaComponent,
    RouterModule
  ]
})

export class PersonalAreaModule {}
