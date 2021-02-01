import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Game } from '../../models/game';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-game-detail-review-create',
  templateUrl: './game-detail-review-create.component.html',
  styleUrls: ['./game-detail-review-create.component.scss'],
})
export class GameDetailReviewCreateComponent implements OnInit {
  @Input() game: Game | undefined;
  @Output() create = new EventEmitter<void>();

  user$ = this.authService
    .watch()
    .valueChanges.pipe(map((value) => value.data.auth));

  isUserOwnsGame$ = this.user$.pipe(
    map((user) => user.games.some((g) => g.id === this.game?.id))
  );

  reviewForm = this.fb.group({
    content: ['', Validators.required],
    isRecommended: [false],
  });

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.reviewForm.invalid) {
      return;
    }

    this.spinner.show();
    this.apollo
      .mutate({
        mutation: gql`
          mutation createReview(
            $gameId: ID!
            $content: String!
            $isRecommended: Boolean!
          ) {
            createReview(
              gameId: $gameId
              content: $content
              isRecommended: $isRecommended
            ) {
              id
            }
          }
        `,
        variables: { gameId: this.game?.id, ...this.reviewForm.value },
      })
      .subscribe((resp) => {
        if (resp.data) {
          this.create.emit();
          this.spinner.hide();
          alert('Review posted!');
        }
      });
  }
}
