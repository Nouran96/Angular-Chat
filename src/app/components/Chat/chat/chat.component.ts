import { Component, Input, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Firestore } from 'firebase/firestore';
import { Observable, OperatorFunction } from 'rxjs';
import { first, map, filter } from 'rxjs/operators';
import { selectCurrentUser } from 'src/app/store/selectors/auth.selector';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  currentUser: firebase.default.User;
  otherUser: firebase.default.User;
  users: any;
  currentMessage: string;
  chatroomId: string;
  messages: any = [];

  constructor(private firestore: AngularFirestore, private store: Store) {
    store.select(selectCurrentUser).subscribe((data) => {
      if (data.currentUser) {
        this.currentUser = data.currentUser;
      }

      this.users = firestore.collection('users').valueChanges();
    });
  }

  openChatRoom(user: firebase.default.User) {
    if (this.currentUser?.displayName && user?.displayName) {
      this.otherUser = user;

      const chatroomQuery = this.firestore.collection('chatrooms', (ref) =>
        ref
          .where(`members.${this.currentUser.displayName}`, '==', true)
          .where(`members.${this.otherUser.displayName}`, '==', true)
      );

      chatroomQuery.get().subscribe((snapshot) => {
        if (!snapshot.empty) {
          this.chatroomId = snapshot.docs[0].ref.id;
        } else {
          this.chatroomId = this.firestore.createId();

          this.firestore
            .collection('chatrooms')
            .doc(this.chatroomId)
            .set({
              members: {
                [`${this.currentUser.displayName}`]: true,
                [`${this.otherUser.displayName}`]: true,
              },
            });
        }

        this.messages = this.firestore
          .collection('chatrooms')
          .doc(this.chatroomId)
          .collection('messages')
          .valueChanges();
      });
    }
  }

  sendMessage() {
    // this.firestore.collection('messages').doc(this.firestore.createId()).set({
    //   chatroomId: this.chatroomId,
    //   sender: this.currentUser.displayName,
    //   content: this.currentMessage,
    //   timestamp: Date.now(),
    // });

    this.firestore
      .collection('chatrooms')
      .doc(this.chatroomId)
      .collection('messages')
      .doc(this.firestore.createId())
      .set({
        sender: this.currentUser.displayName,
        content: this.currentMessage,
        timestamp: Date.now(),
      });

    this.currentMessage = '';
  }
}
