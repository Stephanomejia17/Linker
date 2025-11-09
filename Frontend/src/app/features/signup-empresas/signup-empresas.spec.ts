import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SignupEmpresas } from './signup-empresas';

describe('SignupEmpresas', () => {
  let component: SignupEmpresas;
  let fixture: ComponentFixture<SignupEmpresas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupEmpresas, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupEmpresas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
