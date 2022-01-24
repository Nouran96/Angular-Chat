import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCartItemsComponent } from './no-cart-items.component';

describe('NoCartItemsComponent', () => {
  let component: NoCartItemsComponent;
  let fixture: ComponentFixture<NoCartItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoCartItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoCartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
