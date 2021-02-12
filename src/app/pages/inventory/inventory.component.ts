import { Component, EventEmitter, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../services/auth.service';
import { map, tap } from 'rxjs/operators';
import { User } from '../../models/user';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { MarketItem } from '../../models/market-item';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  selectItem = new EventEmitter<MarketItem>();
  selectedGameId = 0;
  totalPages = 0;
  page = 1;

  marketItemsQuery$ = this.apollo.watchQuery<
    { auth: User },
    { page: number; gameId: number }
  >({
    query: gql`
      query marketItemsByGame($page: Int!, $gameId: ID!) {
        auth {
          id
          marketItemsByGame(page: $page, gameId: $gameId) {
            data {
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
    variables: { page: this.page, gameId: this.selectedGameId },
  });

  games$ = this.authService.watch().valueChanges.pipe(
    map((x) => x.data.auth.gamesByOwnedMarketItems),
    tap(async (x) => {
      this.selectedGameId = x[0].id;
      await this.marketItemsQuery$.refetch({
        page: this.page,
        gameId: this.selectedGameId,
      });
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
    private authService: AuthService,
    private assetService: AssetService
  ) {}

  ngOnInit(): void {
    this.selectItem.subscribe((item: MarketItem) => {
      this.selectedItemSubject.next(item);
    });
  }

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  onSelectItem(item: MarketItem): void {
    this.selectItem.emit(item);
  }

  async onSelectGame(id: number): Promise<void> {
    this.page = 1;
    this.selectedGameId = id;
    await this.marketItemsQuery$.refetch({
      page: this.page,
      gameId: this.selectedGameId,
    });
  }

  async onPrev(): Promise<void> {
    if (this.page <= 1) {
      return;
    }

    this.page--;
    await this.marketItemsQuery$.refetch({
      page: this.page,
      gameId: this.selectedGameId,
    });
  }

  async onNext(): Promise<void> {
    if (this.page >= this.totalPages) {
      return;
    }

    this.page++;
    await this.marketItemsQuery$.refetch({
      page: this.page,
      gameId: this.selectedGameId,
    });
  }
}
