import {Routes} from '@angular/router';
import {MainRoutes} from './pages/main/main.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  ...MainRoutes
];
