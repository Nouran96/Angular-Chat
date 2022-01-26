import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  breakpointObserverSpy,
  FirestoreStub,
  storeSpy,
} from 'src/app/utils/Stubs';

import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  const initiateComponent = () => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [ChatComponent],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: Store, useValue: storeSpy },
        { provide: BreakpointObserver, useValue: breakpointObserverSpy },
      ],
    });
  });

  it('should create', () => {
    initiateComponent();
    expect(component).toBeTruthy();
  });

  it('should not show users menu without clicking menu icon', () => {
    initiateComponent();
    component.isSmallScreen = true;

    fixture.detectChanges();

    const userMenu =
      fixture.debugElement.nativeElement.querySelector('.user-menu');

    expect(userMenu).toBeFalsy();
  });

  it('should show users menu on clicking menu icon', () => {
    initiateComponent();
    component.isSmallScreen = true;

    fixture.detectChanges();

    let menuIcon: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('.menu-icon');

    menuIcon.dispatchEvent(new Event('click'));

    // menuIcon = fixture.debugElement.nativeElement.querySelector('.menu-icon');

    // console.log(menuIcon.attributes);

    // expect(
    //   menuIcon.attributes.getNamedItem('aria-expanded')?.value
    // ).toBeTruthy();
  });
});
