import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../models/country';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-register-phase-one',
  templateUrl: './register-phase-one.component.html',
  styleUrls: ['./register-phase-one.component.scss'],
})
export class RegisterPhaseOneComponent implements OnInit {
  @Output() done = new EventEmitter<{ email: string; countryId: number }>();

  registerForm: FormGroup;
  countries: Country[] = [];
  isCaptchaPassed = false;

  constructor(private fb: FormBuilder, private apollo: Apollo) {
    this.registerForm = fb.group({
      email: fb.control('', Validators.required),
      emailConfirm: fb.control('', Validators.required),
      countryId: fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery<{ allCountries: Country[] }>({
        query: gql`
          query allCountries {
            allCountries {
              id
              name
            }
          }
        `,
      })
      .valueChanges.subscribe((data) => {
        this.countries = data.data.allCountries;
      });
  }

  onSubmit(): void {
    const { email, emailConfirm, countryId } = this.registerForm.value;

    this.registerForm.markAllAsTouched();
    if (
      this.registerForm.invalid ||
      !this.isCaptchaPassed ||
      email !== emailConfirm
    ) {
      return;
    }

    this.apollo
      .mutate<{ sendOTP: boolean }>({
        mutation: gql`
          mutation sendOTP($email: String!) {
            sendOTP(email: $email)
          }
        `,
        variables: { email },
      })
      .subscribe((data) => {
        if (data.data?.sendOTP) {
          this.done.emit({ email, countryId });
        }
      });
  }
}
