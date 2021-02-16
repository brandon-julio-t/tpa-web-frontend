import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { gql, Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends Query<Response> {
  document = gql`
    query auth {
      auth {
        id
        accountName
        avatarBorder {
          image {
            id
            contentType
          }
        }
        country {
          id
          name
        }
        customUrl
        displayName
        email
        games {
          id
          title
          banner {
            id
          }
        }
        gamesByOwnedMarketItems {
          id
          title
          banner {
            id
          }
        }
        level
        points
        profilePicture {
          id
          contentType
        }
        friends {
          id
          accountName
          customUrl
          displayName
          realName
          status
          profilePicture {
            id
            contentType
          }
        }
        friendCode
        marketItemsBuyListing {
          id
          marketItem {
            id
            game {
              title
            }
            image {
              id
            }
            name
          }
          price
          quantity
        }
        marketItemsSellListing {
          id
          marketItem {
            id
            game {
              title
            }
            image {
              id
            }
            name
          }
          price
          quantity
        }
        miniProfileBackground {
          image {
            id
            contentType
          }
        }
        profileBackground {
          image {
            id
            contentType
          }
        }
        ownedAvatarBorders {
          id
          name
          image {
            id
            contentType
          }
        }
        ownedMiniProfileBackgrounds {
          id
          name
          image {
            id
            contentType
          }
        }
        ownedProfileBackgrounds {
          id
          name
          image {
            id
            contentType
          }
        }
        status
        outgoingFriendRequests {
          id
          displayName
          level
          profilePicture {
            id
          }
        }
        ingoingFriendRequests {
          id
          displayName
          level
          profilePicture {
            id
          }
        }
        profileTheme
        mostViewedGenres {
          id
          name
        }
        realName
        receivedGiftsCount
        receivedInvitesCount
        receivedMessagesCount
        receivedProfileCommentsCount
        summary
        walletBalance
        suspendedAt
        wishlist {
          id
          banner {
            id
            contentType
          }
          createdAt
          price
          title
          tags {
            name
          }
        }
        wishlistCount
        cart {
          id
          banner {
            id
            contentType
          }
          createdAt
          price
          title
        }
        cartCount
      }
    }
  `;
}

interface Response {
  auth: User;
}
