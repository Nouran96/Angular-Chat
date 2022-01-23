import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartProducts, MenuItem } from 'src/app/models/Restaurants';
import { selectCartProducts } from 'src/app/store/selectors/cart.selector';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainLayoutComponent implements OnInit {
  @Input() currentUser: firebase.default.User | null;
  cartProducts: CartProducts;
  totalPrice: number;

  get cartItemsCount() {
    return Object.keys(this.cartProducts).length;
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
}
