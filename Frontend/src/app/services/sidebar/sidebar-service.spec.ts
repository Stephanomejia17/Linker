import { TestBed } from '@angular/core/testing';
import { SidebarService } from './sidebar-service';

describe('SidebarService', () => {
  let service: SidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarService);
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
