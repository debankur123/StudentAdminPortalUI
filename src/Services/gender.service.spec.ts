/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GenderService } from './gender.service';

describe('Service: Gender', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenderService]
    });
  });

  it('should ...', inject([GenderService], (service: GenderService) => {
    expect(service).toBeTruthy();
  }));
});
