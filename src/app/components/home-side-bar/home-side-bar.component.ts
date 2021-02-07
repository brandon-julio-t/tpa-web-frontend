import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../services/auth.service';
import { GameGenre } from '../../models/game-genre';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-side-bar',
  templateUrl: './home-side-bar.component.html',
  styleUrls: ['./home-side-bar.component.scss'],
})
export class HomeSideBarComponent implements OnInit {
  genres$ = this.apollo
    .query<{ sidebarGameTags: GameGenre[] }>({
      query: gql`
        query allGenres {
          sidebarGameTags {
            id
            name
          }
        }
      `,
    })
    .pipe(map((x) => x.data.sidebarGameTags));

  userGenres$ = this.authService
    .fetch()
    .pipe(map((x) => x.data.auth.mostViewedGenres));

  constructor(private apollo: Apollo, private authService: AuthService) {}

  ngOnInit(): void {}
}
