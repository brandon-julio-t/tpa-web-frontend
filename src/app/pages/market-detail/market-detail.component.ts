import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MarketItem } from '../../models/market-item';
import { map } from 'rxjs/operators';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { MarketItemOffer } from '../../models/market-item-offer';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-market-detail',
  templateUrl: './market-detail.component.html',
  styleUrls: ['./market-detail.component.scss'],
})
export class MarketDetailComponent implements OnInit {
  sellListing = [];
  buyListing = [];

  buyForm = this.fb.group({
    price: [0, Validators.required],
    quantity: [1, Validators.required],
  });

  marketItem$ = of<MarketItem>();

  sellListing$ = this.authService
    .watch()
    .valueChanges.pipe(map((x) => x.data.auth.marketItemsSellListing));

  buyListing$ = this.authService
    .watch()
    .valueChanges.pipe(map((x) => x.data.auth.marketItemsBuyListing));

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private assetService: AssetService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (!id) {
        return;
      }

      this.marketItem$ = this.apollo
        .watchQuery<{ marketItem: MarketItem }>({
          query: GQL_QUERY_MARKET_ITEM,
          variables: { id },
          returnPartialData: true,
          pollInterval: 5000,
        })
        .valueChanges.pipe(map((x) => x.data.marketItem));
    });
  }

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  offerTrackBy(index: number, element: MarketItemOffer): number {
    return element.id;
  }

  promptBuy(buyDialog: HTMLElement): void {
    buyDialog.style.display = 'flex';
  }

  onBuy(buyDialog: HTMLElement, id: number): void {
    if (this.buyForm.invalid) {
      return;
    }

    this.apollo
      .mutate<{ addMarketItemOffer: MarketItemOffer }>({
        mutation: GQL_MUTATION_ADD,
        variables: {
          price: this.buyForm.value.price,
          category: 'buy',
          marketItemId: id,
          quantity: this.buyForm.value.quantity,
        },
      })
      .subscribe((resp) => {
        if (resp.data) {
          buyDialog.style.display = 'none';
        }
      });
  }

  onSell(): void {}

  onCancel(id: number, category: string): void {
    if (!confirm('Are you sure you want to cancel this offer?')) {
      return;
    }

    this.apollo
      .mutate<{ cancelMarketItemOffer: MarketItemOffer }>({
        mutation: GQL_MUTATION_CANCEL,
        variables: { id },
      })
      .subscribe((value) => {
        const offer = value.data?.cancelMarketItemOffer;
        if (offer) {
          if (category === 'sell') {
            this.sellListing$ = this.sellListing$.pipe(
              map((x) => x.filter((o) => o.id !== offer.id))
            );
          } else {
            this.buyListing$ = this.buyListing$.pipe(
              map((x) => x.filter((o) => o.id !== offer.id))
            );
          }
        }
      });
  }
}

const GQL_QUERY_MARKET_ITEM = gql`
  query marketItem($id: ID!) {
    marketItem(id: $id) {
      id
      buyPrices {
        price
        quantity
      }
      description
      game {
        title
      }
      image {
        id
      }
      name
      salePrices {
        price
        quantity
      }
    }
  }
`;

const GQL_MUTATION_ADD = gql`
  mutation addMarketItemOffer(
    $price: Float!
    $category: String!
    $marketItemId: ID!
    $quantity: Int!
  ) {
    addMarketItemOffer(
      input: {
        price: $price
        category: $category
        marketItemId: $marketItemId
        quantity: $quantity
      }
    ) {
      id
    }
  }
`;

const GQL_MUTATION_CANCEL = gql`
  mutation cancelMarketItemOffer($id: ID!) {
    cancelMarketItemOffer(id: $id) {
      id
    }
  }
`;
