import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../../services/friends.service';
import { User } from '../../models/user';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  friends: User[] = [];
  currentFriend: User | null = null;

  constructor(
    private assetService: AssetService,
    private friendsService: FriendsService
  ) {}

  profilePicture(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  ngOnInit(): void {
    this.friendsService
      .fetch()
      .subscribe((resp) => (this.friends = resp.data.friends));
  }
}
