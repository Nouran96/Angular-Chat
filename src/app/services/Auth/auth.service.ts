import { Injectable } from '@angular/core';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   Auth,
// } from 'firebase/auth';
// import firebaseApp from 'src/app/utils/firebase';
import { ChatDatabaseService } from '../ChatDatabase/chat-database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private auth: Auth;
  // constructor(private databaseSerive: ChatDatabaseService) {
  //   this.auth = getAuth(firebaseApp);
  // }
  // registerUser(email: string, password: string) {
  //   createUserWithEmailAndPassword(this.auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       console.log(user);
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // ..
  //     });
  // }
  // loginUser(email: string, password: string) {
  //   signInWithEmailAndPassword(this.auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       console.log(user);
  //       this.databaseSerive.addUser(user);
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //     });
  // }
  // logout() {
  //   signOut(this.auth)
  //     .then(() => {
  //       // Sign-out successful.
  //       console.log('signedout');
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //       console.log(error);
  //     });
  // }
}
