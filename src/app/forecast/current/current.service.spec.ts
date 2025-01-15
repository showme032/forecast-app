import { TestBed } from '@angular/core/testing';

import { CurrentService } from './current.service';

describe('CurrentService', () => {
  let service: CurrentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
