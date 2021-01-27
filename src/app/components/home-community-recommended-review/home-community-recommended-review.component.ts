import { Component, Input, OnInit } from '@angular/core';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { GameReview } from '../../models/game-review';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home-community-recommended-review',
  templateUrl: './home-community-recommended-review.component.html',
  styleUrls: ['./home-community-recommended-review.component.scss'],
})
export class HomeCommunityRecommendedReviewComponent implements OnInit {
  @Input() reviews: GameReview[] | undefined = [];

  selectedReviewIndex = 0;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  constructor(private assetService: AssetService) {}

  get totalReviews(): number {
    return this.reviews?.length ?? 1;
  }

  get review(): GameReview | undefined {
    if (!this.reviews) {
      return this.reviews;
    }
    return this.reviews[this.selectedReviewIndex];
  }

  asset(id: number | undefined): SafeUrl {
    return this.assetService.get(id);
  }

  ngOnInit(): void {}

  next(): void {
    console.log(this.selectedReviewIndex);
    this.selectedReviewIndex = Math.min(
      this.totalReviews - 1,
      this.selectedReviewIndex + 1
    );
  }

  prev(): void {
    console.log(this.selectedReviewIndex);
    this.selectedReviewIndex = Math.max(0, this.selectedReviewIndex - 1);
  }
}
