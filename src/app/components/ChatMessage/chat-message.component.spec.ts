import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/Auth';
import { ChatMessage } from 'src/app/models/ChatMessage';
import { storeSpy } from 'src/app/utils/Stubs';

import { ChatMessageComponent } from './chat-message.component';

describe('ChatMessageComponent', () => {
  let component: ChatMessageComponent;
  let fixture: ComponentFixture<ChatMessageComponent>;

  const initiateComponent = () => {
    fixture = TestBed.createComponent(ChatMessageComponent);
    component = fixture.componentInstance;

    component.currentUser = {
      email: 'nouran@yahoo.com',
      displayName: 'nouran',
    } as User;

    component.message = {
      sender: 'nouran',
      content: 'hello',
      timestamp: new Date(),
    } as ChatMessage;

    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatMessageComponent],
      providers: [{ provide: Store, useValue: storeSpy }],
    });
  });

  it('should create', () => {
    initiateComponent();
    expect(component).toBeTruthy();
  });

  it('should show message content', () => {
    initiateComponent();

    const messageElement = fixture.debugElement.nativeElement.querySelector(
      'pre'
    ) as HTMLElement;
    expect(messageElement.textContent).toBe(component.message.content);
  });
});
