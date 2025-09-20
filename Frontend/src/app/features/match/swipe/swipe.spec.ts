import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Swipe } from './swipe';

describe('Swipe', () => {
  let component: Swipe;
  let fixture: ComponentFixture<Swipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Swipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Swipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
