import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Game } from '../../models/game';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { GameTag } from '../../models/game-tag';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.scss'],
})
export class GameSearchComponent implements OnInit {
  games: Game[] = [];
  gameTags$ = this.apollo
    .query<{ getAllGameTags: GameTag[] }>({
      query: gql`
        query getAllGameTags {
          getAllGameTags {
            id
            name
          }
        }
      `,
    })
    .pipe(map((value) => value.data.getAllGameTags));

  selectedGameTagIds: number[] = [];
  currentPage = 1;
  keyword = '';
  price = 0;
  category = '-';

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private assetService: AssetService,
    private spinner: NgxSpinnerService
  ) {}

  get queryVariables(): Input {
    return {
      page: this.currentPage,
      keyword: this.keyword,
      category: this.category,
      genres: this.selectedGameTagIds,
      price: this.price,
    };
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const { scrollY } = window;
    const { clientHeight, scrollHeight } = document.body;
    const position = scrollY + clientHeight;
    if (position >= scrollHeight) {
      this.currentPage++;

      this.spinner.show();
      this.apollo
        .query<Output, Input>({ query, variables: this.queryVariables })
        .subscribe((resp) => {
          this.games = [...this.games, ...resp.data.searchGames.data];
          this.spinner.hide();
        });
    }
  }

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  ngOnInit(): void {
    this.spinner.show();

    this.route.queryParams.subscribe((value) => {
      this.keyword = value.keyword;
      this.onApplyFilter();
    });
  }

  onTagSelected(id: number, $event: Event): void {
    const { checked } = $event.target as HTMLInputElement;
    this.selectedGameTagIds = checked
      ? [...this.selectedGameTagIds, id]
      : this.selectedGameTagIds.filter((value) => value !== id);
    console.log(this.selectedGameTagIds);
  }

  onApplyFilter(): void {
    this.currentPage = 1;
    this.spinner.show();
    this.apollo
      .query<Output, Input>({ query, variables: this.queryVariables })
      .subscribe((resp) => {
        this.games = resp.data.searchGames.data;
        this.spinner.hide();
      });
  }
}

const query = gql`
  query searchGames(
    $page: Int!
    $keyword: String!
    $price: Int!
    $genres: [ID!]!
    $category: String!
  ) {
    searchGames(
      page: $page
      keyword: $keyword
      price: $price
      genres: $genres
      category: $category
    ) {
      data {
        id
        banner {
          id
        }
        createdAt
        price
        tags {
          name
        }
        title
      }
      totalPages
    }
  }
`;

interface Input {
  page: number;
  keyword: string;
  price: number;
  genres: number[];
  category: string;
}

interface Output {
  searchGames: {
    data: Game[];
    totalPages: number;
  };
}
