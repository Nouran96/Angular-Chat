import { Component, Input, OnInit } from '@angular/core';
import { MenuSections } from 'src/app/mocks/MenuItems';
import { MenuSection, RestaurantDetails } from 'src/app/models/Restaurants';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss'],
})
export class RestaurantCardComponent implements OnInit {
  @Input() restaurant: RestaurantDetails;
  @Input() mapSrc: string;

  menuSections: Array<MenuSection>;

  constructor() {}

  ngOnInit(): void {
    // Get 5 random sections from array and sort them alphabetically
    this.menuSections = MenuSections.sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .sort((a, b) => a.section_name.localeCompare(b.section_name));

    console.log(this.menuSections);
  }
}
