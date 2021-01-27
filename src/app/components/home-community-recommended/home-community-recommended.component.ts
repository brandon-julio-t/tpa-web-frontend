import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Game } from '../../models/game';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-community-recommended',
  templateUrl: './home-community-recommended.component.html',
  styleUrls: ['./home-community-recommended.component.scss'],
})
export class HomeCommunityRecommendedComponent implements OnInit {
  games: Game[] = [];

  selectedGameIndex = 0;
  isHover = false;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  constructor(private apollo: Apollo, private assetService: AssetService) {}

  get game(): Game | undefined {
    return this.games[this.selectedGameIndex];
  }

  asset(id: number | undefined): SafeUrl {
    return this.assetService.get(id);
  }

  video(game: Game | undefined): SafeUrl | undefined {
    if (!game) {
      return game;
    }

    const slideshow = game.slideshows.find((s) =>
      s.file.contentType.includes('video')
    );
    if (!slideshow) {
      return slideshow;
    }

    return this.asset(slideshow.file.id);
  }

  ngOnInit(): void {
    this.apollo
      .query<{ communityRecommended: Game[] }>({
        query: gql`
          query communityRecommended {
            communityRecommended {
              id
              banner {
                id
              }
              discount
              mostHelpfulReviews {
                id
                content
                user {
                  displayName
                  profilePicture {
                    id
                  }
                }
              }
              price
              slideshows {
                file {
                  id
                  contentType
                }
              }
            }
          }
        `,
      })
      .subscribe((resp) => (this.games = resp.data.communityRecommended));
  }

  prev(): void {
    this.selectedGameIndex = Math.max(0, this.selectedGameIndex - 1);
  }

  next(): void {
    this.selectedGameIndex = Math.min(
      this.games.length - 1,
      this.selectedGameIndex + 1
    );
  }
}
