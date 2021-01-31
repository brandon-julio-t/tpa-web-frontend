import { Component, EventEmitter, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Game } from '../../models/game';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  games$: Observable<Game[]> = of([]);

  user: User | null = null;
  keyword = '';
  keywordEvent = new EventEmitter<void>();

  faSearch = faSearch;

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private assetService: AssetService
  ) {}

  ngOnInit(): void {
    this.authService
      .watch()
      .valueChanges.subscribe((resp) => (this.user = resp.data.auth));

    this.keywordEvent.pipe(debounceTime(1500)).subscribe(() => {
      this.games$ = this.apollo
        .query<{
          searchGames: {
            data: Game[];
          };
        }>({
          query: gql`
            query searchGames($keyword: String!) {
              searchGames(
                keyword: $keyword
                category: ""
                genres: []
                page: 1
                price: 0
              ) {
                data {
                  id
                  banner {
                    id
                  }
                  price
                  title
                }
              }
            }
          `,
          variables: { keyword: this.keyword },
        })
        .pipe(
          map((value) => {
            if (this.keyword === '') {
              return [];
            }

            return value.data.searchGames.data.slice(0, 5);
          })
        );
    });
  }

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  onSubmit(): void {
    if (!this.keyword) {
      return;
    }

    this.router
      .navigate(['search'], {
        queryParams: { keyword: this.keyword },
      })
      .then();
  }
}
