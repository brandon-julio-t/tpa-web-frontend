import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { AssetService } from '../../services/asset.service';
import { AuthService } from '../../services/auth.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-edit-mini-profile-background',
  templateUrl: './profile-edit-mini-profile-background.component.html',
  styleUrls: ['./profile-edit-mini-profile-background.component.scss'],
})
export class ProfileEditMiniProfileBackgroundComponent implements OnInit {
  miniProfileBackgrounds$ = this.authService
    .watch()
    .valueChanges.pipe(map((x) => x.data.auth.ownedMiniProfileBackgrounds));

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
          mutation editMiniProfileBackground($id: ID!) {
            editMiniProfileBackground(id: $id) {
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
