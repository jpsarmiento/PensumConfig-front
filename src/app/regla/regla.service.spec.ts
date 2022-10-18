/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReglaService } from './regla.service';

describe('Service: Regla', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReglaService]
    });
  });

  it('should ...', inject([ReglaService], (service: ReglaService) => {
    expect(service).toBeTruthy();
  }));
});
