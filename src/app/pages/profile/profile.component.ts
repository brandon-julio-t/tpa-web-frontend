import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AssetService } from '../../services/asset.service';
import { ProfileComment } from '../../models/profile-comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profile: User | null = null;
  comments: ProfileComment[] = [];
  commentsQuery: QueryRef<{ profileComments: ProfileComment[] }>;
  profileCommentForm: FormGroup;
  isLoading = false;

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private assetService: AssetService
  ) {
    this.commentsQuery = this.apollo.watchQuery<{
      profileComments: ProfileComment[];
    }>({
      query: gql`
        query profileComments($profileId: ID!) {
          profileComments(profileId: $profileId) {
            id
            user {
              id
              displayName
              profilePicture {
                id
              }
            }
            comment
            createdAt
          }
        }
      `,
    });

    this.profileCommentForm = fb.group({
      comment: fb.control('', Validators.required),
    });
  }

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
        this.commentsQuery
          .refetch({ profileId: this.profile.id })
          .then((resp) => {
            this.comments = resp.data.profileComments;
            console.log(this.comments);
          });
      });

    this.authService.watch().valueChanges.subscribe((data) => {
      this.user = data.data.auth;
    });
  }

  getProfilePicture(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  onSubmit(): void {
    this.profileCommentForm.markAllAsTouched();
    if (this.profileCommentForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.apollo
      .mutate<{ createProfileComment: ProfileComment }>({
        mutation: gql`
          mutation createProfileComment($profileId: ID!, $comment: String!) {
            createProfileComment(profileId: $profileId, comment: $comment) {
              id
              user {
                id
                displayName
                profilePicture {
                  id
                }
              }
              comment
              createdAt
            }
          }
        `,
        variables: {
          profileId: this.profile?.id,
          ...this.profileCommentForm.value,
        },
      })
      .subscribe((resp) => {
        const created = resp.data?.createProfileComment;
        if (created) {
          this.comments = [created, ...this.comments];
          this.isLoading = false;
          this.profileCommentForm.reset();
        }
      });
  }

  onDelete(id: number): void {
    console.log(id);
    this.isLoading = true;
    this.apollo
      .mutate<{ deleteProfileComment: ProfileComment }>({
        mutation: gql`
          mutation deleteProfileComment($id: ID!) {
            deleteProfileComment(id: $id) {
              id
            }
          }
        `,
        variables: { id },
      })
      .subscribe((resp) => {
        const deletedId = resp.data?.deleteProfileComment.id;
        if (deletedId) {
          this.comments = this.comments.filter(
            (comment) => comment.id !== deletedId
          );
          this.isLoading = false;
        }
      });
  }
}
