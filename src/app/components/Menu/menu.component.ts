import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuSections } from 'src/app/mocks/MenuItems';
import { CartProducts, MenuSection } from 'src/app/models/Restaurants';
import { selectCartProducts } from 'src/app/store/selectors/cart.selector';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent implements OnInit {
  menuSections: Array<MenuSection>;
  cartProducts: CartProducts;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Get 5 random sections from array and sort them alphabetically
    this.menuSections = MenuSections.sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .sort((a, b) => a.section_name.localeCompare(b.section_name));

    this.store.select(selectCartProducts).subscribe((res) => {
      this.cartProducts = res.products;
    });
  }
}
