import { Component, OnInit } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  user$ = this.authService
    .watch()
    .valueChanges.pipe(map((value) => value.data.auth));

  isOpen = false;

  faEnvelope = faEnvelope;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
