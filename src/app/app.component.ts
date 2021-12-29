import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentUser: firebase.default.User | null;

  constructor(private auth: AngularFireAuth) {
    auth.onAuthStateChanged((user) => (this.currentUser = user));
  }
}
