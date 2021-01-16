import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Report } from '../../models/report';

@Component({
  selector: 'app-admin-view-reports',
  templateUrl: './admin-view-reports.component.html',
  styleUrls: ['./admin-view-reports.component.scss'],
})
export class AdminViewReportsComponent implements OnInit {
  reports: Report[] = [];

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.apollo
      .watchQuery<{ getReportsByUser: Report[] }>({
        query: gql`
          query getAllReports($id: ID!) {
            getReportsByUser(id: $id) {
              reporter {
                id
                accountName
                email
              }
              description
              createdAt
            }
          }
        `,
        variables: { id },
      })
      .valueChanges.subscribe((data) => {
        this.reports = data.data.getReportsByUser;
      });
  }
}
