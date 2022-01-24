import { BreakpointObserver } from '@angular/cdk/layout';
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
  hideMap: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe('(max-width: 575.98px)')
      .subscribe((res) => (this.hideMap = res.matches));
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  toggleMap() {
    this.hideMap = !this.hideMap;
  }

  getDescription() {
    if (this.restaurant.description) {
      return this.showMore
        ? trimText(this.restaurant.description)
        : this.restaurant.description;
    } else return '';
  }
}
