import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import {
  emailValidator,
  minLengthValidator,
  passwordsMismatch,
  usernameValidator,
} from 'src/app/utils/Validations';
import { AuthFormCustomErrors } from 'src/app/models/AuthForm';
import { Store } from '@ngrx/store';
import { toggleSnackbar } from 'src/app/store/actions/shared.actions';
import { addCurrentUser } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  isLogin: boolean;
  authForm: FormGroup;
  customErrors: AuthFormCustomErrors;
  isLoading: boolean = false;

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store
  ) {
    route.url.subscribe((url) => {
      if (url.length && url[0].path === 'login') {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });

    this.authForm = this.fb.group(
      {
        email: ['', [Validators.required, emailValidator]],
        password: [
          '',
          [
            Validators.required,
            ...(!this.isLogin ? [minLengthValidator(6)] : []),
          ],
        ],
        username: [
          '',
          [...(!this.isLogin ? [Validators.required, usernameValidator] : [])],
        ],
        confirmPassword: ['', !this.isLogin && Validators.required],
      },
      {
        ...(!this.isLogin ? { validators: [passwordsMismatch] } : {}),
      }
    );
  }

  register() {
    const { email, password, username } = this.authForm.controls;

    const duplicateUsernameQuery = this.firestore.collection('users', (ref) =>
      ref.where('displayName', '==', username.value)
    );

    if (!this.isLoading) {
      this.isLoading = true;

      duplicateUsernameQuery.get().subscribe((snapshot) => {
        if (snapshot.empty) {
          this.auth
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(async (credentials) => {
              const user = credentials.user;

              await user?.updateProfile({ displayName: username.value });

              this.firestore.collection('users').doc(user?.uid).set({
                email: email.value,
                displayName: username.value,
              });

              this.store.dispatch(addCurrentUser({ user }));

              this.router.navigate(['/']);
            })
            .catch((err) => {
              this.isLoading = false;
              this.checkCustomErrorType(err.code);
            });
        } else {
          this.isLoading = false;
          this.customErrors = {
            username: { usernameFound: 'Username already found' },
          };
        }
      });
    }
  }

  login() {
    const { email, password } = this.authForm.controls;

    if (!this.isLoading) {
      this.isLoading = true;
      this.auth
        .signInWithEmailAndPassword(email.value, password.value)
        .then((credentials) => {
          // this.store.dispatch(addCurrentUser({ user: credentials?.user }));
          this.router.navigate(['/']);
        })
        .catch((err) => {
          this.isLoading = false;
          this.checkCustomErrorType(err.code);
        });
    }
  }

  checkCustomErrorType(errCode: string) {
    switch (errCode) {
      case 'auth/email-already-in-use':
        this.customErrors = {
          email: { emailFound: 'Email already found' },
        };
        break;
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        this.customErrors = {
          password: { wrongPassword: 'Invalid Credentials' },
          email: { wrongPassword: 'Invalid Credentials' },
        };
        break;
      case 'auth/network-request-failed':
        this.store.dispatch(
          toggleSnackbar({
            open: true,
            message: 'Check your internet connection',
          })
        );
        break;
      default:
        return;
    }
  }
}
