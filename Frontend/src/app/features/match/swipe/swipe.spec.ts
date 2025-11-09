import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Swipe } from './swipe';

describe('Swipe', () => {
  let component: Swipe;
  let fixture: ComponentFixture<Swipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Swipe, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Swipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
