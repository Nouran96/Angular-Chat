import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addCurrentUser } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {}

  logout() {
    this.auth.signOut().then(() => {
      // this.store.dispatch(addCurrentUser({ user: null }));
      this.router.navigate(['login']);
    });
  }
}
