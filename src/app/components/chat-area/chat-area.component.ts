import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { User } from '../../models/user';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { PrivateMessage } from '../../models/private-message';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss'],
})
export class ChatAreaComponent implements OnInit, OnChanges {
  @Input() friend: User | null = null;

  privateMessagesQuery: QueryRef<{ privateMessage: PrivateMessage[] }>;

  user: User | null = null;
  isLoading = false;
  message = '';
  messages: PrivateMessage[] = [];

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private assetService: AssetService
  ) {
    this.privateMessagesQuery = this.apollo.watchQuery<{
      privateMessage: PrivateMessage[];
    }>({
      query: gql`
        query privateMessage($friendId: ID!) {
          privateMessage(friendId: $friendId) {
            text
            sender {
              id
            }
            createdAt
          }
        }
      `,
      variables: { friendId: this.friend?.id },
    });
  }

  profilePicture(id: number | undefined): SafeUrl {
    return this.assetService.get(id);
  }

  ngOnInit(): void {
    this.authService.fetch().subscribe((resp) => (this.user = resp.data.auth));

    this.privateMessagesQuery.valueChanges.subscribe(
      (resp) => (this.messages = resp.data.privateMessage)
    );

    this.apollo
      .subscribe<{ privateMessageAdded: PrivateMessage }>({
        query: gql`
          subscription privateMessageAdded {
            privateMessageAdded {
              id
              text
              sender {
                id
              }
              createdAt
            }
          }
        `,
      })
      .subscribe((resp) => {
        const message = resp.data?.privateMessageAdded;
        if (message) {
          this.messages = [message, ...this.messages];
        }
      });
  }

  onSubmit(): void {
    this.isLoading = true;

    this.apollo
      .mutate<{ addPrivateMessage: PrivateMessage }>({
        mutation: gql`
          mutation addPrivateMessage($friendId: ID!, $text: String!) {
            addPrivateMessage(friendId: $friendId, text: $text) {
              text
              sender {
                id
              }
              createdAt
            }
          }
        `,
        variables: { friendId: this.friend?.id, text: this.message },
      })
      .subscribe((resp) => {
        const message = resp.data?.addPrivateMessage;
        if (message) {
          this.messages = [message, ...this.messages];
          this.isLoading = false;
          this.message = '';
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.messages = [];
    this.privateMessagesQuery.refetch({ friendId: this.friend?.id }).then();
  }
}
