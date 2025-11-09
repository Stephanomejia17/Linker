import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Match } from './match';

describe('Match', () => {
  let service: Match;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Match],
    });
    service = TestBed.inject(Match);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get vacantes for empresa', () => {
    const mockResponse = [{ id: 1, title: 'Vacante 1' }];
    spyOn(sessionStorage, 'getItem').and.returnValue('empresa123');

    service.getVacantesForEmpresa().subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/vacantes/empresaId/empresa123`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get vacantes', () => {
    const mockResponse = [{ id: 1, title: 'Vacante 1' }];
    spyOn(sessionStorage, 'getItem').and.returnValue('perfil123');

    service.getVacantes().subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/vacantes/vacantes/perfil123`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get postulantes', () => {
    const mockResponse = [{ id: 1, name: 'Postulante 1' }];
    const vacanteId = 'vacante123';

    service.getPostulantes(vacanteId).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/postulante/postulantes/${vacanteId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should perform action', () => {
    const mockResponse = { message: 'Action performed' };
    const interaccion = { type: 'like', userId: 'user123', targetId: 'target456' } as any;
    spyOn(sessionStorage, 'getItem').and.returnValue('perfil123');

    service.onAction(interaccion).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/interacciones`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
