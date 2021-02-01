import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameReview } from '../../models/game-review';
import { Apollo, gql } from 'apollo-angular';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-community-review-detail',
  templateUrl: './community-review-detail.component.html',
  styleUrls: ['./community-review-detail.component.scss'],
})
export class CommunityReviewDetailComponent implements OnInit {
  query$ = this.apollo.watchQuery<Query, Variables>({ query: GQL_QUERY });

  review$ = this.query$.valueChanges.pipe(
    map((x) => x.data.community.review),
    catchError((err) => {
      console.error(err);
      return of(null);
    })
  );

  currentPage = 1;
  reviewId = 0;
  faThumbsDown = faThumbsDown;
  faThumbsUp = faThumbsUp;

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
        this.reviewId = +id;

        this.spinner.show();
        await this.query$.refetch({
          id: +id,
          page: this.currentPage,
        });
        this.spinner.hide();
        this.review$.subscribe(console.log);
      }
    });
  }

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  async next(): Promise<void> {
    this.currentPage++;
    this.spinner.show();
    await this.query$.refetch({
      id: this.reviewId,
      page: this.currentPage,
    });
    this.spinner.hide();
  }

  async prev(): Promise<void> {
    this.currentPage--;
    this.spinner.show();
    await this.query$.refetch({
      id: this.reviewId,
      page: this.currentPage,
    });
    this.spinner.hide();
  }
}

interface Query {
  community: {
    review: GameReview;
  };
}

interface Variables {
  id: number;
  page: number;
}

const GQL_QUERY = gql`
  query communityReview($id: ID!, $page: Int!) {
    community {
      review(id: $id) {
        content
        comment(page: $page) {
          data {
            body
            createdAt
            user {
              displayName
              profilePicture {
                id
              }
            }
          }
          totalPages
        }
        game {
          id
          banner {
            id
          }
          title
        }
        isRecommended
        user {
          displayName
          profilePicture {
            id
          }
        }
      }
    }
  }
`;
