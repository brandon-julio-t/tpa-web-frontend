import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { Apollo } from 'apollo-angular';
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

  onRemove(id: number): void {}
}
