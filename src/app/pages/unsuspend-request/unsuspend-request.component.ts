import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-unsuspend-request',
  templateUrl: './unsuspend-request.component.html',
  styleUrls: ['./unsuspend-request.component.scss'],
})
export class UnsuspendRequestComponent implements OnInit {
  unsuspendRequestForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private apollo: Apollo) {
    this.unsuspendRequestForm = fb.group({
      accountName: fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.unsuspendRequestForm.markAllAsTouched();
    if (this.unsuspendRequestForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.apollo
      .mutate<{ unsuspendRequest: string }>({
        mutation: gql`
          mutation unsuspendRequest($accountName: String!) {
            unsuspendRequest(accountName: $accountName)
          }
        `,
        variables: this.unsuspendRequestForm.value,
      })
      .pipe(
        catchError((err) => {
          this.isLoading = false;
          throw err;
        })
      )
      .subscribe((data) => {
        this.isLoading = false;

        const accountName = data.data?.unsuspendRequest;
        if (accountName) {
          alert(`Unsuspend request for account ${accountName} submitted.`);
        }
      });
  }
}
