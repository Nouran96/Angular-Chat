import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { httpClientSpy } from 'src/app/utils/Stubs';

import { RestaurantsService } from './restaurants.service';

describe('RestaurantsService', () => {
  let service: RestaurantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(RestaurantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
