import { TestBed } from '@angular/core/testing';

import { RvuService } from './rvu.service';

describe('RvuService', () => {
  let service: RvuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RvuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
