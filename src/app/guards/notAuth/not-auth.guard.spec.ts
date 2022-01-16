import { fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FireAuthStub, routerSpy } from 'src/app/utils/Stubs';

import { NotAuthGuard } from './not-auth.guard';

describe('NotAuthGuard', () => {
  let guard: NotAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AngularFireAuth, useValue: FireAuthStub },
      ],
    });
    guard = TestBed.inject(NotAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false if auth user is truthy', (done) => {
    guard.canActivate().catch((val) => {
      expect(val).toBeFalse();
      done();
    });
  });
});
