import { TestBed } from '@angular/core/testing';
import { FilterService } from './filter-service';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize isActivate as false', () => {
    expect(service.isActivate()).toBe(false);
  });

  it('should toggle isActivate from false to true', () => {
    service.Switch();
    expect(service.isActivate()).toBe(true);
  });

  it('should toggle isActivate from true to false', () => {
    service.Switch(); // true
    service.Switch(); // false
    expect(service.isActivate()).toBe(false);
  });
});
