import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profile: User | null = null;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private assetService: AssetService
  ) {}

  get profilePicture(): SafeUrl {
    return this.assetService.get(this.profile?.profilePicture.id);
  }

  ngOnInit(): void {
    const customUrl = this.route.snapshot.paramMap.get('customUrl');
    if (!customUrl) {
      return;
    }

    this.apollo
      .watchQuery<{ getProfile: User }, { customUrl: string }>({
        query: gql`
          query getProfile($customUrl: String!) {
            getProfile(customUrl: $customUrl) {
              id
              accountName
              email
              walletBalance
              displayName
              realName
              customUrl
              displayName
              customUrl
              country {
                id
                name
              }
              profilePicture {
                id
                contentType
              }
            }
          }
        `,
        variables: { customUrl },
      })
      .valueChanges.subscribe((data) => {
        this.profile = data.data.getProfile;
        console.log(this.profile);
      });

    this.authService.watch().valueChanges.subscribe((data) => {
      this.user = data.data.auth;
    });
  }
}
