import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { GameTag } from '../../models/game-tag';
import { Game } from '../../models/game';

@Component({
  selector: 'app-admin-games-create',
  templateUrl: './admin-games-create.component.html',
  styleUrls: ['./admin-games-create.component.scss'],
})
export class AdminGamesCreateComponent implements OnInit {
  createGameForm: FormGroup;
  isLoading = false;
  gameTag: GameTag[] = [];

  constructor(private fb: FormBuilder, private apollo: Apollo) {
    this.createGameForm = fb.group({
      title: fb.control('', Validators.required),
      description: fb.control('', Validators.required),
      price: fb.control('', Validators.required),
      banner: fb.control('', Validators.required),
      slideshows: fb.control('', Validators.required),
      gameTags: fb.array([]),
      systemRequirements: fb.control('', Validators.required),
    });

    this.apollo
      .watchQuery<{ getAllGameTags: GameTag[] }>({
        query: gql`
          query getAllGameTags {
            getAllGameTags {
              id
              name
            }
          }
        `,
      })
      .valueChanges.subscribe((res) => {
        const tagCheckboxes = this.createGameForm.get('gameTags') as FormArray;
        res.data.getAllGameTags.forEach((tag) => {
          tagCheckboxes.push(fb.control(false));
          this.gameTag.push(tag);
        });
      });
  }

  get gameTagCheckboxes(): FormArray {
    return this.createGameForm.get('gameTags') as FormArray;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.createGameForm.markAllAsTouched();
    if (this.createGameForm.invalid) {
      return;
    }

    this.isLoading = true;

    const {
      title,
      description,
      price,
      banner,
      slideshows,
      gameTags,
      systemRequirements,
    } = this.createGameForm.value;

    const gameTagValues = [];

    for (let i = 0; i < gameTags.length; i++) {
      if (gameTags[i]) {
        gameTagValues.push(this.gameTag[i].id);
      }
    }

    this.apollo
      .mutate<{ createGame: Game }>({
        mutation: gql`
          mutation createGame(
            $title: String!
            $description: String!
            $price: Float!
            $banner: Upload!
            $slideshows: [Upload!]!
            $gameTags: [ID!]!
            $systemRequirements: String!
          ) {
            createGame(
              input: {
                title: $title
                description: $description
                price: $price
                banner: $banner
                slideshows: $slideshows
                gameTags: $gameTags
                systemRequirements: $systemRequirements
              }
            ) {
              id
            }
          }
        `,
        variables: {
          title,
          description,
          price,
          banner,
          slideshows,
          gameTags: gameTagValues,
          systemRequirements,
        },
      })
      .subscribe((data) => {
        if (data.data?.createGame) {
          alert('Game created');
          this.createGameForm.reset();
          this.isLoading = false;
        }
      });
  }

  onBannerChange(target: EventTarget | null): void {
    const file = (target as HTMLInputElement).files?.item(0);
    this.createGameForm.controls.banner.setValue(file);
  }

  onSlideshowsChange(target: EventTarget | null): void {
    const files = (target as HTMLInputElement).files;
    if (!files) {
      return;
    }

    const filesValue = [];
    for (let i = 0; i < files.length; i++) {
      filesValue.push(files.item(i));
    }
    this.createGameForm.controls.slideshows.setValue(filesValue);
  }
}
