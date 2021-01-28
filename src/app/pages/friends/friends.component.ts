import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { AssetService } from '../../services/asset.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  userQuery = this.authService.watch();

  user$ = this.userQuery.valueChanges.pipe(map((value) => value.data.auth));

  selected = 0;

  constructor(
    private apollo: Apollo,
    private assetService: AssetService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onRefresh(): void {
    this.userQuery.refetch().then();
  }

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }
}
