import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  user: User | null = null;

  faSearch = faSearch;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.fetch().subscribe((resp) => (this.user = resp.data.auth));
  }
}
