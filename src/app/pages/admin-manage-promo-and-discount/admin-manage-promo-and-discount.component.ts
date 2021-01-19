import { Component, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Promo } from '../../models/promo';

@Component({
  selector: 'app-admin-manage-promo-and-discount',
  templateUrl: './admin-manage-promo-and-discount.component.html',
  styleUrls: ['./admin-manage-promo-and-discount.component.scss'],
})
export class AdminManagePromoAndDiscountComponent implements OnInit {
  promos: Promo[] = [];
  isLoading = false;
  promosQuery: QueryRef<{
    promos: {
      data: Promo[];
      totalPages: number;
    };
  }>;
  currentPage = 1;
  totalPages = 0;

  constructor(private apollo: Apollo) {
    this.promosQuery = this.apollo.watchQuery<{
      promos: {
        data: Promo[];
        totalPages: number;
      };
    }>({
      query: gql`
        query promos($page: Int!) {
          promos(page: $page) {
            data {
              id
              discount
              endAt
            }
            totalPages
          }
        }
      `,
      variables: { page: this.currentPage },
    });
  }

  ngOnInit(): void {
    this.promosQuery.valueChanges.subscribe((resp) => {
      const { data, totalPages } = resp.data.promos;
      this.promos = data;
      this.totalPages = totalPages;
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

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.promosQuery.refetch({ page: this.currentPage }).then();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.promosQuery.refetch({ page: this.currentPage }).then();
    }
  }
}
