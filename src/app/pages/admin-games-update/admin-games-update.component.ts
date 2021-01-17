import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Game } from '../../models/game';

@Component({
  selector: 'app-admin-games-update',
  templateUrl: './admin-games-update.component.html',
  styleUrls: ['./admin-games-update.component.scss'],
})
export class AdminGamesUpdateComponent implements OnInit {
  game: Game | null = null;

  constructor(private apollo: Apollo, private route: ActivatedRouteSnapshot) {}

  ngOnInit(): void {
    const id = this.route.paramMap.get('id');
    this.apollo
      .watchQuery({
        query: gql``,
        variables: { id },
      })
      .valueChanges.subscribe();
  }
}
