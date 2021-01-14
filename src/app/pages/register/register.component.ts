import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  email = '';
  countryId = 0;
  isOTPSent = false;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.watch().valueChanges.subscribe((data) => {
      if (data.data.auth) {
        this.router.navigateByUrl('/').then();
      }
    });
  }

  changeStateToAcceptOTP(data: { email: string; countryId: number }): void {
    this.isOTPSent = true;
    this.email = data.email;
    this.countryId = data.countryId;
  }

  doRegistration(data: { accountName: string; password: string }): void {
    const accountData = {
      email: this.email,
      countryId: this.countryId,
      ...data,
    };

    this.apollo
      .mutate<{ register: User }>({
        mutation: gql`
          mutation register(
            $accountName: String!
            $email: String!
            $password: String!
            $countryId: ID!
          ) {
            register(
              accountName: $accountName
              email: $email
              password: $password
              countryId: $countryId
            ) {
              id
            }
          }
        `,
        variables: accountData,
      })
      .subscribe((res) => {
        if (res.data?.register.id) {
          this.router.navigateByUrl('/').then();
        }
      });
  }
}
