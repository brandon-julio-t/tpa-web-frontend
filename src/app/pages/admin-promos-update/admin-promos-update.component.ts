import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { Promo } from '../../models/promo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-promos-update',
  templateUrl: './admin-promos-update.component.html',
  styleUrls: ['./admin-promos-update.component.scss'],
})
export class AdminPromosUpdateComponent implements OnInit {
  updatePromoForm: FormGroup;
  promo: Promo | null = null;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private fb: FormBuilder
  ) {
    this.updatePromoForm = fb.group({
      discount: fb.control(0, Validators.required),
      endAt: fb.control(new Date(0), Validators.required),
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.apollo
      .watchQuery<{ promo: Promo }>({
        query: gql`
          query promo($id: ID!) {
            promo(id: $id) {
              id
              discount
              endAt
            }
          }
        `,
        variables: { id },
      })
      .valueChanges.subscribe((resp) => {
        this.promo = resp.data.promo;
        const { discount, endAt } = this.promo;
        this.updatePromoForm.setValue({
          discount,
          endAt: new Date(endAt).toISOString().substring(0, 16),
        });
      });
  }

  onSubmit(): void {
    this.updatePromoForm.markAllAsTouched();
    if (this.updatePromoForm.invalid) {
      return;
    }

    this.isLoading = true;
    const { discount, endAt } = this.updatePromoForm.value;

    this.apollo
      .mutate<{ updatePromo: Promo }>({
        mutation: gql`
          mutation updatePromo($id: ID!, $discount: Float!, $endAt: Time!) {
            updatePromo(id: $id, discount: $discount, endAt: $endAt) {
              id
              discount
              endAt
            }
          }
        `,
        variables: {
          id: this.promo?.id,
          discount,
          endAt: new Date(endAt),
        },
      })
      .subscribe((resp) => {
        if (resp.data?.updatePromo) {
          alert('Promo updated');
          this.updatePromoForm.reset();
          this.isLoading = false;
        }
      });
  }
}
