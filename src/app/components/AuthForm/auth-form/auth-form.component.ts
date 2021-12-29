import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  form: { email: string; password: string; username: string };

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.form = {
      email: '',
      password: '',
      username: '',
    };
  }

  register() {
    const duplicateUsernameQuery = this.firestore.collection('users', (ref) =>
      ref.where('displayName', '==', this.form.username)
    );

    duplicateUsernameQuery.get().subscribe((snapshot) => {
      if (snapshot.empty) {
        this.auth
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then((credentials) => {
            const user = credentials.user;

            user?.updateProfile({ displayName: this.form.username });

            this.firestore
              .collection('users')
              .doc(user?.uid)
              .set({ email: this.form.email, displayName: this.form.username });
          })
          .catch((err) => {});
      } else {
        console.log('Already found');
      }
    });
  }

  login() {
    this.auth
      .signInWithEmailAndPassword(this.form.email, this.form.password)
      .then((credentials) => {
        console.log(credentials);
      })
      .catch((err) => {});
  }

  logout() {
    this.auth.signOut().then(() => {
      console.log('signedout');
    });
  }
}
