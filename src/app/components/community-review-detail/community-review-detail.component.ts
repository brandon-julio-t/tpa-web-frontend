import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { gql } from '@apollo/client';

@Component({
  selector: 'app-community-review-detail',
  templateUrl: './community-review-detail.component.html',
  styleUrls: ['./community-review-detail.component.scss'],
})
export class CommunityReviewDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}

const GQL_QUERY = gql`
  query communityReview($id: ID!) {
    community {
      review(id: $id) {
        id
      }
    }
  }
`;
