import { TestBed } from '@angular/core/testing';

import { ForecastStateService } from './forecast-state';

describe('ForecastStateService', () => {
  let service: ForecastStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForecastStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
