import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SwipeEmpresa } from './swipe-empresa';

describe('SwipeEmpresa', () => {
  let component: SwipeEmpresa;
  let fixture: ComponentFixture<SwipeEmpresa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwipeEmpresa, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SwipeEmpresa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
