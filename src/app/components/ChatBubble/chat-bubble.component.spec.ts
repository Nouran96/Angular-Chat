import { Location } from '@angular/common';
import {
  ComponentFixture,
  inject,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { FirestoreStub, storeSpy } from 'src/app/utils/Stubs';

import { ChatBubbleComponent } from './chat-bubble.component';

describe('ChatBubbleComponent', () => {
  let component: ChatBubbleComponent;
  let fixture: ComponentFixture<ChatBubbleComponent>;

  class DummyComponent {}

  const initiateComponent = () => {
    fixture = TestBed.createComponent(ChatBubbleComponent);
    component = fixture.componentInstance;
    component.openChatRoom = jasmine.createSpy();
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatBubbleComponent],
      imports: [
        MatMenuModule,
        RouterTestingModule.withRoutes([
          { path: 'chat', component: DummyComponent },
        ]),
      ],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: Store, useValue: storeSpy },
      ],
    });
  });

  it('should create', () => {
    initiateComponent();
    expect(component).toBeTruthy();
  });

  it(
    'should go to chat page if admin',
    waitForAsync(
      inject([Router, Location], (router: Router, location: Location) => {
        spyOn(component.store, 'select').and.returnValue(
          of({
            currentUser: {
              email: 'admin@admin.com',
              displayName: 'Admin',
              isAdmin: true,
            },
          })
        );

        initiateComponent();

        const chatFloatingBtn =
          fixture.debugElement.nativeElement.querySelector(
            '.chat-floating-btn'
          );

        chatFloatingBtn.click();

        fixture.whenStable().then(() => {
          expect(location.path()).toEqual('/chat');
        });
      })
    )
  );

  it('should make the other user as admin if not admin logged in', () => {
    initiateComponent();
    expect(component.otherUser.displayName).toBe('Admin');
  });

  it('should render customer service slider if not admin logged in', () => {
    initiateComponent();
    const customerServiceEl =
      fixture.debugElement.nativeElement.querySelector('.hint-text');

    expect(customerServiceEl.textContent).toBe('Customer service');
  });
});
