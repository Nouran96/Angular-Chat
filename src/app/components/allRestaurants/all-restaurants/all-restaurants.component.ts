import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'src/app/services/restaurants/restaurants.service';

@Component({
  selector: 'app-all-restaurants',
  templateUrl: './all-restaurants.component.html',
  styleUrls: ['./all-restaurants.component.scss'],
})
export class AllRestaurantsComponent implements OnInit {
  restaurants: any[] = [];

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.restaurantsService.getRestaurants().subscribe((data) => {
      console.log(data);
      this.restaurants = data;
    });
  }
}
