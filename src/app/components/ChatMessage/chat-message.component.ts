import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { ChatMessage } from 'src/app/models/ChatMessage';
import { User } from 'src/app/models/Auth';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {
  @Input() message: ChatMessage;
  @Input() currentUser: User;
  moment = moment;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  isMyMessage() {
    return this.message?.sender === this.currentUser.displayName;
  }
}
