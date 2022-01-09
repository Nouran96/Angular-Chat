import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { QueryFn } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Query } from 'firebase/firestore';
import { BehaviorSubject, of } from 'rxjs';
import { ButtonComponent } from '../../controls/button/button.component';
import { InputFieldComponent } from '../../controls/input-field/input-field.component';

import { AuthFormComponent } from './auth-form.component';

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
const ActivatedRouteStub = { url: of([{ path: 'login' }]) };

const FireAuthStub = {
  signInWithEmailAndPassword: (email: string, password: string) => {
    return new Promise((resolve, reject) => resolve(''));
  },
  createUserWithEmailAndPassword: (email: string, password: string) => {
    return new Promise((resolve, reject) => resolve(''));
  },
};

const FirestoreStub = {
  collection: (name: string, queryFn?: QueryFn) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve('')),
    }),
    get: () => new BehaviorSubject({ empty: true }),
  }),
};

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;

  const initiateComponent = () => {
    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthFormComponent, InputFieldComponent, ButtonComponent],
      providers: [
        FormBuilder,
        { provide: AngularFireAuth, useValue: FireAuthStub },
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: ActivatedRoute, useValue: ActivatedRouteStub },
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
  });

  it('should create', () => {
    initiateComponent();
    expect(component).toBeTruthy();
  });

  it('should show register link in login page', () => {
    initiateComponent();

    const nativeHtmlEl: HTMLElement = fixture.debugElement.nativeElement;
    const authLinkEl = nativeHtmlEl.querySelector('.auth-link');

    expect(authLinkEl?.innerHTML).toContain('Register');
  });

  it('should show login link in register page', () => {
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: { url: of([{ path: 'register' }]) },
    });

    initiateComponent();

    const nativeHtmlEl: HTMLElement = fixture.debugElement.nativeElement;
    const authLinkEl = nativeHtmlEl.querySelector('.auth-link');

    expect(authLinkEl?.innerHTML).toContain('Login');
  });

  it('should show a disabled button on empty fields', () => {
    initiateComponent();

    const nativeHtmlEl: HTMLElement = fixture.debugElement.nativeElement;
    const submitBtnEl = nativeHtmlEl.querySelector(
      'button[type=submit]'
    ) as HTMLButtonElement;

    expect(submitBtnEl.attributes.getNamedItem('disabled')).toBeTruthy();
  });

  it('should call login function on button click', () => {
    initiateComponent();
    spyOn(component.auth, 'signInWithEmailAndPassword').and.returnValue(
      {} as Promise<firebase.default.auth.UserCredential>
    );

    const nativeHtmlEl: HTMLElement = fixture.debugElement.nativeElement;
    const submitBtnEl = nativeHtmlEl.querySelector(
      'button[type=submit]'
    ) as HTMLButtonElement;

    component.authForm.setValue({
      email: 'nouran@yahoo.com',
      password: '123456',
      username: '',
      confirmPassword: '',
    });

    fixture.detectChanges();

    submitBtnEl.dispatchEvent(new Event('click'));

    expect(component.auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      'nouran@yahoo.com',
      '123456'
    );
  });

  it('should call register function on button click in register page', () => {
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: { url: of([{ path: 'register' }]) },
    });

    initiateComponent();
    spyOn(component.auth, 'createUserWithEmailAndPassword').and.returnValue(
      {} as Promise<firebase.default.auth.UserCredential>
    );

    const nativeHtmlEl: HTMLElement = fixture.debugElement.nativeElement;
    const submitBtnEl = nativeHtmlEl.querySelector(
      'button[type=submit]'
    ) as HTMLButtonElement;

    component.authForm.setValue({
      email: 'nouran@yahoo.com',
      password: '123456',
      username: 'nouran',
      confirmPassword: '123456',
    });

    fixture.detectChanges();

    submitBtnEl.dispatchEvent(new Event('click'));

    expect(component.auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      'nouran@yahoo.com',
      '123456'
    );
  });
});
