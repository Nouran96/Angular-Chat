import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartProducts } from 'src/app/models/Restaurants';
import { emptyCart, removeFromCart } from 'src/app/store/actions/cart.actions';
import { toggleSnackbar } from 'src/app/store/actions/shared.actions';
import { selectCartProducts } from 'src/app/store/selectors/cart.selector';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutComponent implements OnInit {
  cartProducts: CartProducts;
  totalPrice: number;
  shippingPrice: number = 8;
  subtotal: number;

  get cartItemsCount() {
    return Object.keys(this.cartProducts).length;
  }

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectCartProducts).subscribe((res) => {
      this.cartProducts = res.products;
      this.totalPrice = this.getTotal();
    });
  }

  placeOrder() {
    this.store.dispatch(
      toggleSnackbar({
        open: true,
        message: 'Order placed successfully',
        className: 'success-snackbar',
      })
    );

    this.store.dispatch(emptyCart());
  }

  getTotal() {
    let subtotal: number = 0;

    Object.values(this.cartProducts).map((prod) => {
      subtotal += prod.price * prod.quantity;
    });

    this.subtotal = subtotal;

    return subtotal + this.shippingPrice;
  }
}
