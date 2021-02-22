import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss'],
})
export class BroadcastComponent implements OnInit {
  streams$ = this.apollo
    .query<{ streams: string[] }>({
      query: gql`
        query streams {
          streams
        }
      `,
    })
    .pipe(map((x) => x.data.streams));

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {}
}
