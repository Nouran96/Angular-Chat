import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface RestaurantsResponse {
  data: Array<any>;
}

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  constructor(private http: HttpClient) {}

  getRestaurants() {
    return this.http
      .get<RestaurantsResponse>(
        `${environment.restaurantsApiBaseUrl}/restaurants/state/NY`,
        {
          headers: { 'X-API-KEY': environment.restaurantsApiKey },
        }
      )
      .pipe(map((res) => res.data));
  }

  getRestaurant(id: number) {
    return this.http
      .get<RestaurantsResponse>(
        `${environment.restaurantsApiBaseUrl}/restaurant/${id}`,
        {
          headers: { 'X-API-KEY': environment.restaurantsApiKey },
        }
      )
      .pipe(map((res) => res.data));
  }
}
