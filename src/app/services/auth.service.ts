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
          profilePicture {
            id
            contentType
          }
        }
        friendCode
        status
        outgoingFriendRequests {
          id
          displayName
          profilePicture {
            id
          }
        }
        ingoingFriendRequests {
          id
          displayName
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
