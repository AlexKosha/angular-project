import { TestBed } from '@angular/core/testing';

import { PreparationService } from './preparation';

describe('Preparation', () => {
  let service: PreparationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreparationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
