import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RegisterPhaseOneComponent } from './components/register-phase-one/register-phase-one.component';
import { RegisterPhaseTwoComponent } from './components/register-phase-two/register-phase-two.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminManageGamesComponent } from './pages/admin-manage-games/admin-manage-games.component';
import { AdminManagePromoAndDiscountComponent } from './pages/admin-manage-promo-and-discount/admin-manage-promo-and-discount.component';
import { AdminManageUsersComponent } from './pages/admin-manage-users/admin-manage-users.component';
import { AdminViewReportsComponent } from './pages/admin-view-reports/admin-view-reports.component';
import { UnsuspendRequestComponent } from './pages/unsuspend-request/unsuspend-request.component';
import { AdminManageUnsuspendRequestsComponent } from './pages/admin-manage-unsuspend-requests/admin-manage-unsuspend-requests.component';
import { AdminGamesCreateComponent } from './pages/admin-games-create/admin-games-create.component';
import { AdminGamesUpdateComponent } from './pages/admin-games-update/admin-games-update.component';
import { AdminPromosCreateComponent } from './pages/admin-promos-create/admin-promos-create.component';
import { AdminPromosUpdateComponent } from './pages/admin-promos-update/admin-promos-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    RegisterPhaseOneComponent,
    RegisterPhaseTwoComponent,
    ProfileComponent,
    ProfileEditComponent,
    SubmitButtonComponent,
    LoginAdminComponent,
    AdminComponent,
    AdminManageGamesComponent,
    AdminManagePromoAndDiscountComponent,
    AdminManageUsersComponent,
    AdminViewReportsComponent,
    UnsuspendRequestComponent,
    AdminManageUnsuspendRequestsComponent,
    AdminGamesCreateComponent,
    AdminGamesUpdateComponent,
    AdminPromosCreateComponent,
    AdminPromosUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    ReactiveFormsModule,
    RecaptchaModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
