import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Game } from '../../models/game';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.scss'],
})
export class GameSearchComponent implements OnInit {
  gamesQuery = this.apollo.watchQuery<
    {
      searchGames: {
        data: Game[];
        totalPages: number;
      };
    },
    { page: number; keyword: string }
  >({
    query: gql`
      query searchGames($page: Int!, $keyword: String!) {
        searchGames(page: $page, keyword: $keyword) {
          data {
            id
            banner {
              id
            }
            createdAt
            price
            title
          }
          totalPages
        }
      }
    `,
  });

  games: Game[] = [];
  currentPage = 1;
  keyword = '';

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private assetService: AssetService,
    private spinner: NgxSpinnerService
  ) {}

  @HostListener('window:scroll')
  onScroll(): void {
    const { scrollY } = window;
    const { clientHeight, scrollHeight } = document.body;
    const position = scrollY + clientHeight;
    console.log({ position, scrollHeight });
    if (position >= scrollHeight) {
      this.spinner.show();

      this.currentPage++;
      this.gamesQuery
        .refetch({ page: this.currentPage, keyword: this.keyword })
        .then(() => this.spinner.hide());
    }
  }

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  ngOnInit(): void {
    this.spinner.show();

    this.keyword = this.route.snapshot.paramMap.get('keyword') ?? '';
    this.gamesQuery
      .setVariables({ page: this.currentPage, keyword: this.keyword })
      .then();
    this.gamesQuery.valueChanges.subscribe((resp) => {
      this.games = [...this.games, ...resp.data.searchGames.data];
      this.spinner.hide();
    });
  }
}
