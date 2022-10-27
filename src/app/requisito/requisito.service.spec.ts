/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RequisitoService } from './requisito.service';

describe('Service: Requisito', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequisitoService]
    });
  });

  it('should ...', inject([RequisitoService], (service: RequisitoService) => {
    expect(service).toBeTruthy();
  }));
});
