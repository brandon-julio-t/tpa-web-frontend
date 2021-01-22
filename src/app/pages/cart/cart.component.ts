import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../services/auth.service';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Game[] = [];
  isLoading = false;

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private assetService: AssetService
  ) {}

  get estimatedTotal(): number {
    if (this.cart.length < 1) {
      return 0;
    }
    return this.cart.map((game) => game.price).reduce((a, b) => a + b) ?? 0;
  }

  asset(id: number | undefined): SafeUrl {
    return this.assetService.get(id);
  }

  ngOnInit(): void {
    this.authService
      .watch()
      .valueChanges.subscribe((resp) => (this.cart = resp.data.auth.cart));
  }

  onRemove(id: number): void {
    this.isLoading = true;
    this.apollo
      .mutate<{ removeFromCart: Game }>({
        mutation: gql`
          mutation removeFromCart($gameId: ID!) {
            removeFromCart(gameId: $gameId) {
              id
            }
          }
        `,
        variables: { gameId: id },
      })
      .subscribe((resp) => {
        if (resp.data?.removeFromCart) {
          this.authService
            .watch()
            .refetch()
            .then(() => (this.isLoading = false));
        }
      });
  }

  onClearCart(): void {
    if (
      confirm(
        'Are you sure you want to remove all items from your shopping cart?'
      )
    ) {
      this.isLoading = true;
      this.apollo
        .mutate<{ clearCart: boolean }>({
          mutation: gql`
            mutation clearCart {
              clearCart
            }
          `,
        })
        .subscribe((resp) => {
          if (resp.data?.clearCart) {
            this.authService
              .watch()
              .refetch()
              .then(() => (this.isLoading = false));
          }
        });
    }
  }
}
