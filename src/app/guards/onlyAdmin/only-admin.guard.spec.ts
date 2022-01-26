import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { routerSpy, storeSpy } from 'src/app/utils/Stubs';

import { OnlyAdminGuard } from './only-admin.guard';

describe('OnlyAdminGuard', () => {
  let guard: OnlyAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: Store, useValue: storeSpy },
      ],
    });
    guard = TestBed.inject(OnlyAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if admin is logged in', async () => {
    spyOn(guard.store, 'select').and.returnValue(
      of({
        currentUser: {
          email: 'admin@admin.com',
          displayName: 'Admin',
          isAdmin: true,
        },
      })
    );

    const isAdmin = await guard.isAdmin();

    expect(isAdmin).toBeTrue();
  });
});
