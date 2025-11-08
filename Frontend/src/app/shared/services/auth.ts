import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  isLogged = signal(false);

  http = inject(HttpClient);

  getUserType() {
    const isEmpresa = sessionStorage.getItem('isEmpresa');
    return isEmpresa === 'true';
  }

  getPerfilId(user: string) {
    return this.http.get(`http://localhost:3000/user/perfil/${user}`);
  }

  signUp(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/user/registro', user);
  }

  signUpPostulante(postulante: PerfilPostulanteModel): Observable<any> {
    return this.http.post('http://localhost:3000/postulante/registro', postulante);
  }

  signUpEmpresa(empresa: Empresa): Observable<any> {
    return this.http.post('http://localhost:3000/empresa/registro', empresa);
  }

  login(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/user/login', user);
  }

  logout() {
    this.isLogged.set(false);
    sessionStorage.clear();
  }
}
