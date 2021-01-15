import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
    private authService: AuthService
  ) {}

  get profilePicture(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(
      `data:image/png;base64, ${this.profile?.profilePictureBase64}`
    );
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
              profilePictureBase64
            }
          }
        `,
        variables: { customUrl },
      })
      .valueChanges.subscribe((data) => {
        this.profile = data.data.getProfile;
      });

    this.authService.watch().valueChanges.subscribe((data) => {
      this.user = data.data.auth;
    });
  }
}
