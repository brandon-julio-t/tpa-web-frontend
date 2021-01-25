import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-watch-stream',
  templateUrl: './watch-stream.component.html',
  styleUrls: ['./watch-stream.component.scss'],
})
export class WatchStreamComponent implements OnInit {
  user: User | null = null;
  connection: RTCPeerConnection;
  stream: MediaStream | null = null;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {
    this.connection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.1.google.com:19302' }],
    });

    this.connection.ontrack = async (e) => {
      this.stream = e.streams[0];
    };
  }

  ngOnInit(): void {
    this.apollo
      .query<{ user: User }>({
        query: gql`
          query user($accountName: String!) {
            user(accountName: $accountName) {
              accountName
              stream
            }
          }
        `,
        variables: {
          accountName: this.route.snapshot.paramMap.get('accountName'),
        },
      })
      .subscribe(async (resp) => {
        this.user = resp.data.user;

        const { accountName, stream } = this.user;

        await this.connection.setRemoteDescription(
          new RTCSessionDescription(JSON.parse(stream))
        );
        const answer = new RTCSessionDescription(
          await this.connection.createAnswer()
        );
        await this.connection.setLocalDescription(answer);

        this.apollo
          .mutate<{ joinStream: string }>({
            mutation: gql`
              mutation joinStream($accountName: String!, $rtcAnswer: String!) {
                joinStream(accountName: $accountName, rtcAnswer: $rtcAnswer)
              }
            `,
            variables: { accountName, rtcAnswer: JSON.stringify(answer) },
          })
          .subscribe();

        this.connection.onicecandidate = (e) => {
          const { candidate } = e;
          if (candidate) {
            this.apollo
              .mutate({
                mutation: gql`
                  mutation newIceCandidate(
                    $accountName: String!
                    $candidate: String!
                  ) {
                    newIceCandidate(
                      accountName: $accountName
                      candidate: $candidate
                    )
                  }
                `,
                variables: {
                  accountName,
                  candidate: JSON.stringify(candidate),
                },
              })
              .subscribe();
          }
        };

        this.apollo
          .subscribe<{ onNewIceCandidate: string }>({
            query: gql`
              subscription onNewIceCandidate($accountName: String!) {
                onNewIceCandidate(accountName: $accountName)
              }
            `,
            variables: { accountName },
          })
          .subscribe(async (r) => {
            const candidateStr = r.data?.onNewIceCandidate;
            if (candidateStr) {
              await this.connection.addIceCandidate(
                new RTCIceCandidate(JSON.parse(candidateStr))
              );
            }
          });
      });
  }
}
