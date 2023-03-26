import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): boolean {
    let isLoggedIn = false;

    // Subscribe to the $loggedIn observable to get the current value of the logged in status
    this.authService.$loggedIn.subscribe((x) => {
      if (x) {
        isLoggedIn = true;
      }
    });

    // If the user is logged in, return true
    if (isLoggedIn) {
      return true;
    }

    // If the user is not logged in, redirect to the login page
    this.router.navigate(['/login']);
    return false;
  }
}

export const canLoadApp: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthGuard).canLoad();
};
