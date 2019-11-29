import { TestBed } from '@angular/core/testing';

import { EstrellaService } from './estrella.service';

describe('EstrellaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstrellaService = TestBed.get(EstrellaService);
    expect(service).toBeTruthy();
  });
});
