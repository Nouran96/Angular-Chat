import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Pagination } from 'src/app/models/Restaurants';
import { RestaurantsService } from 'src/app/services/restaurants/restaurants.service';
import { restaurantsServiceStub } from 'src/app/utils/Stubs';

import { AllRestaurantsComponent } from './all-restaurants.component';

describe('AllRestaurantsComponent', () => {
  let component: AllRestaurantsComponent;
  let fixture: ComponentFixture<AllRestaurantsComponent>;

  const initiateComponent = () => {
    fixture = TestBed.createComponent(AllRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllRestaurantsComponent],
      providers: [
        { provide: RestaurantsService, useValue: restaurantsServiceStub },
      ],
    });
  });

  it('should create', () => {
    restaurantsServiceStub.getRestaurants = jasmine.createSpy().and.returnValue(
      of({
        results: [],
        pagination: {} as Pagination,
      })
    );

    initiateComponent();
    expect(component).toBeTruthy();
  });

  it('should render error text if no data fetched', () => {
    restaurantsServiceStub.getRestaurants = jasmine.createSpy().and.returnValue(
      of({
        results: [],
        pagination: {} as Pagination,
      })
    );

    initiateComponent();

    expect(component.errorFetching).toBeTrue();
  });

  it('should render restaurants container after loading', () => {
    restaurantsServiceStub.getRestaurants = jasmine.createSpy().and.returnValue(
      of({
        results: [{ id: 1, name: 'Restaurant' }],
        pagination: {} as Pagination,
      })
    );

    initiateComponent();

    const restaurantsContEl = fixture.debugElement.nativeElement.querySelector(
      '.restaurants-container'
    );

    expect(restaurantsContEl).toBeTruthy();
  });
});
