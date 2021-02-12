import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { MarketItem } from '../../models/market-item';
import { map, tap } from 'rxjs/operators';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  totalPages = 0;
  page = 1;

  query$ = this.apollo.watchQuery<
    { marketItems: { data: MarketItem[]; totalPages: number } },
    { page: number }
  >({
    query: gql`
      query marketItems($page: Int!) {
        marketItems(page: $page) {
          data {
            id
            game {
              title
            }
            image {
              id
            }
            name
            startingPrice
            transactionsCount
          }
          totalPages
        }
      }
    `,
    variables: { page: this.page },
  });

  marketItems$ = this.query$.valueChanges.pipe(
    map((x) => x.data.marketItems.data)
  );

  totalPages$ = this.query$.valueChanges.pipe(
    map((x) => x.data.marketItems.totalPages),
    tap((x) => (this.totalPages = x))
  );

  constructor(private apollo: Apollo, private assetService: AssetService) {}

  ngOnInit(): void {}

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  next(): void {
    if (this.page >= this.totalPages) {
      return;
    }

    this.page++;
    this.query$.refetch({ page: this.page }).then();
  }

  prev(): void {
    if (this.page <= 1) {
      return;
    }

    this.page--;
    this.query$.refetch({ page: this.page }).then();
  }
}
