import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private apollo: Apollo) {
    setInterval(() => {
      apollo
        .mutate({
          mutation: gql`
            mutation refreshToken {
              refreshToken
            }
          `,
        })
        .subscribe();
    }, 300000); // 3 minutes
  }
}
