import {Routes} from '@angular/router';
import {LeftMenuComponent} from './pages/main/left-menu/left-menu.component';
import {MainRoutes} from './pages/main/main.routes';

export const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  ...MainRoutes,
  { path: 'LM', component: LeftMenuComponent }
];
