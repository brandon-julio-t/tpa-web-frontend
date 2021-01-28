import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { Apollo, gql } from 'apollo-angular';
import { SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'app-friends-all',
  templateUrl: './friends-all.component.html',
  styleUrls: ['./friends-all.component.scss'],
})
export class FriendsAllComponent implements OnInit {
  @Input() friends: User[] = [];
  @Output() refresh = new EventEmitter<void>();

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private assetService: AssetService
  ) {}

  ngOnInit(): void {}

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }
}
