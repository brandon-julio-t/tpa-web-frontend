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
  selector: 'app-home-special-offers',
  templateUrl: './home-special-offers.component.html',
  styleUrls: ['./home-special-offers.component.scss'],
})
export class HomeSpecialOffersComponent implements OnInit {
  games: Game[] = [];
  currentPage = 1;
  gamesPerPage = 6;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  constructor(private apollo: Apollo, private assetService: AssetService) {}

  get paginatedGames(): Game[] {
    const offset = (this.currentPage - 1) * this.gamesPerPage;
    const games = [];

    for (let i = offset; i < this.gamesPerPage * this.currentPage; i++) {
      const g = this.games[i];
      if (g) {
        games.push(g);
      }
    }

    return games;
  }

  prev(): void {
    this.currentPage = Math.max(1, this.currentPage - 1);
  }

  next(): void {
    const totalPages = Math.ceil(this.games.length / this.gamesPerPage);
    this.currentPage = Math.min(totalPages, this.currentPage + 1);
  }

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  discounted(price: number, discount: number): number {
    return price - price * discount;
  }

  ngOnInit(): void {
    this.apollo
      .query<{ specialOffersGame: Game[] }>({
        query: gql`
          query specialOffersGame {
            specialOffersGame {
              id
              banner {
                id
              }
              discount
              price
            }
          }
        `,
      })
      .subscribe((resp) => (this.games = resp.data.specialOffersGame));
  }
}
