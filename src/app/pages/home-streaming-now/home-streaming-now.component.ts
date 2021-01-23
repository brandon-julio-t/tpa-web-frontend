import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-home-streaming-now',
  templateUrl: './home-streaming-now.component.html',
  styleUrls: ['./home-streaming-now.component.scss'],
})
export class HomeStreamingNowComponent implements OnInit {
  streams: string[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .query<{ streams: string[] }>({
        query: gql`
          query streams {
            streams
          }
        `,
      })
      .subscribe((resp) => (this.streams = resp.data.streams));
  }
}
