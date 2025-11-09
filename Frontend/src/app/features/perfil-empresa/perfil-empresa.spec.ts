import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PerfilEmpresa } from './perfil-empresa';

describe('PerfilEmpresa', () => {
  let component: PerfilEmpresa;
  let fixture: ComponentFixture<PerfilEmpresa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilEmpresa, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilEmpresa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
