import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { Apollo, gql } from 'apollo-angular';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss'],
})
export class LoginAdminComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = fb.group({
      accountName: fb.control('', Validators.required),
      password: fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.authService.watch().valueChanges.subscribe((data) => {
      if (data.data.auth) {
        this.router.navigateByUrl('/admin').then();
      }
    });
  }

  onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (
      this.loginForm.invalid ||
      this.loginForm.value.accountName !== 'Admin'
    ) {
      return;
    }

    this.isLoading = true;

    this.apollo
      .mutate<{ login: User }>({
        mutation: gql`
          mutation login($accountName: String!, $password: String!) {
            login(accountName: $accountName, password: $password) {
              id
            }
          }
        `,
        variables: this.loginForm.value,
      })
      .pipe(
        catchError((err) => {
          this.isLoading = false;
          alert(err);
          throw err;
        })
      )
      .subscribe((data) => {
        if (data.data?.login) {
          this.isLoading = false;
          window.location.reload();
        }
      });
  }
}
