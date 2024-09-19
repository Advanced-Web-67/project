import { TestBed } from '@angular/core/testing';

import { QadataService } from './qadata.service';

describe('QadataService', () => {
  let service: QadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
