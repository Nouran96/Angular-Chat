import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  breakpointObserverSpy,
  FireAuthStub,
  routerSpy,
  storeSpy,
} from 'src/app/utils/Stubs';

import { MainLayoutComponent } from './main-layout.component';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  const initiateComponent = () => {
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [MainLayoutComponent],
      providers: [
        { provide: AngularFireAuth, useValue: FireAuthStub },
        { provide: Router, useValue: routerSpy },
        { provide: BreakpointObserver, useValue: breakpointObserverSpy },
        { provide: Store, useValue: storeSpy },
      ],
    });
  });

  it('should create', () => {
    initiateComponent();
    expect(component).toBeTruthy();
  });
});
