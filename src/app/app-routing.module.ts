import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminManageGamesComponent } from './pages/admin-manage-games/admin-manage-games.component';
import { AdminManagePromoAndDiscountComponent } from './pages/admin-manage-promo-and-discount/admin-manage-promo-and-discount.component';
import { AdminManageUsersComponent } from './pages/admin-manage-users/admin-manage-users.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminViewReportsComponent } from './pages/admin-view-reports/admin-view-reports.component';
import { UnsuspendRequestComponent } from './pages/unsuspend-request/unsuspend-request.component';
import { AdminManageUnsuspendRequestsComponent } from './pages/admin-manage-unsuspend-requests/admin-manage-unsuspend-requests.component';
import { AdminGamesCreateComponent } from './pages/admin-games-create/admin-games-create.component';

const routes: Routes = [
  {
    path: '',
    children: [],
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    children: [
      { path: ':customUrl', component: ProfileComponent },
      {
        path: 'edit/:customUrl',
        component: ProfileEditComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'admin',
    children: [
      { path: 'login', component: LoginAdminComponent },
      {
        path: '',
        children: [
          { path: '', component: AdminComponent },
          {
            path: 'games',
            children: [
              { path: '', component: AdminManageGamesComponent },
              { path: 'create', component: AdminGamesCreateComponent },
            ],
          },
          {
            path: 'promo-and-discount',
            component: AdminManagePromoAndDiscountComponent,
          },
          {
            path: 'users',
            children: [
              { path: '', component: AdminManageUsersComponent },
              { path: 'reports/:id', component: AdminViewReportsComponent },
              {
                path: 'unsuspend-requests',
                component: AdminManageUnsuspendRequestsComponent,
              },
            ],
          },
        ],
        canActivate: [AdminGuard],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unsuspend-request', component: UnsuspendRequestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
