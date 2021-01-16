import { Component, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { User } from '../../models/user';

@Component({
  selector: 'app-admin-manage-user',
  templateUrl: './admin-manage-users.component.html',
  styleUrls: ['./admin-manage-users.component.scss'],
})
export class AdminManageUsersComponent implements OnInit {
  allUsersQuery: QueryRef<{ getAllUsers: User[] }>;
  users: User[] = [];

  constructor(private apollo: Apollo) {
    this.allUsersQuery = this.apollo.watchQuery<{ getAllUsers: User[] }>({
      query: gql`
        query getAllUsers {
          getAllUsers {
            id
            accountName
            email
            summary
            suspendedAt
            reportCounts
          }
        }
      `,
    });
  }

  ngOnInit(): void {
    this.allUsersQuery.valueChanges.subscribe((data) => {
      this.users = data.data.getAllUsers;
    });
  }

  onSuspend(id: number | undefined): void {
    if (!id) {
      return;
    }

    this.apollo
      .mutate<{ suspendAccount: User }>({
        mutation: gql`
          mutation suspendAccount($id: ID!) {
            suspendAccount(id: $id) {
              id
              suspendedAt
            }
          }
        `,
        variables: { id },
      })
      .subscribe();
  }
}
