import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { Apollo } from 'apollo-angular';
import { SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { AssetService } from '../../services/asset.service';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { switchMap, toArray, map } from 'rxjs/operators';

@Component({
  selector: 'app-friends-all',
  templateUrl: './friends-all.component.html',
  styleUrls: ['./friends-all.component.scss'],
})
export class FriendsAllComponent implements OnInit {
  @Input() friends: User[] = [];
  @Output() refresh = new EventEmitter<void>();

  filter = '';
  filterSubject = new BehaviorSubject<string>('');
  filter$ = this.filterSubject.asObservable();

  constructor(private assetService: AssetService) {}

  applyFilter(friends: User, filter: string): boolean {
    if (filter) {
      return (
        friends.displayName.toLowerCase().includes(filter) ||
        friends.accountName.toLowerCase().includes(filter) ||
        friends.realName.toLowerCase().includes(filter)
      );
    }

    return true;
  }

  get onlineFriends$(): Observable<User[]> {
    return this.filter$.pipe(
      map((filter) =>
        this.friends
          .filter((x) => x.status === 'online')
          .filter((x) => this.applyFilter(x, filter))
      )
    );
  }

  get offlineFriends$(): Observable<User[]> {
    return this.filter$.pipe(
      map((filter) => {
        if (this.friends.length === 0) {
          return this.friends;
        }

        return this.friends
          .filter((x) => x.status === 'offline')
          .filter((x) => this.applyFilter(x, filter));
      })
    );
  }

  get playingFriends$(): Observable<User[]> {
    return this.filter$.pipe(
      map((filter) => {
        if (this.friends.length === 0) {
          return this.friends;
        }

        return this.friends
          .filter((x) => x.status === 'playing')
          .filter((x) => this.applyFilter(x, filter));
      })
    );
  }

  ngOnInit(): void {
    this.filter$.subscribe(console.log);
  }

  onFilterChange(): void {
    this.filterSubject.next(this.filter.toLowerCase());
  }

  asset(id: number): SafeUrl {
    return this.assetService.get(id);
  }
}
