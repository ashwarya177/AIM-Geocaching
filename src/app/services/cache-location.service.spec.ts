import { TestBed } from '@angular/core/testing';

import { CacheLocationService } from './cache-location.service';

describe('CacheLocationService', () => {
  let service: CacheLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
