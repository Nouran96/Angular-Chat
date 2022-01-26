import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthState } from 'src/app/models/Auth';
import { selectCurrentUser } from 'src/app/store/selectors/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class OnlyAdminGuard implements CanActivate {
  constructor(public store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isAdmin();
  }

  async isAdmin() {
    let state = await this.store
      .select(selectCurrentUser)
      .pipe(take(1))
      .toPromise<AuthState>();

    if (state.currentUser?.isAdmin) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
