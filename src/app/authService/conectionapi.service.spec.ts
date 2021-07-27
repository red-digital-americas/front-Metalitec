import { TestBed } from '@angular/core/testing';

import { ConectionapiService } from './conectionapi.service';

describe('ConectionapiService', () => {
  let service: ConectionapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConectionapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
