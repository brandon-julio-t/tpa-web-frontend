import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Game } from '../../models/game';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { GameSlideshow } from '../../models/game-slideshow';
import { AssetFile } from '../../models/asset-file';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit {
  game: Game | null = null;
  birthdate: Date | null = null;
  hasInputAge = false;
  currentAssetFile: AssetFile | null = null;
  user: User | null = null;
  isLoading = false;
  gameQuery: QueryRef<{ getGameById: Game }>;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private assetService: AssetService,
    private authService: AuthService
  ) {
    this.gameQuery = this.apollo.watchQuery<{ getGameById: Game }>({
      query: gql`
        query getGameById($id: ID!) {
          getGameById(id: $id) {
            id
            banner {
              id
              contentType
            }
            createdAt
            description
            discount
            genre {
              id
              name
            }
            isInappropriate
            price
            slideshows {
              file {
                id
                contentType
              }
            }
            systemRequirements
            tags {
              id
              name
            }
            title
            isInCart
            isInWishlist
          }
        }
      `,
    });
  }

  get slideshows(): GameSlideshow[] {
    const source = this.game?.slideshows ?? [];
    const slideshows = [...source];
    return slideshows.sort((a, _) => {
      if (a.file.contentType.includes('video')) {
        return -1;
      }

      return 0;
    });
  }

  isVideo(file: AssetFile | null): boolean {
    if (!file) {
      return false;
    }
    return this.assetService.isVideo(file);
  }

  isImage(file: AssetFile | null): boolean {
    if (!file) {
      return false;
    }
    return this.assetService.isImage(file);
  }

  asset(id: number | undefined): SafeUrl {
    return this.assetService.get(id);
  }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.authService.fetch().subscribe((resp) => (this.user = resp.data.auth));

    await this.gameQuery.setVariables({ id });
    this.gameQuery.valueChanges.subscribe((resp) => {
      this.game = resp.data.getGameById;
      this.hasInputAge = !this.game.isInappropriate && !this.birthdate;

      this.currentAssetFile = this.slideshows[0]?.file;
    });
  }

  onViewPage(): void {
    if (!this.birthdate) {
      return;
    }

    const age =
      new Date().getFullYear() - new Date(this.birthdate).getFullYear();
    this.hasInputAge = age > 17;
  }

  onAddToCart(): void {
    if (this.game?.isInCart) {
      return;
    }

    this.isLoading = true;
    this.apollo
      .mutate<{ addToCart: Game }>({
        mutation: gql`
          mutation addToCart($gameId: ID!) {
            addToCart(gameId: $gameId) {
              id
            }
          }
        `,
        variables: { gameId: this.game?.id },
      })
      .subscribe((resp) => {
        if (resp.data?.addToCart) {
          alert('Game added to cart');
          this.isLoading = false;
          this.gameQuery.refetch().then();
          this.authService.watch().refetch().then();
        }
      });
  }

  onAddToWishlist(): void {
    if (this.game?.isInWishlist) {
      return;
    }

    this.isLoading = true;
    this.apollo
      .mutate<{ addToWishlist: Game }>({
        mutation: gql`
          mutation addToWishlist($gameId: ID!) {
            addToWishlist(gameId: $gameId) {
              id
            }
          }
        `,
        variables: { gameId: this.game?.id },
      })
      .subscribe((resp) => {
        if (resp.data?.addToWishlist) {
          alert('Game added to wishlist');
          this.isLoading = false;
          this.gameQuery.refetch().then();
          this.authService.watch().refetch().then();
        }
      });
  }
}
