import { TestBed } from '@angular/core/testing';

import { HourlyService } from './hourly.service';

describe('HourlyService', () => {
  let service: HourlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HourlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
