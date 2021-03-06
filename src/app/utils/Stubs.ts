import { QueryFn } from '@angular/fire/compat/database';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '../models/Auth';

export const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
export const breakpointObserverSpy = {
  observe: (breakpoints: string[]) => {
    return of({
      matches: false,
    });
  },
};
export const storeSpy = {
  dispatch: jasmine.createSpy(),
  select: (selector: any) => {
    return of({
      currentUser: {
        email: 'nouran@yahoo.com',
        displayName: 'nouran',
        isAdmin: false,
      },
      products: {},
    });
  },
};

export const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

export const ActivatedRouteStub = { url: of([{ path: 'login' }]) };

export const restaurantsServiceStub = {
  getRestaurants: jasmine.createSpy(),
  getRestaurant: jasmine
    .createSpy()
    .and.returnValue(of({ id: 1, name: 'Restaurant' })),
};

export const FireAuthStub = {
  signInWithEmailAndPassword: (email: string, password: string) => {
    return new Promise((resolve, reject) => resolve(''));
  },
  createUserWithEmailAndPassword: (email: string, password: string) => {
    return new Promise((resolve, reject) => resolve(''));
  },
  onAuthStateChanged: (callback: (user: User) => any) => {
    return callback({
      email: 'nouran@yahoo.com',
      displayName: 'nouran',
    } as User);
  },
};

export const FirestoreStub = {
  collection: (name: string, queryFn?: QueryFn) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve('')),
    }),
    get: () => new BehaviorSubject({ empty: true }),
  }),
};
