import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../models/country';
import { Apollo, gql } from 'apollo-angular';
import { AllCountriesService } from '../../services/all-countries.service';
import { catchError } from 'rxjs/operators';

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
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private allCountriesService: AllCountriesService
  ) {
    this.registerForm = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      emailConfirm: fb.control('', [Validators.required, Validators.email]),
      countryId: fb.control('', Validators.required),
      agree: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {
    this.allCountriesService.watch().valueChanges.subscribe((data) => {
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

    this.isLoading = true;

    this.apollo
      .mutate<{ sendOTP: boolean }>({
        mutation: gql`
          mutation sendOTP($email: String!) {
            sendOTP(email: $email)
          }
        `,
        variables: { email },
      })
      .pipe(
        catchError((err) => {
          this.isLoading = false;
          alert(err);
          throw err;
        })
      )
      .subscribe((data) => {
        if (data.data?.sendOTP) {
          this.isLoading = false;
          this.done.emit({ email, countryId });
        }
      });
  }
}
