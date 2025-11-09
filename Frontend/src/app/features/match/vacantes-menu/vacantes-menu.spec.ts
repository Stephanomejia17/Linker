import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { VacantesMenu } from './vacantes-menu';

describe('VacantesMenu', () => {
  let component: VacantesMenu;
  let fixture: ComponentFixture<VacantesMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacantesMenu, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(VacantesMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
