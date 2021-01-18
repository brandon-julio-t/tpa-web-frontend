import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Promo } from '../../models/promo';

@Component({
  selector: 'app-admin-manage-promo-and-discount',
  templateUrl: './admin-manage-promo-and-discount.component.html',
  styleUrls: ['./admin-manage-promo-and-discount.component.scss'],
})
export class AdminManagePromoAndDiscountComponent implements OnInit {
  promos: Promo[] = [];
  isLoading = false;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<{ promos: Promo[] }>({
        query: gql`
          query promos {
            promos {
              id
              discount
              endAt
            }
          }
        `,
      })
      .valueChanges.subscribe((resp) => {
        this.promos = resp.data.promos;
      });
  }

  onDelete(id: number | undefined): void {
    if (!id) {
      return;
    }

    this.isLoading = true;

    this.apollo
      .mutate<{ deletePromo: Promo }>({
        mutation: gql`
          mutation deletePromo($id: ID!) {
            deletePromo(id: $id) {
              id
              discount
              endAt
            }
          }
        `,
        variables: { id },
      })
      .subscribe((resp) => {
        const deleted = resp.data?.deletePromo;
        if (deleted) {
          this.promos = this.promos.filter((promo) => promo.id !== deleted.id);
          this.isLoading = false;
        }
      });
  }
}
