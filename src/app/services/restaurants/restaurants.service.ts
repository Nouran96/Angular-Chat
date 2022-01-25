import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Pagination } from 'src/app/models/Restaurants';
import { environment } from '../../../environments/environment';

interface RestaurantsResponse {
  // data?: Array<any>;
  results: Array<any>;
  pagination: Pagination;
}

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  constructor(private http: HttpClient) {}

  getRestaurants(page: number = 1) {
    return this.http.get<RestaurantsResponse>(
      `${environment.restaurantsApiBaseUrl}/venues?host=api.eet.nu&tags=online-menu&per_page=25&page=${page}`
    );
  }

  getRestaurant(id: string) {
    return this.http.get(`${environment.restaurantsApiBaseUrl}/venues/${id}`);
  }
}
