import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
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
  pagination: Pagination | null;
  isLoading: boolean = true;
  errorFetching: boolean = false;

  @ViewChild('restaurantsContainer') restaurantsContainer: ElementRef;

  constructor(public restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.restaurantsService.getRestaurants().subscribe((res) => {
      this.isLoading = false;

      if (res.results && res.results.length > 0) {
        this.restaurants = res.results;
        this.pagination = res.pagination;
      } else {
        this.errorFetching = true;
      }
    });
  }

  onPageChange(e: PageEvent) {
    this.restaurants = [];
    this.pagination = null;
    this.isLoading = true;

    this.restaurantsService.getRestaurants(e.pageIndex + 1).subscribe((res) => {
      this.isLoading = false;
      this.restaurants = res.results;
      this.pagination = res.pagination;

      window.scrollTo({
        top: this.restaurantsContainer.nativeElement.scrollTop + 160,
        behavior: 'smooth',
      });
    });
  }
}
