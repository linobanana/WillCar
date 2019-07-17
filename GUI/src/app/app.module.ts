import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {MainModule} from './pages/main/main.module';
import {HeaderModule} from './shared/components/header/header.module';
import {FooterModule} from './shared/components/footer/footer.module';
import {AuthorizationPageModule} from './pages/authorization-page/authorization-page.module';
import {ConfirmationModule} from './shared/components/success-confirmation/success-confirmation.module';
import {BookingConfirmationModule} from './shared/components/booking-confirmation/booking-confirmation.module';
import {ProfileModule} from './pages/profile/profile.module';

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
    AuthorizationPageModule,
    ConfirmationModule,
    BookingConfirmationModule,
    FooterModule,
    ProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
