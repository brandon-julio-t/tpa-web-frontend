import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { count, elementAt, map, mergeAll } from 'rxjs/operators';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-discovery-queue-new-releases',
  templateUrl: './discovery-queue-new-releases.component.html',
  styleUrls: ['./discovery-queue-new-releases.component.scss'],
})
export class DiscoveryQueueNewReleasesComponent implements OnInit {
  currIdx = -1;

  games$ = this.apollo
    .query<{
      discoverQueue: {
        newReleases: Game[];
      };
    }>({
      query: gql`
        query newReleases {
          discoverQueue {
            newReleases {
              id
              banner {
                id
              }
              createdAt
              description
              developer
              publisher
              systemRequirements
              title
            }
          }
        }
      `,
    })
    .pipe(
      map((x) => x.data.discoverQueue.newReleases),
      mergeAll()
    );

  game$: Observable<Game> | undefined;
  remaining$ = this.games$.pipe(
    count(),
    map((x) => x - this.currIdx)
  );

  constructor(private apollo: Apollo, private assetService: AssetService) {}

  ngOnInit(): void {
    this.next();
  }

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  next(): void {
    this.currIdx++;
    this.game$ = this.games$.pipe(elementAt(this.currIdx));
  }

  restart(): void {
    this.currIdx = -1;
    this.next();
  }
}
