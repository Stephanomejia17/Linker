import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Match } from './match';

describe('Match', () => {
  let component: Match;
  let fixture: ComponentFixture<Match>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Match, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Match);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
