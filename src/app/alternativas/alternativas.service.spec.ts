import { TestBed } from '@angular/core/testing';

import { AlternativasService } from './alternativas.service';

describe('AlternativasService', () => {
  let service: AlternativasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlternativasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
