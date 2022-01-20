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

  constructor() {}

  ngOnInit(): void {}
}
