import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  isLogin: boolean;
  authForm: FormGroup;

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    route.url.subscribe((url) => {
      if (url.length && url[0].path === 'login') {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });

    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', !this.isLogin && Validators.required],
      confirmPassword: ['', !this.isLogin && Validators.required],
    });
  }

  register() {
    const { email, password, username } = this.authForm.controls;

    const duplicateUsernameQuery = this.firestore.collection('users', (ref) =>
      ref.where('displayName', '==', this.authForm.controls.username)
    );

    duplicateUsernameQuery.get().subscribe((snapshot) => {
      if (snapshot.empty) {
        this.auth
          .createUserWithEmailAndPassword(email.value, password.value)
          .then((credentials) => {
            const user = credentials.user;

            user?.updateProfile({ displayName: username.value });

            this.firestore.collection('users').doc(user?.uid).set({
              email: email.value,
              displayName: username.value,
            });

            this.router.navigate(['/']);
          })
          .catch((err) => {});
      } else {
        console.log('Already found');
      }
    });
  }

  login() {
    const { email, password } = this.authForm.controls;

    this.auth
      .signInWithEmailAndPassword(email.value, password.value)
      .then((credentials) => {
        console.log(credentials);
        this.router.navigate(['/']);
      })
      .catch((err) => {});
  }
}
