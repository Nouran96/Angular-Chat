import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { User } from './models/Auth';
import { addCurrentUser } from './store/actions/auth.actions';
import { selectCurrentUser } from './store/selectors/auth.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentUser: User | null;

  constructor(private auth: AngularFireAuth, private store: Store) {
    auth.onAuthStateChanged((user) => {
      const currentUser = JSON.parse(JSON.stringify(user));
      this.store.dispatch(addCurrentUser({ user: currentUser }));
    });

    store.select(selectCurrentUser).subscribe((state) => {
      this.currentUser = state.currentUser;
    });
  }
}
