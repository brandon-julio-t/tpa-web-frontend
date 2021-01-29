import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormBuilder, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-friends-add',
  templateUrl: './friends-add.component.html',
  styleUrls: ['./friends-add.component.scss'],
})
export class FriendsAddComponent implements OnInit {
  @Input() user: User | undefined;

  searchedUser: User | undefined;

  form = this.fb.group({
    code: ['', Validators.required],
  });

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private assetService: AssetService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  asset(id: number | undefined): SafeUrl {
    return this.assetService.get(id);
  }

  onSearch(): void {
    if (this.form.invalid) {
      return;
    }

    this.apollo
      .query<{ userByFriendCode: User }>({
        query: gql`
          query userByFriendCode($code: String!) {
            userByFriendCode(code: $code) {
              id
              customUrl
              displayName
              profilePicture {
                id
              }
              summary
            }
          }
        `,
        variables: this.form.value,
      })
      .subscribe((resp) => (this.searchedUser = resp.data.userByFriendCode));
  }

  onSendInvite(id: number | undefined): void {
    console.log(id);
    if (!id) {
      return;
    }

    this.spinner.show();

    this.apollo
      .mutate<{ sendFriendRequest: User }>({
        mutation: gql`
          mutation sendFriendRequest($id: ID!) {
            sendFriendRequest(userId: $id) {
              id
            }
          }
        `,
        variables: { id },
      })
      .subscribe((resp) => {
        if (resp.data?.sendFriendRequest) {
          this.spinner.hide();
        }
      });
  }
}
