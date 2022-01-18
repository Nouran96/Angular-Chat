import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'src/app/services/restaurants/restaurants.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss'],
})
export class RestaurantDetailsComponent implements OnInit {
  restaurantID: string;
  restaurant: any;
  mapSrc: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantsService
  ) {
    this.restaurantID = this.activatedRoute.snapshot.params.restaurantID;
  }

  ngOnInit(): void {
    if (this.restaurantID) {
      this.restaurantService
        .getRestaurant(this.restaurantID)
        .subscribe((res: any) => {
          this.restaurant = res;
          this.mapSrc = encodeURI(
            `https://www.google.com/maps/embed/v1/place?key=${
              environment.firebase.apiKey
            }&q=${`${res.address?.street},${res.address?.city},${res.address?.country}`}&center=${
              res.geolocation?.latitude
            },${res.geolocation?.longitude}`
          );
          console.log(res, this.mapSrc);
        });
    }
  }
}
