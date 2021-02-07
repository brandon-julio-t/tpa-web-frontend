import { Component, Input, OnInit } from '@angular/core';
import { PointItem } from '../../models/point-item';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { Apollo, gql } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-points-shop-item',
  templateUrl: './points-shop-item.component.html',
  styleUrls: ['./points-shop-item.component.scss'],
})
export class PointsShopItemComponent implements OnInit {
  @Input() item: PointItem | undefined;

  constructor(
    private apollo: Apollo,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private assetService: AssetService
  ) {}

  ngOnInit(): void {}

  asset(id: number | undefined): SafeUrl {
    return this.assetService.get(id);
  }

  underscoreToSpace(text: string | undefined): string {
    return text?.replace(/_/g, ' ') ?? '';
  }

  onPurchase(): void {
    if (confirm('Do you want to purchase this item?')) {
      this.spinner.show('' + this.item?.id);
      this.apollo
        .mutate({
          mutation: gql`
            mutation purchasePointItem($id: ID!) {
              purchasePointItem(id: $id) {
                id
              }
            }
          `,
          variables: { id: this.item?.id },
        })
        .pipe(
          catchError((e) => {
            alert(e.message);
            this.spinner.hide('' + this.item?.id);
            throw e;
          })
        )
        .subscribe(async (resp) => {
          if (resp.data) {
            alert('Purchase success');
            await this.authService.watch().refetch();
            this.spinner.hide('' + this.item?.id);
          }
        });
    }
  }
}
