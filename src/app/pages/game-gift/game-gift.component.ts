import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { Country } from '../../models/country';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-gift',
  templateUrl: './game-gift.component.html',
  styleUrls: ['./game-gift.component.scss'],
})
export class GameGiftComponent implements OnInit {
  phase = 1;
  friends: User[] = [];
  country: Country | null = null;
  giftForm: FormGroup;
  expirationYear: string[] = [];
  isUsingCard = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private assetService: AssetService,
    private apollo: Apollo
  ) {
    this.giftForm = fb.group({
      friendId: fb.control('', Validators.required),
      firstName: fb.control('', Validators.required),
      message: fb.control('', Validators.required),
      sentiment: fb.control('', Validators.required),
      signature: fb.control('', Validators.required),
    });

    const thisYear = new Date().getFullYear();
    this.expirationYear.push('----');
    for (let i = thisYear; i <= thisYear + 25; i++) {
      this.expirationYear.push(i + '');
    }
  }

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  ngOnInit(): void {
    this.authService.fetch().subscribe((resp) => {
      const { friends, country, cart, walletBalance } = resp.data.auth;
      const totalCost = cart.map((game) => game.price).reduce((a, b) => a + b);

      this.friends = friends;
      this.country = country;
      this.isUsingCard = totalCost > walletBalance;
    });
  }

  nextPhase(): void {
    this.giftForm.markAllAsTouched();
    let valid = true;

    const {
      friendId,
      firstName,
      message,
      sentiment,
      signature,
    } = this.giftForm.controls;

    switch (this.phase) {
      case 1:
        valid = !friendId.invalid;
        break;
      case 2:
        valid =
          !firstName.invalid &&
          !message.invalid &&
          !sentiment.invalid &&
          !signature.invalid;
        break;
    }

    if (valid) {
      this.giftForm.markAsUntouched();
      this.phase++;
    }
  }

  setFriendId(id: number): void {
    this.giftForm.controls.friendId.setValue(id);
  }

  backToPhase(phase: number): void {
    if (phase < this.phase) {
      this.phase = phase;
    }
  }

  onCheckout(): void {
    const {
      friendId,
      firstName,
      message,
      sentiment,
      signature,
    } = this.giftForm.value;

    this.isLoading = true;

    if (this.isUsingCard) {
      this.apollo
        .mutate<{ giftWithCard: boolean }>({
          mutation: gql`
            mutation giftWithCard(
              $firstName: String!
              $message: String!
              $sentiment: String!
              $signature: String!
              $userId: ID!
            ) {
              giftWithCard(
                input: {
                  firstName: $firstName
                  message: $message
                  sentiment: $sentiment
                  signature: $signature
                  userId: $userId
                }
              )
            }
          `,
          variables: {
            userId: friendId,
            firstName,
            message,
            sentiment,
            signature,
          },
        })
        .subscribe((resp) => {
          if (resp.data?.giftWithCard) {
            alert('Gift sent!');
            this.authService.watch().refetch().then();
            this.router.navigateByUrl('/').then();
          }
        });
    } else {
      this.apollo
        .mutate<{ giftWithWallet: boolean }>({
          mutation: gql`
            mutation giftWithWallet(
              $firstName: String!
              $message: String!
              $sentiment: String!
              $signature: String!
              $userId: ID!
            ) {
              giftWithCard(
                input: {
                  firstName: $firstName
                  message: $message
                  sentiment: $sentiment
                  signature: $signature
                  userId: $userId
                }
              )
            }
          `,
          variables: {
            userId: friendId,
            firstName,
            message,
            sentiment,
            signature,
          },
        })
        .subscribe((resp) => {
          if (resp.data?.giftWithWallet) {
            alert('Gift sent!');
            this.authService.watch().refetch().then();
            this.router.navigateByUrl('/').then();
          }
        });
    }
  }
}
