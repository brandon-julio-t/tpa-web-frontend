import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { Apollo, gql } from 'apollo-angular';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-featured-and-recommended',
  templateUrl: './home-featured-and-recommended.component.html',
  styleUrls: ['./home-featured-and-recommended.component.scss'],
})
export class HomeFeaturedAndRecommendedComponent implements OnInit {
  games: Game[] = [];
  selectedIndex = 0;

  faChevronCircleLeft = faChevronCircleLeft;
  faChevronCircleRight = faChevronCircleRight;

  constructor(private apollo: Apollo, private assetService: AssetService) {}

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  ngOnInit(): void {
    this.apollo
      .query<{ featuredAndRecommendedGames: Game[] }>({
        query: gql`
          query featuredAndRecommendedGames {
            featuredAndRecommendedGames {
              id
              title
              price
              banner {
                id
                contentType
              }
              tags {
                id
                name
              }
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
      .subscribe(
        (resp) => (this.games = resp.data.featuredAndRecommendedGames)
      );
  }

  prevCarousel(): void {
    this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
  }

  nextCarousel(): void {
    this.selectedIndex = Math.min(
      this.selectedIndex + 1,
      this.games.length - 1
    );
  }
}
