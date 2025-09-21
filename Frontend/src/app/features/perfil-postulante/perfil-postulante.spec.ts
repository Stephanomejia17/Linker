import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPostulante } from './perfil-postulante';

describe('PerfilPostulante', () => {
  let component: PerfilPostulante;
  let fixture: ComponentFixture<PerfilPostulante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilPostulante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilPostulante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
