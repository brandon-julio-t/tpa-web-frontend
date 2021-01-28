import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../services/auth.service';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-friends-pending-invites',
  templateUrl: './friends-pending-invites.component.html',
  styleUrls: ['./friends-pending-invites.component.scss'],
})
export class FriendsPendingInvitesComponent implements OnInit {
  @Input() ingoing: User[] = [];
  @Input() outgoing: User[] = [];
  @Output() refresh = new EventEmitter<void>();

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private assetService: AssetService
  ) {}

  ngOnInit(): void {}

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  onAccept(id: number): void {
    this.apollo
      .mutate({
        mutation: gql`
          mutation acceptFriendRequest($id: ID!) {
            acceptFriendRequest(userId: $id) {
              id
            }
          }
        `,
        variables: { id },
      })
      .subscribe(() => this.refresh.emit());
  }

  onReject(id: number): void {
    this.apollo
      .mutate({
        mutation: gql`
          mutation rejectFriendRequest($id: ID!) {
            rejectFriendRequest(userId: $id) {
              id
            }
          }
        `,
        variables: { id },
      })
      .subscribe(() => this.refresh.emit());
  }
}
