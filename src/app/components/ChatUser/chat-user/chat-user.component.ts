import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.scss'],
})
export class ChatUserComponent implements OnInit {
  @Input() user: firebase.default.User;

  constructor() {}

  ngOnInit(): void {}
}
