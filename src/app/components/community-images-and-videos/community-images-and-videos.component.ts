import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { CommunityImageAndVideo } from '../../models/community-image-and-video';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { AssetFile } from '../../models/asset-file';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-community-images-and-videos',
  templateUrl: './community-images-and-videos.component.html',
  styleUrls: ['./community-images-and-videos.component.scss'],
})
export class CommunityImagesAndVideosComponent implements OnInit {
  query$ = this.apollo.watchQuery<{
    community: {
      imagesAndVideos: CommunityImageAndVideo[];
    };
  }>({
    query: gql`
      query communityImagesAndVideos {
        community {
          imagesAndVideos {
            id
            dislikes
            file {
              id
              contentType
            }
            isLiked
            isDisliked
            likes
            name
          }
        }
      }
    `,
  });

  imagesAndVideos$ = this.query$.valueChanges.pipe(
    map((x) => x.data.community.imagesAndVideos)
  );

  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  constructor(
    private apollo: Apollo,
    private spinner: NgxSpinnerService,
    private assetService: AssetService
  ) {}

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

  ngOnInit(): void {}
}
