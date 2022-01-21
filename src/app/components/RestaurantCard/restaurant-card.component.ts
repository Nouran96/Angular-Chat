import { Component, Input, OnInit } from '@angular/core';
import { MenuSections } from 'src/app/mocks/MenuItems';
import { MenuSection, RestaurantDetails } from 'src/app/models/Restaurants';
import { trimText } from 'src/app/utils/Shared';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss'],
})
export class RestaurantCardComponent implements OnInit {
  @Input() restaurant: RestaurantDetails;
  @Input() mapSrc: string;
  showMore: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  getDescription() {
    if (this.restaurant.description) {
      return this.showMore
        ? trimText(this.restaurant.description)
        : this.restaurant.description;
    } else return '';
  }
}
