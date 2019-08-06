import {Routes} from '@angular/router';
import {MainRoutes} from './pages/main/main.routes';
import {AuthorizationRoutes} from "./pages/authorization-page/authorization-page.routes";
import {MyBookingsRoutes} from "./pages/personal-area/my-bookings/my-bookings.routes";
import {MyProposedRoutes} from "./pages/personal-area/my-proposed/my-proposed.routes";
import {SuccessConfirmationRoutes} from "./shared/components/success-confirmation/success-confirmation.routes";
import {BookingConfirmationRoutes} from './shared/components/booking-confirmation/booking-confirmation.routes';
import {ChatRoutes} from "./pages/personal-area/chat/chat.routes";
import {DetailsOfRouteRoutes} from "./pages/personal-area/details-of-route/details-of-route.routes";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'authorization',
    pathMatch: 'full'
  },
  ...MainRoutes,
  ...AuthorizationRoutes,
  ...MyBookingsRoutes,
  ...MyProposedRoutes,
  ...SuccessConfirmationRoutes,
  ...BookingConfirmationRoutes,
  ...ChatRoutes
  ...DetailsOfRouteRoutes
];
