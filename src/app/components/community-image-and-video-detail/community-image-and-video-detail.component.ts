import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { AssetFile } from '../../models/asset-file';
import { catchError, map } from 'rxjs/operators';
import { CommunityImageAndVideo } from '../../models/community-image-and-video';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { CommunityImageAndVideoComment } from '../../models/community-image-and-video-comment';

@Component({
  selector: 'app-community-image-and-video-detail',
  templateUrl: './community-image-and-video-detail.component.html',
  styleUrls: ['./community-image-and-video-detail.component.scss'],
})
export class CommunityImageAndVideoDetailComponent implements OnInit {
  query$ = this.apollo.watchQuery<
    {
      community: {
        imageAndVideo: CommunityImageAndVideo;
      };
    } | null,
    {
      id: number;
      page: number;
    }
  >({
    query: gql`
      query communityImageAndVideo($id: ID!, $page: Int!) {
        community {
          imageAndVideo(id: $id) {
            id
            user {
              displayName
              profilePicture {
                id
              }
            }
            comments(page: $page) {
              data {
                id
                body
                createdAt
                user {
                  id
                  displayName
                  profilePicture {
                    id
                  }
                }
              }
              totalPages
            }
            description
            file {
              id
              contentType
            }
            isDisliked
            isLiked
            name
            likes
          }
        }
      }
    `,
  });

  imageAndVideo$ = this.query$.valueChanges.pipe(
    map((x) => x.data?.community.imageAndVideo),
    catchError((err) => {
      console.error(err);
      return of(null);
    })
  );

  currentPage = 1;
  commentBody = '';
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private assetService: AssetService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (param) => {
      const id = param.get('id');
      if (id) {
        this.spinner.show();
        await this.query$.setVariables({
          id: +id,
          page: this.currentPage,
        });
        await this.query$.refetch();
        this.spinner.hide();
      }
    });
  }

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  isImage(file: AssetFile): boolean {
    return this.assetService.isImage(file);
  }

  isVideo(file: AssetFile): boolean {
    return this.assetService.isVideo(file);
  }

  like(id: number): void {
    this.spinner.show();
    this.apollo
      .mutate<{ likeCreateCommunityImagesAndVideos: CommunityImageAndVideo[] }>(
        {
          mutation: gql`
            mutation likeCreateCommunityImagesAndVideos($imageAndVideoId: ID!) {
              likeCreateCommunityImagesAndVideos(
                imageAndVideoId: $imageAndVideoId
              ) {
                id
              }
            }
          `,
          variables: { imageAndVideoId: id },
        }
      )
      .subscribe(async (resp) => {
        if (resp.data) {
          await this.query$.refetch();
          this.spinner.hide();
        }
      });
  }

  dislike(id: number): void {
    this.spinner.show();
    this.apollo
      .mutate<{ likeCreateCommunityImagesAndVideos: CommunityImageAndVideo[] }>(
        {
          mutation: gql`
            mutation dislikeCreateCommunityImagesAndVideos(
              $imageAndVideoId: ID!
            ) {
              dislikeCreateCommunityImagesAndVideos(
                imageAndVideoId: $imageAndVideoId
              ) {
                id
              }
            }
          `,
          variables: { imageAndVideoId: id },
        }
      )
      .subscribe(async (resp) => {
        if (resp.data) {
          await this.query$.refetch();
          this.spinner.hide();
        }
      });
  }

  async prev(): Promise<void> {
    this.route.paramMap.subscribe(async (param) => {
      const id = param.get('id');
      if (id) {
        this.spinner.show();

        this.currentPage--;
        await this.query$.setVariables({
          id: +id,
          page: this.currentPage,
        });
        await this.query$.refetch();

        this.spinner.hide();
      }
    });
  }

  async next(): Promise<void> {
    this.route.paramMap.subscribe(async (param) => {
      const id = param.get('id');
      if (id) {
        this.spinner.show();

        this.currentPage++;
        await this.query$.setVariables({
          id: +id,
          page: this.currentPage,
        });
        await this.query$.refetch();

        this.spinner.hide();
      }
    });
  }

  onSubmitComment(): void {
    this.route.paramMap.subscribe(async (param) => {
      const id = param.get('id');

      if (!this.commentBody || !id) {
        return;
      }

      this.spinner.show();
      this.apollo
        .mutate<{
          postCommunityImagesAndVideosComment: CommunityImageAndVideoComment;
        }>({
          mutation: gql`
            mutation postCommunityImagesAndVideosComment(
              $imageAndVideoId: ID!
              $body: String!
            ) {
              postCommunityImagesAndVideosComment(
                imageAndVideoId: $imageAndVideoId
                body: $body
              ) {
                id
                body
                createdAt
                user {
                  id
                  displayName
                  profilePicture {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            imageAndVideoId: +id,
            body: this.commentBody,
          },
        })
        .subscribe(async (resp) => {
          if (resp.data) {
            await this.query$.refetch();
            this.spinner.hide();
          }
        });
    });
  }
}
