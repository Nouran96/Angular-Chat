import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/Auth';
import { selectCurrentUser } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatComponent {
  currentUser: User;
  otherUser: User;
  users: any;
  currentMessage: string;
  chatroomId: string;
  messages: any = [];
  isSmallScreen: boolean;

  @ViewChild('messagesContainer') messagesContainer: ElementRef;

  constructor(
    private firestore: AngularFirestore,
    public store: Store,
    private breakpointObserver: BreakpointObserver
  ) {
    store.select(selectCurrentUser).subscribe((data) => {
      if (data.currentUser) {
        this.currentUser = data.currentUser;
      }

      this.users = firestore.collection('users').valueChanges();
    });

    const layoutChanges = breakpointObserver.observe(['(max-width: 680px)']);

    layoutChanges.subscribe((result) => {
      this.isSmallScreen = result.matches;
    });
  }

  ngAfterViewChecked() {
    this.scrollToLastMessage();
  }

  openChatRoom(user: User) {
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

        this.firestore
          .collection('chatrooms')
          .doc(this.chatroomId)
          .collection('messages', (ref) => ref.orderBy('timestamp'))
          .valueChanges()
          .subscribe((msgs) => {
            this.messages = msgs;
            // this.scrollToLastMessage();
          });
      });
    }
  }

  scrollToLastMessage() {
    if (this.messagesContainer?.nativeElement) {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    }
  }

  checkKeyBeforeSend(event: KeyboardEvent) {
    const enterKeyPressed =
      event instanceof KeyboardEvent &&
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.altKey &&
      !event.ctrlKey;

    if (enterKeyPressed) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage() {
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
    // this.scrollToLastMessage();
  }
}
