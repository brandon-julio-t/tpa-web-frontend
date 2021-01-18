import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { Promo } from '../../models/promo';

@Component({
  selector: 'app-admin-promos-create',
  templateUrl: './admin-promos-create.component.html',
  styleUrls: ['./admin-promos-create.component.scss'],
})
export class AdminPromosCreateComponent implements OnInit {
  createPromoForm: FormGroup;
  isLoading = false;

  constructor(private apollo: Apollo, private fb: FormBuilder) {
    this.createPromoForm = fb.group({
      discount: fb.control(0, Validators.required),
      endAt: fb.control(new Date(0), Validators.required),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.createPromoForm.markAllAsTouched();
    if (this.createPromoForm.invalid) {
      return;
    }

    this.isLoading = true;
    const { discount, endAt } = this.createPromoForm.value;

    this.apollo
      .mutate<{ createPromo: Promo }>({
        mutation: gql`
          mutation createPromo($discount: Float!, $endAt: Time!) {
            createPromo(discount: $discount, endAt: $endAt) {
              id
              discount
              endAt
            }
          }
        `,
        variables: {
          discount,
          endAt: new Date(endAt),
        },
      })
      .subscribe((resp) => {
        if (resp.data?.createPromo) {
          alert('Promo created');
          this.createPromoForm.reset();
          this.isLoading = false;
        }
      });
  }
}
