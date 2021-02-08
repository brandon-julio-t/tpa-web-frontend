import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { AssetService } from '../../services/asset.service';
import { AuthService } from '../../services/auth.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-edit-avatar-frame',
  templateUrl: './profile-edit-avatar-border.component.html',
  styleUrls: ['./profile-edit-avatar-border.component.scss'],
})
export class ProfileEditAvatarBorderComponent implements OnInit {
  avatarBorders$ = this.authService
    .watch()
    .valueChanges.pipe(map((x) => x.data.auth.ownedAvatarBorders));

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
          mutation editAvatarBorder($id: ID!) {
            editAvatarBorder(id: $id) {
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
