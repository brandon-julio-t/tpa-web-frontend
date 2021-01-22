import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';

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
    private authService: AuthService
  ) {}

  profilePicture(id: number): SafeUrl {
    return this.assetService.get(id);
  }

  ngOnInit(): void {
    this.authService
      .fetch()
      .subscribe((resp) => (this.friends = resp.data.auth.friends));
  }
}
