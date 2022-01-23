import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'src/app/models/Restaurants';
import { addToCart } from 'src/app/store/actions/cart.actions';

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html',
  styleUrls: ['./cart-counter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartCounterComponent implements OnInit {
  @Input() item: MenuItem;
  cartQuantity: number = 1;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  increaseCartQuantity() {
    this.cartQuantity++;
  }

  decreaseCartQuantity() {
    this.cartQuantity > 1 && this.cartQuantity--;
  }

  addItemToCart() {
    this.store.dispatch(
      addToCart({ item: this.item, quantity: this.cartQuantity })
    );

    this.cartQuantity = 1;
  }
}
