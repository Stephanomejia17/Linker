import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Perfil } from './perfil';

describe('Perfil', () => {
  let service: Perfil;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Perfil],
    });
    service = TestBed.inject(Perfil);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get is empresa', () => {
    const mockResponse = { isEmpresa: true };
    const id = 'user123';

    service.getIsEmpresa(id).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/empresa/isEmpresa/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get postulante by user id', () => {
    const mockResponse = { id: 1, name: 'Postulante 1' };
    const idUsuario = 'user123';

    service.getPostulanteByUserId(idUsuario).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/postulante/${idUsuario}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get user name postulante', () => {
    const mockResponse = { name: 'John', lastname: 'Doe' };
    const id = 'user123';

    service.getUserNamePostulante(id).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/postulante/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get user name empresa', () => {
    const mockResponse = { name: 'Empresa ABC' };
    const id = 'empresa123';

    service.getUserNameEmpresa(id).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/empresa/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get catalogo habilidades', () => {
    const mockResponse = [{ id: 1, name: 'JavaScript' }];

    service.getCatalogoHabilidades().subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/habilidades`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get catalogo idiomas', () => {
    const mockResponse = [{ id: 1, name: 'English' }];

    service.getCatalogoIdiomas().subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/idiomas`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
