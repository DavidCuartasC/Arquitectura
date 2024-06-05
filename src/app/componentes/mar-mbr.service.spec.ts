import { TestBed } from '@angular/core/testing';

import { MARMBRService } from './mar-mbr.service';

describe('MARMBRService', () => {
  let service: MARMBRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MARMBRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
