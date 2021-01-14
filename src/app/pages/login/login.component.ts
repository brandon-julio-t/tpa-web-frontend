import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

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
        this.router.navigateByUrl('/').then();
      }
    });
  }

  onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    this.apollo
      .mutate<{ login: User }>({
        mutation: gql`
          mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              id
            }
          }
        `,
        variables: {
          email: this.loginForm.value.accountName,
          password: this.loginForm.value.password,
        },
      })
      .subscribe((data) => {
        if (data.data?.login) {
          window.location.reload();
        }
      });
  }
}
