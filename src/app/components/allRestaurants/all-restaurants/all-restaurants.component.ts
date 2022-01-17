import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/app/models/Restaurants';
import { RestaurantsService } from 'src/app/services/restaurants/restaurants.service';

@Component({
  selector: 'app-all-restaurants',
  templateUrl: './all-restaurants.component.html',
  styleUrls: ['./all-restaurants.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AllRestaurantsComponent implements OnInit {
  restaurants: any[] = [];
  pagination: Pagination;

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.restaurantsService.getRestaurants().subscribe((res) => {
      this.restaurants = res.results;
      this.pagination = res.pagination;
    });

    // const data = 'language=en_US&limit=30&location_id=297704&currency=USD';

    // const xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    // xhr.addEventListener('readystatechange', function () {
    //   if (this.readyState === this.DONE) {
    //     console.log(this.responseText);
    //   }
    // });

    // xhr.open('POST', 'https://worldwide-restaurants.p.rapidapi.com/search');
    // xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    // xhr.setRequestHeader(
    //   'x-rapidapi-key',
    //   '699bbf2cdcmsh8976b1d7ef42b21p1acfafjsnec4d9300fdb4'
    // );
    // xhr.setRequestHeader(
    //   'x-rapidapi-host',
    //   'worldwide-restaurants.p.rapidapi.com'
    // );

    // xhr.send(data);
  }

  onPageChange(e: PageEvent) {
    this.restaurantsService.getRestaurants(e.pageIndex + 1).subscribe((res) => {
      this.restaurants = res.results;
      this.pagination = res.pagination;
    });

    window.scrollTo({ top: 400, behavior: 'smooth' });
  }
}
