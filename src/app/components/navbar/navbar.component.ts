import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Apollo, gql } from 'apollo-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: User | null = null;

  constructor(
    private apollo: Apollo,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {}

  get base64ProfilePicture(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(
      `data:image/png;base64, ${this.user?.profilePictureBase64}`
    );
  }

  ngOnInit(): void {
    this.authService.watch().valueChanges.subscribe((data) => {
      this.user = data.data.auth;
    });
  }

  onLogout(): void {
    this.apollo
      .mutate<{ logout: User }>({
        mutation: gql`
          mutation logout {
            logout {
              id
            }
          }
        `,
      })
      .subscribe((data) => {
        if (data.data?.logout) {
          window.location.reload();
        }
      });
  }
}
