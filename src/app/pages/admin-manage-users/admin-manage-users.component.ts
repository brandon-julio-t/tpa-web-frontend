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
  allUsersQuery: QueryRef<{
    users: {
      data: User[];
      totalPages: number;
    };
  }>;
  users: User[] = [];
  currentPage = 1;
  totalPages = 0;
  faCircleNotch = faCircleNotch;

  constructor(private apollo: Apollo) {
    this.allUsersQuery = this.apollo.watchQuery<{
      users: {
        data: User[];
        totalPages: number;
      };
    }>({
      query: gql`
        query users($page: Int!) {
          users(page: $page) {
            data {
              id
              accountName
              email
              summary
              suspendedAt
              reportCounts
            }
            totalPages
          }
        }
      `,
      variables: { page: this.currentPage },
    });
  }

  async ngOnInit(): Promise<void> {
    this.allUsersQuery.valueChanges.subscribe((resp) => {
      const { data, totalPages } = resp.data.users;
      this.users = data;
      this.totalPages = totalPages;
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
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.allUsersQuery.refetch({ page: this.currentPage }).then();
    }
  }
}
