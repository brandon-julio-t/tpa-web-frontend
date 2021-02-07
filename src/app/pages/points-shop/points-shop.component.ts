import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { PointItem } from '../../models/point-item';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-store',
  templateUrl: './points-shop.component.html',
  styleUrls: ['./points-shop.component.scss'],
})
export class PointsShopComponent implements OnInit {
  profileBackgrounds$ = this.apollo
    .query<{ pointItemProfileBackgrounds: PointItem[] }>({
      query: GQL_PROFILE_BACKGROUNDS,
    })
    .pipe(map((x) => x.data.pointItemProfileBackgrounds));

  avatarBorders$ = this.apollo
    .query<{ pointItemAvatarBorders: PointItem[] }>({
      query: GQL_AVATAR_BORDERS,
    })
    .pipe(map((x) => x.data.pointItemAvatarBorders));

  animatedAvatars$ = this.apollo
    .query<{ pointItemAnimatedAvatars: PointItem[] }>({
      query: GQL_ANIMATED_AVATARS,
    })
    .pipe(map((x) => x.data.pointItemAnimatedAvatars));

  chatStickers$ = this.apollo
    .query<{ pointItemChatStickers: PointItem[] }>({
      query: GQL_CHAT_STICKERS,
    })
    .pipe(map((x) => x.data.pointItemChatStickers));

  miniProfileBackgrounds$ = this.apollo
    .query<{ pointItemMiniProfileBackgrounds: PointItem[] }>({
      query: GQL_MINI_PROFILE_BACKGROUNDS,
    })
    .pipe(map((x) => x.data.pointItemMiniProfileBackgrounds));

  user$ = this.authService.watch().valueChanges.pipe(map((x) => x.data.auth));

  constructor(private apollo: Apollo, private authService: AuthService) {}

  ngOnInit(): void {}
}

const GQL_PROFILE_BACKGROUNDS = gql`
  query pointItemProfileBackgrounds {
    pointItemProfileBackgrounds {
      id
      category
      name
      price
      image {
        id
        contentType
      }
    }
  }
`;

const GQL_AVATAR_BORDERS = gql`
  query pointItemAvatarBorders {
    pointItemAvatarBorders {
      id
      category
      name
      price
      image {
        id
        contentType
      }
    }
  }
`;

const GQL_ANIMATED_AVATARS = gql`
  query pointItemAnimatedAvatars {
    pointItemAnimatedAvatars {
      id
      category
      name
      price
      image {
        id
        contentType
      }
    }
  }
`;

const GQL_CHAT_STICKERS = gql`
  query pointItemChatStickers {
    pointItemChatStickers {
      id
      category
      name
      price
      image {
        id
        contentType
      }
    }
  }
`;

const GQL_MINI_PROFILE_BACKGROUNDS = gql`
  query pointItemMiniProfileBackgrounds {
    pointItemMiniProfileBackgrounds {
      id
      category
      name
      price
      image {
        id
        contentType
      }
    }
  }
`;
