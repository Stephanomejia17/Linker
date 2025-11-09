import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PerfilVacantes } from './perfil-vacantes';

describe('PerfilVacantes', () => {
  let component: PerfilVacantes;
  let fixture: ComponentFixture<PerfilVacantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilVacantes, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilVacantes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
