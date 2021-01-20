import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class FriendsService extends Query<Response> {
  document = gql`
    query friends {
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
    }
  `;
}

interface Response {
  friends: User[];
}
