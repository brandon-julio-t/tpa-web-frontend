import { Component, EventEmitter, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Game } from '../../models/game';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-community-discussions',
  templateUrl: './community-discussions.component.html',
  styleUrls: ['./community-discussions.component.scss'],
})
export class CommunityDiscussionsComponent implements OnInit {
  query$ = this.apollo.watchQuery<{
    gameDiscussions: Game[];
  }>({ query: GQL_QUERY, variables: { title: '' } });

  games$ = this.query$.valueChanges.pipe(
    map((resp) => resp.data.gameDiscussions)
  );

  titleChange = new EventEmitter<string>();

  faEnvelope = faEnvelope;
  title = '';

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private assetService: AssetService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (param) => {
      const title = param.get('title');
      await this.query$.refetch({ title });
    });

    this.titleChange.subscribe(async (title: string) => {
      return await this.query$.refetch({ title });
    });
  }

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  onTitleChange(): void {
    this.titleChange.emit(this.title);
  }
}

const GQL_QUERY = gql`
  query communityDiscussions($title: String!) {
    gameDiscussions(title: $title) {
      id
      title
      banner {
        id
      }
      topDiscussions {
        id
        createdAt
        title
        user {
          displayName
        }
      }
    }
  }
`;
