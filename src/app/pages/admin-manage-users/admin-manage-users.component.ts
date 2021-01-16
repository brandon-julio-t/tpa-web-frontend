import { Component, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { User } from '../../models/user';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-manage-user',
  templateUrl: './admin-manage-users.component.html',
  styleUrls: ['./admin-manage-users.component.scss'],
})
export class AdminManageUsersComponent implements OnInit {
  allUsersQuery: QueryRef<{ getAllUsers: User[] }>;
  users: User[] = [];
  currentPage = 1;
  faCircleNotch = faCircleNotch;

  constructor(private apollo: Apollo) {
    this.allUsersQuery = this.apollo.watchQuery<{ getAllUsers: User[] }>({
      query: gql`
        query getAllUsers($page: Int!) {
          getAllUsers(page: $page) {
            id
            accountName
            email
            summary
            suspendedAt
            reportCounts
          }
        }
      `,
      variables: { page: this.currentPage },
    });
  }

  async ngOnInit(): Promise<void> {
    // await this.allUsersQuery.setVariables({ page: this.currentPage });
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

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.allUsersQuery.refetch({ page: this.currentPage }).then();
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.allUsersQuery.refetch({ page: this.currentPage }).then();
  }
}
