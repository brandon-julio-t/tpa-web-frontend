import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-purchase',
  templateUrl: './game-purchase.component.html',
  styleUrls: ['./game-purchase.component.scss'],
})
export class GamePurchaseComponent implements OnInit {
  isLoading = false;
  showPaymentMethod = false;
  expirationYear: string[] = [];
  country = '';

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    const thisYear = new Date().getFullYear();
    this.expirationYear.push('----');
    for (let i = thisYear; i <= thisYear + 25; i++) {
      this.expirationYear.push(i + '');
    }
  }

  ngOnInit(): void {
    this.authService.fetch().subscribe((resp) => {
      const { cart, country, walletBalance } = resp.data.auth;

      const totalPrice = cart.map((game) => game.price).reduce((a, b) => a + b);
      this.showPaymentMethod = totalPrice > walletBalance;
      this.country = country.name;
    });
  }

  onCheckoutWithWallet(): void {
    this.isLoading = true;
    this.apollo
      .mutate<{ checkoutWithWallet: boolean }>({
        mutation: gql`
          mutation checkoutWithWallet {
            checkoutWithWallet
          }
        `,
      })
      .subscribe((resp) => {
        if (resp.data?.checkoutWithWallet) {
          alert('Checkout success');
          this.isLoading = false;
          this.router
            .navigateByUrl('/')
            .then(() => this.authService.watch().refetch());
        }
      });
  }

  onCheckoutWithCard(): void {
    this.isLoading = true;
    this.apollo
      .mutate<{ checkoutWithCard: boolean }>({
        mutation: gql`
          mutation checkoutWithCard {
            checkoutWithCard
          }
        `,
      })
      .subscribe((resp) => {
        if (resp.data?.checkoutWithCard) {
          alert('Checkout success');
          this.isLoading = false;
          this.router
            .navigateByUrl('/')
            .then(() => this.authService.watch().refetch());
        }
      });
  }
}
