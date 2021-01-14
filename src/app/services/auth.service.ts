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
        email
        country {
          id
          name
        }
      }
    }
  `;
}

interface Response {
  auth: User;
}
