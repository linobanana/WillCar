import {Routes} from '@angular/router';
import {MainRoutes} from './pages/main/main.routes';
import {ProfileRoutes} from './pages/profile/profile.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  ...MainRoutes,
  ...ProfileRoutes
];
