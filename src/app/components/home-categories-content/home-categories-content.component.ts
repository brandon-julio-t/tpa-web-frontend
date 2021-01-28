import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { Apollo, gql } from 'apollo-angular';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { GameSlideshow } from '../../models/game-slideshow';

@Component({
  selector: 'app-home-categories-content',
  templateUrl: './home-categories-content.component.html',
  styleUrls: ['./home-categories-content.component.scss'],
})
export class HomeCategoriesContentComponent implements OnInit {
  @Input() idx = 0;

  topSellers: Game[] = [];
  specials: Game[] = [];
  newAndTrending: Game[] = [];

  selected = 0;

  constructor(private apollo: Apollo, private assetService: AssetService) {}

  get games(): Game[] {
    switch (this.idx) {
      case 0:
        return this.newAndTrending;
      case 1:
        return this.topSellers;
      case 2:
        return this.specials;
    }
    return [];
  }

  get game(): Game | undefined {
    if (!this.games) {
      return this.games;
    }
    return this.games[this.selected];
  }

  slideshowImages(slideshows: GameSlideshow[] | undefined): GameSlideshow[] {
    return (slideshows ?? []).filter(
      (s) => !s.file.contentType.includes('video')
    );
  }

  isActive(idx: number): boolean {
    return this.selected === idx;
  }

  discountedPrice(price: number, discount: number): number {
    return price - price * discount;
  }

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  ngOnInit(): void {
    this.apollo
      .query<{
        topSellers: Game[];
        specials: Game[];
        newAndTrending: Game[];
      }>({
        query: gql`
          query gameCategories {
            topSellers {
              id
              banner {
                id
              }
              discount
              price
              slideshows {
                file {
                  id
                  contentType
                }
              }
              tags {
                name
              }
              title
            }

            specials {
              id
              banner {
                id
              }
              discount
              price
              slideshows {
                file {
                  id
                  contentType
                }
              }
              tags {
                name
              }
              title
            }

            newAndTrending {
              id
              banner {
                id
              }
              discount
              price
              slideshows {
                file {
                  id
                  contentType
                }
              }
              tags {
                name
              }
              title
            }
          }
        `,
      })
      .subscribe((resp) => {
        const { topSellers, specials, newAndTrending } = resp.data;
        this.topSellers = topSellers;
        this.specials = specials;
        this.newAndTrending = newAndTrending;
      });
  }
}
