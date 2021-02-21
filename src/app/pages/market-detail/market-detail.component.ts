import { Component, EventEmitter, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { MarketItem } from '../../models/market-item';
import { debounceTime, map, tap } from 'rxjs/operators';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { MarketItemOffer } from '../../models/market-item-offer';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-market-detail',
  templateUrl: './market-detail.component.html',
  styleUrls: ['./market-detail.component.scss'],
})
export class MarketDetailComponent implements OnInit {
  subscribed = false;
  sellListing = [];
  buyListing = [];

  buyForm = this.fb.group({
    price: [0, Validators.required],
    quantity: [1, Validators.required],
  });

  sellForm = this.fb.group({
    receivePrice: [0, Validators.required],
    buyerPrice: [{ value: 1, disabled: true }, Validators.required],
  });

  marketItem$ = of<MarketItem>();
  recentActivities$ = of<string[]>([]);

  sellListing$ = this.authService
    .watch()
    .valueChanges.pipe(map((x) => x.data.auth.marketItemsSellListing));

  buyListing$ = this.authService
    .watch()
    .valueChanges.pipe(map((x) => x.data.auth.marketItemsBuyListing));
  filter = '';
  filterChange = new EventEmitter<void>();
  selectItem = new EventEmitter<MarketItem>();
  selectedGameId = 0;
  totalPages = 0;
  page = 1;
  marketItemsQuery$ = this.apollo.watchQuery<
    { auth: User },
    { page: number; gameId: number; filter: string }
  >({
    query: gql`
      query marketItemsByGame($page: Int!, $gameId: ID!, $filter: String!) {
        auth {
          id
          marketItemsByGame(page: $page, gameId: $gameId, filter: $filter) {
            data {
              id
              category
              description
              image {
                id
              }
              name
            }
            totalPages
          }
        }
      }
    `,
    variables: {
      page: this.page,
      gameId: this.selectedGameId,
      filter: this.filter,
    },
  });
  games$ = this.authService.watch().valueChanges.pipe(
    map((x) => x.data.auth.gamesByOwnedMarketItems),
    tap(async (x) => {
      this.selectedGameId = x[0].id;
      await this.refetchMarketItems();
    })
  );
  selectedItemSubject = new Subject<MarketItem>();
  selectedItem$ = this.selectedItemSubject.asObservable();
  inventoryMarketItems$ = this.marketItemsQuery$.valueChanges.pipe(
    map((x) => x.data.auth.marketItemsByGame),
    tap((x) => (this.totalPages = x.totalPages)),
    map((x) => x.data),
    tap((x) => this.selectedItemSubject.next(x[0]))
  );

  chartData: ChartDataSets[] = [];
  chartLabel: Label[] = [];

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
          pollInterval: 5000,
        })
        .valueChanges.pipe(
          map((x) => x.data.marketItem),
          tap((item) => {
            this.chartData = [
              {
                data: item.pastMonthSales.map((x) => x.price),
                label: 'Price',
              },
            ];

            this.chartLabel = item.pastMonthSales.map((x) =>
              new Date(x.createdAt).toLocaleString()
            );
          }),
          tap((item) => {
            if (this.subscribed) {
              return;
            }

            this.subscribed = true;

            this.apollo
              .subscribe<{ onMarketItemOfferAdded: string }>({
                query: gql`
                  subscription onMarketItemOfferAdded($marketItemId: ID!) {
                    onMarketItemOfferAdded(marketItemId: $marketItemId)
                  }
                `,
                variables: { marketItemId: item.id },
              })
              .subscribe((resp) => {
                const msg = resp.data?.onMarketItemOfferAdded;
                if (msg) {
                  this.recentActivities$ = this.recentActivities$.pipe(
                    map((x) => [...x, msg])
                  );
                }
              });
          })
        );
    });

    this.selectItem.subscribe((item: MarketItem) => {
      this.selectedItemSubject.next(item);
    });

    this.filterChange.pipe(debounceTime(500)).subscribe(async () => {
      await this.refetchMarketItems();
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
          this.authService.watch().refetch().then();
        }
      });
  }

  promptSell(sellDialog: HTMLElement): void {
    sellDialog.style.display = 'flex';
  }

  onSell(sellDialog: HTMLElement, item: MarketItem): void {
    if (this.sellForm.invalid) {
      return;
    }

    this.apollo
      .mutate<{ addMarketItemOffer: MarketItemOffer }>({
        mutation: GQL_MUTATION_ADD,
        variables: {
          price: this.sellForm.controls.buyerPrice.value,
          category: 'sell',
          marketItemId: item.id,
          quantity: 1,
        },
      })
      .subscribe((resp) => {
        if (resp.data) {
          sellDialog.style.display = 'none';
          this.authService.watch().refetch().then();
        }
      });
  }

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

  onSelectItem(item: MarketItem): void {
    this.selectItem.emit(item);
  }

  async refetchMarketItems(): Promise<void> {
    await this.marketItemsQuery$.refetch({
      page: this.page,
      gameId: this.selectedGameId,
      filter: this.filter,
    });
  }

  async onSelectGame(id: number): Promise<void> {
    this.page = 1;
    this.selectedGameId = id;
    await this.refetchMarketItems();
  }

  async onPrev(): Promise<void> {
    if (this.page <= 1) {
      return;
    }

    this.page--;
    await this.refetchMarketItems();
  }

  async onNext(): Promise<void> {
    if (this.page >= this.totalPages) {
      return;
    }

    this.page++;
    await this.refetchMarketItems();
  }

  onFilter(): void {
    this.filterChange.emit();
  }

  commaSpaceCategory(item: MarketItem): string {
    return item.category.replace(/,/gi, ', ');
  }

  onReceivePriceChange(): void {
    const price = this.sellForm.value.receivePrice * 1.1;
    this.sellForm.controls.buyerPrice.setValue(price);
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
      pastMonthSales {
        createdAt
        price
      }
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
