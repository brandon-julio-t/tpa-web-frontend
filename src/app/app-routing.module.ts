import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';

const routes: Routes = [
  {
    path: '',
    children: [],
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
    children: [{ path: 'login', component: LoginAdminComponent }],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
