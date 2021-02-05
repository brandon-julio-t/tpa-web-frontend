import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, Validators } from '@angular/forms';
import { Game } from '../../models/game';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-community-discussion-create',
  templateUrl: './community-discussion-create.component.html',
  styleUrls: ['./community-discussion-create.component.scss'],
})
export class CommunityDiscussionCreateComponent implements OnInit {
  games$ = this.apollo
    .query<{ allGames: Game[] }>({
      query: gql`
        query games {
          allGames {
            id
            title
          }
        }
      `,
    })
    .pipe(map((resp) => resp.data.allGames));

  form = this.fb.group({
    title: ['', Validators.required],
    gameId: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const { title, gameId, description } = this.form.value;

    this.spinner.show();
    this.apollo
      .mutate({
        mutation: GQL_MUTATION,
        variables: { body: description, gameId, title },
      })
      .subscribe((resp) => {
        if (resp.data) {
          this.spinner.hide();
        }
      });
  }
}

const GQL_MUTATION = gql`
  mutation postCommunityDiscussion(
    $body: String!
    $title: String!
    $gameId: ID!
  ) {
    postCommunityDiscussion(
      input: { body: $body, title: $title, gameId: $gameId }
    ) {
      id
    }
  }
`;
