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
        profileTheme
        realName
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
