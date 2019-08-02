import {Routes} from '@angular/router';
import {MainRoutes} from './pages/main/main.routes';
import {MyBookingsRoutes} from "./pages/personal-area/my-bookings/my-bookings.routes";
import {MyProposedRoutes} from "./pages/personal-area/my-proposed/my-proposed.routes";
import {SuccessConfirmationRoutes} from "./shared/components/success-confirmation/success-confirmation.routes";
import {BookingConfirmationRoutes} from './shared/components/booking-confirmation/booking-confirmation.routes';
import {MainEditRoutes} from './pages/main-edit/main-edit.routes';
import {ChatRoutes} from "./pages/personal-area/chat/chat.routes";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  ...MainRoutes,
  ...MyBookingsRoutes,
  ...MyProposedRoutes,
  ...SuccessConfirmationRoutes,
  ...BookingConfirmationRoutes,
  ...MainEditRoutes,
  ...ChatRoutes
];
