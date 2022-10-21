/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExamenService } from './examen.service';

describe('Service: Examen', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamenService]
    });
  });

  it('should ...', inject([ExamenService], (service: ExamenService) => {
    expect(service).toBeTruthy();
  }));
});
