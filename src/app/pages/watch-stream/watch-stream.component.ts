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
  stream = new MediaStream();

  constructor(private apollo: Apollo, private route: ActivatedRoute) {
    this.connection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    this.connection.ontrack = async (e) => {
      this.connection.addTrack(e.track, this.stream);
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
        const offer = JSON.parse(stream) as RTCSessionDescriptionInit;

        await this.connection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        const answer = await this.connection.createAnswer();
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
              const candidate = JSON.parse(candidateStr) as RTCIceCandidate;
              await this.connection.addIceCandidate(candidate);
            }
          });
      });
  }
}
