import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { addToCart } from 'src/app/store/actions/cart.actions';
import { storeSpy } from 'src/app/utils/Stubs';
import { ButtonComponent } from '../controls/button/button.component';

import { CartCounterComponent } from './cart-counter.component';

describe('CartCounterComponent', () => {
  let component: CartCounterComponent;
  let fixture: ComponentFixture<CartCounterComponent>;

  const initiateComponent = () => {
    fixture = TestBed.createComponent(CartCounterComponent);
    component = fixture.componentInstance;
    component.item = {
      id: 1,
      name: 'Item 1',
      description: '',
      price: 2,
      pricing: [],
      image: '',
    };

    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartCounterComponent, ButtonComponent],
      providers: [{ provide: Store, useValue: storeSpy }],
    });
  });

  it('should create', () => {
    initiateComponent();
    expect(component).toBeTruthy();
  });

  it('should increase quantity on button click', () => {
    initiateComponent();
    const increaseBtn: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelectorAll(
        '.count-btn button'
      )[1];

    increaseBtn.click();

    expect(component.cartQuantity).toEqual(2);
  });

  it('should not decrease quantity on first button click', () => {
    initiateComponent();
    const decreaseBtn: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelectorAll(
        '.count-btn button'
      )[0];

    decreaseBtn.click();

    expect(component.cartQuantity).toEqual(1);
  });

  it('should decrease quantity on button click', () => {
    initiateComponent();
    const [decreaseBtn, increaseBtn]: Array<HTMLButtonElement> =
      fixture.debugElement.nativeElement.querySelectorAll('.count-btn button');

    increaseBtn.click();
    increaseBtn.click();

    fixture.detectChanges();

    decreaseBtn.click();

    expect(component.cartQuantity).toEqual(2);
  });

  it('should add item to cart on button click', () => {
    initiateComponent();

    const addToCartBtn: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('.add-to-cart-btn');

    addToCartBtn.click();

    expect(component.store.dispatch).toHaveBeenCalledWith(
      addToCart({ item: component.item, quantity: component.cartQuantity })
    );
  });
});
