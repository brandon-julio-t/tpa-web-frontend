import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Game } from '../../models/game';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameTag } from '../../models/game-tag';
import { GameGenre } from '../../models/game-genre';

@Component({
  selector: 'app-admin-games-update',
  templateUrl: './admin-games-update.component.html',
  styleUrls: ['./admin-games-update.component.scss'],
})
export class AdminGamesUpdateComponent implements OnInit {
  game: Game | null = null;

  updateGameForm: FormGroup;
  isLoading = false;
  gameTag: GameTag[] = [];
  genres: GameGenre[] = [];

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.updateGameForm = fb.group({
      title: fb.control('', Validators.required),
      description: fb.control('', Validators.required),
      price: fb.control('', Validators.required),
      genreId: fb.control('', Validators.required),
      isInappropriate: fb.control(false, Validators.required),
      banner: fb.control('', Validators.required),
      slideshows: fb.control('', Validators.required),
      gameTags: fb.array([]),
      systemRequirements: fb.control('', Validators.required),
    });
  }

  get gameTagCheckboxes(): FormArray {
    return this.updateGameForm.get('gameTags') as FormArray;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.apollo
      .watchQuery<{ getGameById: Game }>({
        query: gql`
          query getGameById($id: ID!) {
            getGameById(id: $id) {
              id
              title
              description
              price
              isInappropriate
              genre {
                id
                name
              }
              tags {
                id
                name
              }
              systemRequirements
            }
          }
        `,
        variables: { id },
      })
      .valueChanges.subscribe((resp) => {
        this.game = resp.data.getGameById;

        this.updateGameForm.get('title')?.setValue(this.game.title);
        this.updateGameForm.get('description')?.setValue(this.game.description);
        this.updateGameForm.get('price')?.setValue(this.game.price);
        this.updateGameForm.get('genreId')?.setValue(this.game.genre.id);
        this.updateGameForm
          .get('isInappropriate')
          ?.setValue(this.game.isInappropriate);
        this.updateGameForm
          .get('systemRequirements')
          ?.setValue(this.game.systemRequirements);

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
            const tagCheckboxes = this.updateGameForm.get(
              'gameTags'
            ) as FormArray;
            res.data.getAllGameTags.forEach((tag) => {
              tagCheckboxes.push(
                this.fb.control(
                  this.game?.tags.some((gameTag) => gameTag.id === tag.id)
                )
              );
              this.gameTag.push(tag);
            });
          });
      });

    this.apollo
      .query<{ genres: GameGenre[] }>({
        query: gql`
          query genres {
            genres {
              id
              name
            }
          }
        `,
      })
      .subscribe((resp) => (this.genres = resp.data.genres));
  }

  onBannerChange(target: EventTarget | null): void {
    const file = (target as HTMLInputElement).files?.item(0);
    this.updateGameForm.controls.banner.setValue(file);
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
    this.updateGameForm.controls.slideshows.setValue(filesValue);
  }

  onSubmit(): void {
    this.updateGameForm.markAllAsTouched();
    if (this.updateGameForm.invalid) {
      return;
    }

    this.isLoading = true;

    const {
      title,
      description,
      price,
      genreId,
      isInappropriate,
      banner,
      slideshows,
      gameTags,
      systemRequirements,
    } = this.updateGameForm.value;

    const gameTagValues = [];

    for (let i = 0; i < gameTags.length; i++) {
      if (gameTags[i]) {
        gameTagValues.push(this.gameTag[i].id);
      }
    }

    this.apollo
      .mutate<{ updateGame: Game }>({
        mutation: gql`
          mutation updateGame(
            $id: ID!
            $title: String!
            $description: String!
            $price: Float!
            $genreId: ID!
            $isInappropriate: Boolean!
            $banner: Upload
            $slideshows: [Upload]
            $gameTags: [ID!]!
            $systemRequirements: String!
          ) {
            updateGame(
              input: {
                id: $id
                title: $title
                description: $description
                price: $price
                genreId: $genreId
                isInappropriate: $isInappropriate
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
          id: this.game?.id,
          title,
          description,
          price,
          genreId,
          isInappropriate,
          banner,
          slideshows,
          gameTags: gameTagValues,
          systemRequirements,
        },
      })
      .subscribe((resp) => {
        if (resp.data?.updateGame) {
          alert('Update success!');
          this.isLoading = false;
        }
      });
  }
}
