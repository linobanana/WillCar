import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {MainModule} from './pages/main/main.module';
import {HeaderModule} from './shared/components/header/header.module';
import {FooterModule} from './shared/components/footer/footer.module';
import {ConfirmationModule} from './shared/components/success-confirmation/success-confirmation.module';
import {BookingConfirmationModule} from './shared/components/booking-confirmation/booking-confirmation.module';
import {MyBookingsModule} from './pages/personal-area/my-bookings/my-bookings.module';
import {MyProposedModule} from './pages/personal-area/my-proposed/my-proposed.module';
import {ProfileModule} from './pages/personal-area/profile/profile.module';
import {ProfileMenuModule} from './shared/components/profile-menu/profile-menu.module';
import {PersonalAreaModule} from './pages/personal-area/personal-area.module';
import {ApiService} from "./shared/services/api.service";
import {ChatModule} from "./pages/personal-area/chat/chat.module";
import {ToastrModule} from "ngx-toastr";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminModule} from './pages/personal-area/admin-tab/admin.module';
import {SuccessfulCreateRouteModule} from './shared/components/succesful-create-route/successful-create-route.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true}),
    MainModule,
    HeaderModule,
    FooterModule,
    ConfirmationModule,
    BookingConfirmationModule,
    FooterModule,
    ProfileModule,
    ProfileMenuModule,
    MyBookingsModule,
    MyProposedModule,
    PersonalAreaModule,
    AdminModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    ChatModule,
    SuccessfulCreateRouteModule,
    ToastrModule.forRoot()
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
