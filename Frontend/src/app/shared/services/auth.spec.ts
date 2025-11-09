import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Auth } from './auth';

describe('Auth', () => {
  let service: Auth;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Auth],
    });
    service = TestBed.inject(Auth);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    const mockResponse = { token: 'mock-token' };
    const loginData = {
      name: 'Test',
      lastname: 'User',
      email: 'test@example.com',
      password: 'password',
      perfil: {} as any,
    };

    service.login(loginData).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/user/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should signUp', () => {
    const mockResponse = { message: 'User registered' };
    const signUpData = {
      name: 'Test',
      lastname: 'User',
      email: 'test@example.com',
      password: 'password',
      perfil: {} as any,
    };

    service.signUp(signUpData).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/user/registro`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout', () => {
    spyOn(sessionStorage, 'clear');

    service.logout();

    expect(sessionStorage.clear).toHaveBeenCalled();
  });

  it('should get user type', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('true');

    const isEmpresa = service.getUserType();

    expect(isEmpresa).toBe(true);
    expect(sessionStorage.getItem).toHaveBeenCalledWith('isEmpresa');
  });
});
