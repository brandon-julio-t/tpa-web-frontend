import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormBuilder, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';

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
    private assetService: AssetService
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
    if (!id) {
      return;
    }
  }

  canAdd(id: number | undefined): boolean {
    if (!id) {
      return false;
    }

    return (
      (this.user?.id === id ||
        this.user?.friends.some((u) => u.id === id) ||
        this.user?.ingoingFriendRequests.some((u) => u.id === id) ||
        this.user?.outgoingFriendRequests.some((u) => u.id === id)) ??
      false
    );
  }
}
