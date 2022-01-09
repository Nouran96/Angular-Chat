import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FireAuthStub, routerSpy } from 'src/app/utils/Stubs';

import { NotAuthGuard } from './not-auth.guard';

describe('NotAuthGuard', () => {
  let guard: NotAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useValue: FireAuthStub },
        { provide: Router, useValue: routerSpy },
      ],
    });
    guard = TestBed.inject(NotAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
