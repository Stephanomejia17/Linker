import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PerfilEmpresaCertificados } from './perfil-empresa-certificados';

describe('PerfilEmpresaCertificados', () => {
  let component: PerfilEmpresaCertificados;
  let fixture: ComponentFixture<PerfilEmpresaCertificados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilEmpresaCertificados, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilEmpresaCertificados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
