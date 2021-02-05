import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  friends: User[] = [];
  currentFriend: User | null = null;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router,
    private assetService: AssetService,
    private authService: AuthService
  ) {}

  profilePicture(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  ngOnInit(): void {
    this.authService
      .fetch()
      .subscribe((resp) => (this.friends = resp.data.auth.friends));

    this.route.queryParamMap.subscribe((param) => {
      const accountName = param.get('accountName');
      if (accountName) {
        this.apollo
          .query<{ user: User }>({
            query: gql`
              query user($accountName: String!) {
                user(accountName: $accountName) {
                  id
                  accountName
                  customUrl
                  displayName
                  profilePicture {
                    id
                    contentType
                  }
                }
              }
            `,
            variables: { accountName },
          })
          .subscribe((resp) => (this.currentFriend = resp.data.user));
      }
    });
  }

  onChat(friend: User): void {
    this.router
      .navigate(['/chat'], { queryParams: { accountName: friend.accountName } })
      .then();
  }
}
