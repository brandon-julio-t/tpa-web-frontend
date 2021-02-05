import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { GameDiscussion } from '../../models/game-discussion';
import { map, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-community-discussion-detail',
  templateUrl: './community-discussion-detail.component.html',
  styleUrls: ['./community-discussion-detail.component.scss'],
})
export class CommunityDiscussionDetailComponent implements OnInit {
  query$ = this.apollo.watchQuery<
    { gameDiscussion: GameDiscussion },
    { id: number; page: number }
  >({
    query: GQL_QUERY,
  });

  discussion$ = this.query$.valueChanges.pipe(
    map((resp) => resp.data.gameDiscussion),
    tap((x) => (this.maxPage = x.comments.totalPages))
  );

  id = -1;
  page = 1;
  maxPage = 1;
  comment = '';

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private assetService: AssetService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (param) => {
      const id = param.get('id');
      if (!id) {
        return;
      }

      this.id = +id;
      await this.fetch();
    });
  }

  async fetch(): Promise<void> {
    this.spinner.show();
    await this.query$.refetch({
      id: this.id,
      page: this.page,
    });
    this.spinner.hide();
  }

  async onPrev(): Promise<void> {
    if (this.page) {
      this.page--;
      await this.fetch();
    }
  }

  async onNext(): Promise<void> {
    if (this.page < this.maxPage) {
      this.page++;
      await this.fetch();
    }
  }

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  async onSubmit(): Promise<void> {
    this.spinner.show();
    this.apollo
      .mutate({
        mutation: GQL_MUTATION,
        variables: { body: this.comment, id: this.id },
      })
      .subscribe(async (resp) => {
        if (resp.data) {
          await this.fetch();
          this.spinner.hide();
        }
      });
  }
}

const GQL_QUERY = gql`
  query gameDiscussion($id: ID!, $page: Int!) {
    gameDiscussion(id: $id) {
      id
      body
      comments(page: $page) {
        data {
          body
          user {
            displayName
            profilePicture {
              id
            }
          }
        }
        totalPages
      }
      createdAt
      title
      user {
        displayName
        profilePicture {
          id
        }
      }
    }
  }
`;

const GQL_MUTATION = gql`
  mutation postCommunityDiscussionComment($id: ID!, $body: String!) {
    postCommunityDiscussionComment(
      input: { body: $body, communityDiscussionId: $id }
    ) {
      id
    }
  }
`;
