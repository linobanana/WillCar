import {Routes} from '@angular/router';
import {MainRoutes} from './pages/main/main.routes';
import {ProfileRoutes} from './pages/profile/profile.routes';
import {AuthorizationRoutes} from "./pages/authorization-page/authorization-page.routes";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'authorization',
    pathMatch: 'full'
  },
  ...MainRoutes,
  ...ProfileRoutes,
  ...AuthorizationRoutes
];
