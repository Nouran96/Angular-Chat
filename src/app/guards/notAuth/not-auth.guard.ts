import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {
  currentUser: firebase.default.User | null;

  constructor(public auth: AngularFireAuth, private router: Router) {}

  canActivate(): Promise<boolean | UrlTree> {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          this.router.navigate(['']);
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}
