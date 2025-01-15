import { TestBed } from '@angular/core/testing';

import { ExtendedService } from './extended.service';

describe('ExtendedService', () => {
  let service: ExtendedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtendedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
