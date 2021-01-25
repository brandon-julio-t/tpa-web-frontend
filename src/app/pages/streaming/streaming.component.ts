import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.scss'],
})
export class StreamingComponent implements OnInit, OnDestroy {
  stream = new MediaStream();
  connection: RTCPeerConnection;

  constructor(private apollo: Apollo, private authService: AuthService) {
    this.connection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.1.google.com:19302' }],
    });
  }

  ngOnInit(): void {
    this.authService.fetch().subscribe((resp) => {
      const { accountName } = resp.data.auth;

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
              variables: { accountName, candidate: JSON.stringify(candidate) },
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

    this.apollo
      .subscribe<{ onStreamJoin: string }>({
        query: gql`
          subscription onStreamJoin {
            onStreamJoin
          }
        `,
      })
      .subscribe(async (resp) => {
        const answerStr = resp.data?.onStreamJoin;
        if (answerStr) {
          await this.connection.setRemoteDescription(
            new RTCSessionDescription(JSON.parse(answerStr))
          );
        }
      });
  }

  async onStartStreaming(): Promise<void> {
    const mediaDevices = navigator.mediaDevices as DisplayMediaDevices;
    this.stream = await mediaDevices.getDisplayMedia({
      audio: true,
      video: true,
    });

    this.stream.getTracks().forEach((track) => {
      if (this.stream) {
        this.connection.addTrack(track, this.stream);
      }
    });

    const offer = new RTCSessionDescription(
      await this.connection.createOffer()
    );
    await this.connection.setLocalDescription(offer);

    // this.stream.getVideoTracks()[0].onended = () => this.onStopStreaming();

    this.apollo
      .mutate({
        mutation: gql`
          mutation startStreaming($rtcConnection: String!) {
            startStreaming(rtcConnection: $rtcConnection)
          }
        `,
        variables: { rtcConnection: JSON.stringify(offer) },
      })
      .subscribe();
  }

  onStopStreaming(): void {
    this.stream = new MediaStream();

    this.apollo
      .mutate({
        mutation: gql`
          mutation stopStreaming {
            stopStreaming
          }
        `,
      })
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onStopStreaming();
  }
}

interface DisplayMediaDevices extends MediaDevices {
  getDisplayMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>;
}
