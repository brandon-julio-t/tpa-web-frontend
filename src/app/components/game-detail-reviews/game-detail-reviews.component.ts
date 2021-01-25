import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameReview } from '../../models/game-review';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-game-detail-reviews',
  templateUrl: './game-detail-reviews.component.html',
  styleUrls: ['./game-detail-reviews.component.scss'],
})
export class GameDetailReviewsComponent implements OnInit {
  @Input() mostHelpfulReviews: GameReview[] | undefined = [];
  @Input() recentReviews: GameReview[] | undefined = [];
  @Output() vote = new EventEmitter<boolean>();

  user: User | null = null;

  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  constructor(
    private apollo: Apollo,
    private assetService: AssetService,
    private authService: AuthService
  ) {}

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  ngOnInit(): void {
    this.authService
      .watch()
      .valueChanges.subscribe((resp) => (this.user = resp.data.auth));
  }

  hasUpVoted(review: GameReview): boolean {
    return review.upVoters.some((v) => v.id === this.user?.id);
  }

  hasDownVoted(review: GameReview): boolean {
    return review.downVoters.some((v) => v.id === this.user?.id);
  }

  upVote(id: number): void {
    this.apollo
      .mutate<{ upVoteReview: { id: number } }>({
        mutation: gql`
          mutation upVoteReview($id: ID!) {
            upVoteReview(id: $id) {
              id
            }
          }
        `,
        variables: { id },
      })
      .subscribe((resp) => {
        const upVotedId = resp.data?.upVoteReview.id;
        if (upVotedId) {
          this.vote.emit();
        }
      });
  }

  downVote(id: number): void {
    this.apollo
      .mutate<{ downVoteReview: { id: number } }>({
        mutation: gql`
          mutation downVoteReview($id: ID!) {
            downVoteReview(id: $id) {
              id
            }
          }
        `,
        variables: { id },
      })
      .subscribe((resp) => {
        const upVotedId = resp.data?.downVoteReview.id;
        if (upVotedId) {
          this.vote.emit();
        }
      });
  }
}
