import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { User } from '../../models/user';

@Component({
  selector: 'app-admin-manage-unsuspend-requests',
  templateUrl: './admin-manage-unsuspend-requests.component.html',
  styleUrls: ['./admin-manage-unsuspend-requests.component.scss'],
})
export class AdminManageUnsuspendRequestsComponent implements OnInit {
  unsuspendRequests: User[] = [];
  isLoading = false;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<{ getAllUnsuspendRequests: User[] }>({
        query: gql`
          query getAllUnsuspendRequests {
            getAllUnsuspendRequests {
              id
              accountName
            }
          }
        `,
      })
      .valueChanges.subscribe((data) => {
        this.unsuspendRequests = data.data.getAllUnsuspendRequests;
      });
  }

  onApprove(id: number | undefined): void {
    if (!id) {
      return;
    }

    this.isLoading = true;

    this.apollo
      .mutate<{ approveUnsuspendRequests: User }>({
        mutation: gql`
          mutation approveUnsuspendRequests($id: ID!) {
            approveUnsuspendRequests(id: $id) {
              id
            }
          }
        `,
        variables: { id },
      })
      .subscribe((data) => {
        if (data.data?.approveUnsuspendRequests) {
          this.unsuspendRequests = this.unsuspendRequests.filter(
            (req) => req.id !== id
          );
          this.isLoading = false;
        }
      });
  }

  onDeny(id: number | undefined): void {
    if (!id) {
      return;
    }

    this.isLoading = true;

    this.apollo
      .mutate<{ approveUnsuspendRequests: User }>({
        mutation: gql`
          mutation denyUnsuspendRequests($id: ID!) {
            denyUnsuspendRequests(id: $id) {
              id
            }
          }
        `,
        variables: { id },
      })
      .subscribe((data) => {
        if (data.data?.approveUnsuspendRequests) {
          this.unsuspendRequests = this.unsuspendRequests.filter(
            (req) => req.id !== id
          );
          this.isLoading = false;
        }
      });
  }
}
