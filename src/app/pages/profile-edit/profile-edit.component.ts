import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../models/country';
import { AllCountriesService } from '../../services/all-countries.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Apollo, gql } from 'apollo-angular';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  editProfileForm: FormGroup;
  countries: Country[] = [];
  user: User | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private allCountriesService: AllCountriesService,
    private authService: AuthService
  ) {
    this.editProfileForm = fb.group({
      displayName: fb.control('', Validators.required),
      realName: fb.control(''),
      customUrl: fb.control('', Validators.required),
      countryId: fb.control('', Validators.required),
      summary: fb.control(''),
      avatar: fb.control(null),
      // avatarFrame: fb.control('', Validators.required),
      // profileBackground: fb.control('', Validators.required),
      // miniProfileBackground: fb.control('', Validators.required),
      profileTheme: fb.control('', Validators.required),
      // featuredBadge: fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.allCountriesService.watch().valueChanges.subscribe((data) => {
      this.countries = data.data.allCountries;
    });

    this.authService.watch().valueChanges.subscribe((data) => {
      this.user = data.data.auth;
      const {
        displayName,
        realName,
        customUrl,
        summary,
        country: { id },
        profileTheme,
      } = this.user;

      this.editProfileForm.setValue({
        displayName,
        realName,
        customUrl,
        summary,
        countryId: id,
        avatar: null,
        profileTheme,
      });
    });
  }

  onSubmit(): void {
    this.editProfileForm.markAllAsTouched();
    if (this.editProfileForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.apollo
      .mutate<{ updateProfile: User }>({
        mutation: gql`
          mutation updateProfile(
            $displayName: String!
            $realName: String!
            $customUrl: String!
            $summary: String!
            $countryId: ID!
            $avatar: Upload
            $profileTheme: String!
          ) {
            updateProfile(
              input: {
                displayName: $displayName
                realName: $realName
                customUrl: $customUrl
                summary: $summary
                countryId: $countryId
                avatar: $avatar
                profileTheme: $profileTheme
              }
            ) {
              id
            }
          }
        `,
        variables: this.editProfileForm.value,
      })
      .pipe(
        catchError((err) => {
          this.isLoading = false;
          alert(err);
          throw err;
        })
      )
      .subscribe((data) => {
        if (data.data?.updateProfile) {
          window.location.reload();
        }
      });
  }

  onAvatarChange(target: EventTarget | null): void {
    const file = (target as HTMLInputElement).files?.item(0);
    this.editProfileForm.controls.avatar.setValue(file);
  }
}
