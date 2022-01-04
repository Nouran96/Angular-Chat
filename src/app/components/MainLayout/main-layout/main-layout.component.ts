import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainLayoutComponent implements OnInit {
  @Input() currentUser: firebase.default.User | null;
  isSmallScreen: boolean;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    const layoutChanges = breakpointObserver.observe(['(max-width: 680px)']);

    layoutChanges.subscribe((result) => {
      this.isSmallScreen = result.matches;
    });
  }

  ngOnInit(): void {}

  logout() {
    this.auth.signOut().then(() => {
      // this.store.dispatch(addCurrentUser({ user: null }));
      this.router.navigate(['login']);
    });
  }
}
