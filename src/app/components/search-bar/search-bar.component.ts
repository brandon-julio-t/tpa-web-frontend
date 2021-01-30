import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  user: User | null = null;
  searchForm = this.fb.group({
    keyword: [''],
  });

  faSearch = faSearch;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService
      .watch()
      .valueChanges.subscribe((resp) => (this.user = resp.data.auth));
  }

  onSubmit($event: Event): void {
    $event.preventDefault();
    if (this.searchForm.invalid) {
      return;
    }

    this.router
      .navigate(['search'], {
        queryParams: { keyword: this.searchForm.value.keyword },
      })
      .then();
  }
}
