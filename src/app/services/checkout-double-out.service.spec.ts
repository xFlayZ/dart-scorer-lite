import { TestBed } from '@angular/core/testing';

import { CheckoutDoubleOutService } from './checkout-double-out.service';

describe('CheckoutDoubleOutService', () => {
  let service: CheckoutDoubleOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutDoubleOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
