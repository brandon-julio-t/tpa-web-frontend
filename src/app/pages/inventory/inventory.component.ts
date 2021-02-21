import { Component, EventEmitter, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../services/auth.service';
import { debounceTime, map, tap } from 'rxjs/operators';
import { User } from '../../models/user';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { MarketItem } from '../../models/market-item';
import { FormBuilder, Validators } from '@angular/forms';
import { MarketItemOffer } from '../../models/market-item-offer';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  filter = '';
  filterChange = new EventEmitter<void>();
  selectItem = new EventEmitter<MarketItem>();
  selectedGameId = 0;
  totalPages = 0;
  page = 1;

  chartData: ChartDataSets[] = [];
  chartLabel: Label[] = [];

  sellForm = this.fb.group({
    receivePrice: [0, Validators.required],
    buyerPrice: [{ value: 1, disabled: true }, Validators.required],
  });

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

  marketItems$ = this.marketItemsQuery$.valueChanges.pipe(
    map((x) => x.data.auth.marketItemsByGame),
    tap((x) => (this.totalPages = x.totalPages)),
    map((x) => x.data),
    tap((x) => this.selectedItemSubject.next(x[0]))
  );

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private authService: AuthService,
    private assetService: AssetService
  ) {}

  ngOnInit(): void {
    this.selectItem.subscribe((item: MarketItem) => {
      this.selectedItemSubject.next(item);
    });

    this.filterChange.pipe(debounceTime(500)).subscribe(async () => {
      await this.refetchMarketItems();
    });

    this.selectedItem$.subscribe((item) => {
      console.log(item);

      if (!item) {
        return;
      }

      this.chartData = [
        {
          data: item.pastMonthSales.map((x) => x.price),
          label: 'Price',
        },
      ];

      this.chartLabel = item.pastMonthSales.map((x) =>
        new Date(x.createdAt).toLocaleString()
      );
    });
  }

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
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

  onPromptSell(sell: HTMLElement): void {
    sell.style.opacity = '1';
    sell.style.zIndex = '9';
  }

  onCloseSell(sell: HTMLElement): void {
    sell.style.opacity = '0';
    sell.style.zIndex = '-1';
  }

  onSell(item: MarketItem, sellContainer: HTMLElement): void {
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
          sellContainer.style.opacity = '0';
          this.authService.watch().refetch().then();
        }
      });
  }
}

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
