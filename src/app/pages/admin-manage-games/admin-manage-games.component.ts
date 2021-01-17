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
  allGamesQuery: QueryRef<{ getAllGames: Game[] }>;
  games: Game[] = [];
  currentPage = 1;
  isLoading = true;

  faCircleNotch = faCircleNotch;

  constructor(private apollo: Apollo, private assetService: AssetService) {
    this.allGamesQuery = this.apollo.watchQuery<{ getAllGames: Game[] }>({
      query: gql`
        query getAllGames($page: Int!) {
          getAllGames(page: $page) {
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
      this.games = data.data.getAllGames;
      this.isLoading = false;
    });
  }

  onPrevious(): void {
    if (this.currentPage > 1) {
      this.isLoading = true;
      this.currentPage--;
      this.allGamesQuery
        .refetch({ page: this.currentPage })
        .then(() => (this.isLoading = false));
    }
  }

  onNext(): void {
    this.isLoading = true;
    this.currentPage++;
    this.allGamesQuery
      .refetch({ page: this.currentPage })
      .then(() => (this.isLoading = false));
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
