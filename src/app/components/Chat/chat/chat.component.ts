import { Component, Input, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, OperatorFunction } from 'rxjs';
import { first, map, filter } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  @Input() currentUser: firebase.default.User;
  users: any;
  currentMessage: string;
  chatroomId: string;
  messages: any = [];

  constructor(private firestore: AngularFirestore) {
    this.users = firestore.collection('users').valueChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Current user changed
    if (changes.currentUser.previousValue?.email !== this.currentUser.email) {
      this.chatroomId = '';
    }
  }

  openChatRoom(user: firebase.default.User) {
    if (this.currentUser.displayName && user.displayName) {
      const chatroomQuery = this.firestore.collection('chatrooms', (ref) =>
        ref
          .where(`members.${this.currentUser.displayName}`, '==', true)
          .where(`members.${user.displayName}`, '==', true)
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
                [`${user.displayName}`]: true,
              },
            });
        }

        this.messages = this.firestore
          .collection('messages', (ref) =>
            ref.where('chatroomId', '==', this.chatroomId)
          )
          .valueChanges();
      });
    }
  }

  sendMessage() {
    this.firestore.collection('messages').doc(this.firestore.createId()).set({
      chatroomId: this.chatroomId,
      sender: this.currentUser.displayName,
      content: this.currentMessage,
      timestamp: Date.now(),
    });

    this.currentMessage = '';
  }
}
