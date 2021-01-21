import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { Apollo, gql } from 'apollo-angular';
import { Game } from '../../models/game';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishlist: Game[] = [];
  isLoading = false;

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private assetService: AssetService
  ) {}

  asset(id: number | undefined): SafeUrl {
    return this.assetService.get(id);
  }

  ngOnInit(): void {
    this.authService
      .watch()
      .valueChanges.subscribe(
        (resp) => (this.wishlist = resp.data.auth.wishlist)
      );
  }

  onRemove(id: number): void {
    this.isLoading = true;
    this.apollo
      .mutate<{ removeFromWishlist: Game }>({
        mutation: gql`
          mutation removeFromWishlist($gameId: ID!) {
            removeFromWishlist(gameId: $gameId) {
              id
            }
          }
        `,
        variables: { gameId: id },
      })
      .subscribe((resp) => {
        const removedId = resp.data?.removeFromWishlist.id;
        if (removedId) {
          this.wishlist = this.wishlist.filter((game) => game.id !== removedId);
          this.isLoading = false;
        }
      });
  }
}
