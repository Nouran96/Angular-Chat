import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { AppComponent } from './app.component';
import { FireAuthStub, FirestoreStub, storeSpy } from './utils/Stubs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const initiateComponent = () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: AngularFireAuth, useValue: FireAuthStub },
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: Store, useValue: storeSpy },
      ],
    });
  });

  it('should create the app', () => {
    initiateComponent();
    expect(component).toBeTruthy();
  });
});
