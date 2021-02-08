import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile-edit-profile-background',
  templateUrl: './profile-edit-profile-background.component.html',
  styleUrls: ['./profile-edit-profile-background.component.scss'],
})
export class ProfileEditProfileBackgroundComponent implements OnInit {
  profileBackgrounds$ = this.authService
    .watch()
    .valueChanges.pipe(map((x) => x.data.auth.ownedProfileBackgrounds));

  form = this.fb.group({
    id: ['', Validators.required],
  });

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private assetService: AssetService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.spinner.show();
    this.apollo
      .mutate({
        mutation: gql`
          mutation editProfileBackground($id: ID!) {
            editProfileBackground(id: $id) {
              id
            }
          }
        `,
        variables: this.form.value,
      })
      .subscribe(async (resp) => {
        if (resp.data) {
          await this.authService.watch().refetch();
          this.spinner.hide();
        }
      });
  }
}
