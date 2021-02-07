import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
      rememberMe: [false],
    });
  }

  ngOnInit(): void {
    this.authService.watch().valueChanges.subscribe((data) => {
      if (data.data.auth) {
        this.router.navigateByUrl('/').then();
      }
    });
  }

  onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (
      this.loginForm.invalid ||
      this.loginForm.value.accountName === 'Admin'
    ) {
      return;
    }

    this.isLoading = true;

    this.apollo
      .mutate<{ login: User }>({
        mutation: gql`
          mutation login(
            $accountName: String!
            $password: String!
            $rememberMe: Boolean!
          ) {
            login(
              accountName: $accountName
              password: $password
              rememberMe: $rememberMe
            ) {
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
