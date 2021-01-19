import { Component, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Game } from '../../models/game';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-manage-game',
  templateUrl: './admin-manage-games.component.html',
  styleUrls: ['./admin-manage-games.component.scss'],
})
export class AdminManageGamesComponent implements OnInit {
  allGamesQuery: QueryRef<{
    games: {
      data: Game[];
      totalPages: number;
    };
  }>;
  games: Game[] = [];
  currentPage = 1;
  totalPages = 0;
  isLoading = true;

  faCircleNotch = faCircleNotch;

  constructor(private apollo: Apollo, private assetService: AssetService) {
    this.allGamesQuery = this.apollo.watchQuery<{
      games: {
        data: Game[];
        totalPages: number;
      };
    }>({
      query: gql`
        query games($page: Int!) {
          games(page: $page) {
            data {
              id
              createdAt
              title
              description
              price
              banner {
                id
                contentType
              }
              slideshows {
                file {
                  id
                  contentType
                }
              }
              tags {
                id
                name
              }
              systemRequirements
            }
            totalPages
          }
        }
      `,
      variables: { page: this.currentPage },
    });
  }

  asset(id: number | undefined): SafeUrl {
    return this.assetService.get(id);
  }

  ngOnInit(): void {
    this.allGamesQuery.valueChanges.subscribe((data) => {
      console.log(data.data);
      this.games = data.data.games.data;
      this.totalPages = data.data.games.totalPages;
      this.isLoading = false;
    });
  }

  onPrevious(): void {
    if (this.currentPage > 1) {
      this.isLoading = true;
      this.currentPage--;
      this.allGamesQuery.refetch({ page: this.currentPage }).then();
    }
  }

  onNext(): void {
    if (this.currentPage < this.totalPages) {
      this.isLoading = true;
      this.currentPage++;
      this.allGamesQuery.refetch({ page: this.currentPage }).then();
    }
  }

  onDelete(id: number): void {
    this.isLoading = true;

    this.apollo
      .mutate<{ deleteGame: Game }>({
        mutation: gql`
          mutation deleteGame($id: ID!) {
            deleteGame(id: $id) {
              id
            }
          }
        `,
        variables: { id },
      })
      .subscribe((resp) => {
        if (resp.data?.deleteGame) {
          this.games = this.games.filter((game) => game.id !== id);
          this.isLoading = false;
        }
      });
  }

  onRefresh(): void {
    this.allGamesQuery.refetch().then();
  }
}
