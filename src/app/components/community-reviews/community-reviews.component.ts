import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { GameReview } from '../../models/game-review';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-community-reviews',
  templateUrl: './community-reviews.component.html',
  styleUrls: ['./community-reviews.component.scss'],
})
export class CommunityReviewsComponent implements OnInit {
  query$ = this.apollo.watchQuery<Query>({ query: GQL_QUERY });
  reviews$ = this.query$.valueChanges.pipe(
    map((x) => x.data.community.reviews)
  );

  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  constructor(private apollo: Apollo, private assetService: AssetService) {}

  ngOnInit(): void {}

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }
}

interface Query {
  community: {
    reviews: GameReview[];
  };
}

const GQL_QUERY = gql`
  query communityReviews {
    community {
      reviews {
        id
        content
        createdAt
        game {
          banner {
            id
          }
        }
        isRecommended
        upVotes
      }
    }
  }
`;
