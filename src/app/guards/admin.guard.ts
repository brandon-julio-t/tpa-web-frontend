import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.fetch().pipe(
      map((data) => {
        const user = data.data.auth;
        if (user.accountName === 'Admin') {
          return true;
        }

        this.router.navigateByUrl('/').then();
        return false;
      }),
      catchError((err) => {
        this.router.navigateByUrl('/').then();
        throw err;
      })
    );
  }
}
