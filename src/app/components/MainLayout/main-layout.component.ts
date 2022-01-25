import { BreakpointObserver } from '@angular/cdk/layout';
import { isNgTemplate } from '@angular/compiler';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/Auth';
import { CartProducts, MenuItem } from 'src/app/models/Restaurants';
import { addCurrentUser } from 'src/app/store/actions/auth.actions';
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeFromCart,
} from 'src/app/store/actions/cart.actions';
import { selectCartProducts } from 'src/app/store/selectors/cart.selector';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainLayoutComponent implements OnInit {
  @Input() currentUser: User | null;
  cartProducts: CartProducts;
  totalPrice: number;

  get cartItemsCount() {
    return Object.keys(this.cartProducts).length;
  }

  get isAdmin() {
    return (
      this.currentUser &&
      'isAdmin' in this.currentUser &&
      this.currentUser.isAdmin
    );
  }

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(selectCartProducts).subscribe((res) => {
      this.cartProducts = res.products;
      this.totalPrice = this.getTotal();
    });
  }

  logout() {
    this.auth.signOut().then(() => {
      // this.store.dispatch(addCurrentUser({ user: null }));
      this.router.navigate(['login']);
    });
  }

  getTotal() {
    let total: number = 0;

    Object.values(this.cartProducts).map((prod) => {
      total += prod.price * prod.quantity;
    });

    return total;
  }

  increaseItemQuantity(event: Event, itemID: keyof CartProducts) {
    event.stopPropagation();

    this.store.dispatch(increaseItemQuantity({ itemID: Number(itemID) }));
  }

  decreaseItemQuantity(event: Event, itemID: keyof CartProducts) {
    event.stopPropagation();

    this.store.dispatch(decreaseItemQuantity({ itemID: Number(itemID) }));
  }

  removeItem(event: Event, itemID: keyof CartProducts) {
    event.stopPropagation();

    this.store.dispatch(removeFromCart({ itemID: Number(itemID) }));
  }
}
