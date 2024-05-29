import { TestBed } from '@angular/core/testing';

import { DevLibraryService } from './dev-library.service';

describe('DevLibraryService', () => {
  let service: DevLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
