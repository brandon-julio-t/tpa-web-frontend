import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.scss'],
})
export class TopUpComponent implements OnInit {
  topUpForm: FormGroup;
  isLoading = false;

  constructor(private apollo: Apollo, private fb: FormBuilder) {
    this.topUpForm = fb.group({
      code: fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.isLoading = true;

    this.apollo
      .mutate<{ redeemWallet: boolean }>({
        mutation: gql`
          mutation redeemWallet($code: String!) {
            redeemWallet(code: $code)
          }
        `,
        variables: this.topUpForm.value,
      })
      .subscribe((resp) => {
        if (resp.data?.redeemWallet) {
          alert('Success');
          this.isLoading = false;
          window.location.reload();
        }
      });
  }
}
